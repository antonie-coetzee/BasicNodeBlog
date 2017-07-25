import * as React from "react";
import {interfaces} from "inversify";

export interface IApplication extends React.PureComponent<any, any> {}

export let IApplicationKey = "IApplication";