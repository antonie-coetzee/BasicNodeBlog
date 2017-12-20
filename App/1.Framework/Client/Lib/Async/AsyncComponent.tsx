import * as React from "react"
import {interfaces} from "inversify";

import * as classNames from "classnames"
import style from "Style.sass"

export type ImportFunction<TComponent> = () => Promise<interfaces.Newable<TComponent>>;

export interface ISpinnerComponentProps{
  loading:boolean
}

export interface IErrorComponentProps{
  error:boolean, 
  isTimeOut:boolean
}

export interface IAsyncComponentOptions {
  spinnerDelay?: number;
  timeout?: number;
  SpinnerComponent?: React.SFC<ISpinnerComponentProps>;
  ErrorComponent?: React.SFC<IErrorComponentProps>;
}

let defaultSpinnerComponent : React.SFC<ISpinnerComponentProps> = function(props) {
  return props.loading
    ? <i className={classNames(style.fa, style.faSpinner, style.faSpin)} aria-hidden="true" />
    : null;
}

defaultSpinnerComponent.defaultProps = {loading:true};

let defaultErrorComponent : React.SFC<IErrorComponentProps> = function(props) {
  if(props.isTimeOut){
    return <div>Error! Component failed to load (timeout)</div>;
  }
  if(props.error){
    return <div>Error! Component failed to load</div>;
  }
}

interface IAsyncComponentState<TComponent> {
  error: Error;
  pastSpinnerDelay: boolean;
  timedOut: boolean;
  loading: boolean;
  component: interfaces.Newable<TComponent> | undefined;
  promise: Promise<TComponent>;
}

function asyncLoadState<TComponent>(importFunction: ImportFunction<TComponent>): IAsyncComponentState<TComponent> {
  let state: IAsyncComponentState<TComponent> = {
    loading: true,
    component: undefined,
    error: undefined,
    promise: undefined,
    pastSpinnerDelay:false,
    timedOut:false
  };
  let promise = importFunction()
    .then(component => {
      state.loading = false;
      state.component = component;
      return component;
    })
    .catch(err => {
      state.loading = false;
      state.error = err;
      throw err;
    });
  return state;
}

function ToAsyncComponent<TComponent extends React.Component<TProps>, TProps = any>(
    options:IAsyncComponentOptions,
    importer: ImportFunction<TComponent> ) 
  : interfaces.Newable<React.Component<TProps>>{
  
  let state = asyncLoadState<TComponent>(importer);

  let opts:IAsyncComponentOptions = {...options, ...{
    spinnerDelay: 200, 
    timeout: undefined,
    ErrorComponent: defaultErrorComponent,
    SpinnerComponent: defaultSpinnerComponent
  }};

  class AsyncComponent extends React.Component<TProps, IAsyncComponentState<TComponent>>{
    private spinnerDelay:number = undefined;
    private timeout:number = undefined;
    private mounted:boolean = false;

    constructor(props) {
      super(props);
      if(!state){
        state = asyncLoadState<TComponent>(importer);
      }
      this.state = state
    }

    public componentWillMount() {
      this.mounted = true;

      if (typeof opts.spinnerDelay === "number") {
        this.spinnerDelay = window.setTimeout(() => {
          this.setState({ pastSpinnerDelay: true });
        }, opts.spinnerDelay);
      }

      if (typeof opts.timeout === "number") {
        this.timeout = window.setTimeout(() => {
          this.setState({ timedOut: true });
        }, opts.timeout);
      }

      let update = () => {
        if (!this.mounted) {
          return;
        }
        this.setState({
          error: state.error,
          component: state.component,
          loading: state.loading
        });
        this.clearTimeouts();
      };
      
      state.promise
      .then(() => {
        update();
      })
      .catch(err => {
        update();
        throw err;
      });
    }

    public componentWillUnmount() {
      this.mounted = false;
      this.clearTimeouts();
    }
    
    public render() {
      if (this.state.loading || this.state.error) {
        return React.createElement(this.LoadingDisplay, {
          isLoading: this.state.loading,
          pastSpinnerDelay: this.state.pastSpinnerDelay,
          timedOut: this.state.timedOut,
          error: this.state.error
        });
      } else if (this.state.component) {
        return React.createElement(this.state.component, this.props);
      } else {
        return null;
      }
    }    

    private clearTimeouts() {
      clearTimeout(this.spinnerDelay);
      clearTimeout(this.timeout);
    } 

    private LoadingDisplay = ({
      isLoading,
      error,
      pastSpinnerDelay,
      timedOut
    }: LoadingDisplayProps) => {
      // timedOut is still isLoading
      if (isLoading) {
        if (timedOut) {
          return <opts.ErrorComponent isTimeOut={timedOut} error={true} />;
        }
        return pastSpinnerDelay ? <opts.SpinnerComponent loading={true} /> : null;
      } else if (error) {
        return <opts.ErrorComponent isTimeOut={false} error={true} />;
      } else {
        return null;
      }
    };    
  }

  type LoadingDisplayProps = {
    isLoading: boolean;
    timedOut: boolean;
    error: Error | null;
    pastSpinnerDelay: null;
  };

  return AsyncComponent;
}


  