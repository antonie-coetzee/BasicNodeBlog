import {Route, NavLink} from 'react-router-dom';

export interface IRouter {
    readonly Routes:Route[];
    readonly NavLinks:NavLink[];
}

export let IRouterKey = "IRouterKey";
