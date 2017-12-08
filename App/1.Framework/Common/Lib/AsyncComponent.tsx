/**
  * A port, cleanup and simplification of https://github.com/thejameskyle/react-loadable
  * MIT License Copyright 2017 Chris Sattinger
  */
  import * as React from "react"
  
  export function Loading({ loading = true }) {
    return loading
      ? <i className="fa fa-spinner fa-spin" aria-hidden="true" />
      : null;
  }
  
  type Payload = any; // module: __esModule default
  export type ImportFunction = () => Promise<Payload>;
  
  export interface AsyncComponentOptions {
    spinnerDelay?: number;
    timeout?: number;
  }
  
  // Internal state
  interface LoadingState {
    loading: boolean;
    payload: Payload | undefined;
    error: Error | undefined;
    promise: Promise<Payload>;
  }
  
  interface AsyncComponentState {
    error: Error;
    pastSpinnerDelay: boolean;
    timedOut: boolean;
    loading: boolean;
    payload: Payload;
  }
  
  function asyncLoad(importFunction: ImportFunction) {
    let promise = importFunction()
      .then(payload => {
        state.loading = false;
        state.payload = payload;
        return payload;
      })
      .catch(err => {
        state.loading = false;
        state.error = err;
        throw err;
      });
  
    let state: LoadingState = {
      loading: true,
      payload: undefined,
      error: undefined,
      promise
    };
  
    return state;
  }
  
  /**
   * Extract the component from the payload
   */
  function resolve(obj) {
    return obj && obj.__esModule ? obj.default : obj;
  }
  
  function render(payload, props) {
    return React.createElement(resolve(payload), props);
  }
  
  export default function makeAsyncComponent<ComponentProps>(
    importFunction: ImportFunction,
    options: AsyncComponentOptions = {}
  ) {
    let opts = Object.assign(
      {
        // loading: undefined,
        spinnerDelay: 200,
        timeout: undefined
        // render: render
      },
      options
    );
  
    let loadingState = undefined;
  
    return class AsyncComponent extends React.Component<
      ComponentProps,
      AsyncComponentState
    > {
      _mounted = false;
      _spinnerDelay = undefined;
      _timeout = undefined;
  
      constructor(props) {
        super(props);
  
        if (!loadingState) {
          loadingState = asyncLoad(importFunction);
        }
  
        this.state = {
          error: loadingState.error,
          pastSpinnerDelay: false,
          timedOut: false,
          loading: loadingState.loading,
          payload: loadingState.payload
        };
      }
  
      componentWillMount() {
        this._mounted = true;
  
        if (loadingState.resolved) {
          return;
        }
  
        if (typeof opts.spinnerDelay === "number") {
          this._spinnerDelay = setTimeout(() => {
            this.setState({ pastSpinnerDelay: true });
          }, opts.spinnerDelay);
        }
  
        if (typeof opts.timeout === "number") {
          this._timeout = setTimeout(() => {
            this.setState({ timedOut: true });
          }, opts.timeout);
        }
  
        let update = () => {
          if (!this._mounted) {
            return;
          }
  
          this.setState({
            error: loadingState.error,
            payload: loadingState.payload,
            loading: loadingState.loading
          });
  
          this._clearTimeouts();
        };
  
        loadingState.promise
          .then(() => {
            update();
          })
          .catch(err => {
            update();
            throw err;
          });
      }
  
      componentWillUnmount() {
        this._mounted = false;
        this._clearTimeouts();
      }
  
      _clearTimeouts() {
        clearTimeout(this._spinnerDelay);
        clearTimeout(this._timeout);
      }
  
      render() {
        if (this.state.loading || this.state.error) {
          return React.createElement(LoadingDisplay, {
            isLoading: this.state.loading,
            pastSpinnerDelay: this.state.pastSpinnerDelay,
            timedOut: this.state.timedOut,
            error: this.state.error
          });
        } else if (this.state.payload) {
          return render(this.state.payload, this.props);
        } else {
          return null;
        }
      }
    };
  }
  
  type LoadingDisplayProps = {
    isLoading: boolean;
    timedOut: boolean;
    error: Error | null;
    pastSpinnerDelay: null;
  };
  
  /**
   * Shows a spinner while loading, an error display on Error.
   */
  const LoadingDisplay = ({
    isLoading,
    error,
    pastSpinnerDelay,
    timedOut
  }: LoadingDisplayProps) => {
    // timedOut is still isLoading
    if (isLoading) {
      if (timedOut) {
        return <div>Error! Component failed to load (timeout)</div>;
      }
      return pastSpinnerDelay ? <Loading /> : null;
    } else if (error) {
      return <div>Error! Component failed to load</div>;
    } else {
      return null;
    }
  };
  