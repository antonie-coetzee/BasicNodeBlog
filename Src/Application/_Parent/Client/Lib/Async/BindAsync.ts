import * as React from "react"
import {interfaces} from "inversify";
import ToAsyncComponent, { IAsyncComponentOptions, ImportFunction } from "../../../Client/Lib/Async/AsyncComponent";

export default function BindAsync<TComponent extends React.Component<TProps>, TProps = any>(
        container:interfaces.Container,
        componentKey:string|symbol,
        options:IAsyncComponentOptions,
        importer:ImportFunction<TComponent>){

        container.bind<interfaces.Newable<React.Component<TProps>>>(componentKey)
            .toDynamicValue((ctx)=> {return ToAsyncComponent<TComponent, TProps>(importer, options);});
    }
