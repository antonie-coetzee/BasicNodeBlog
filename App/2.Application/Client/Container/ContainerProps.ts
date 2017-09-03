import {interfaces} from "inversify";
import {IHeader} from "../../../1.Framework/Client/Container/Header/IHeader"
import {ISideBar} from "../../../1.Framework/Client/Container/SideBar/ISideBar"
import {IContent} from "../../../1.Framework/Client/Container/Content/IContent"
import {ILogger} from "../../../1.Framework/Common/Services/Logging/ILogger"

export interface IContainerProps {
    Header:interfaces.Newable<IHeader>;
    SideBar:interfaces.Newable<ISideBar>;
    Content:interfaces.Newable<IContent>;
    Logger:ILogger;
}
