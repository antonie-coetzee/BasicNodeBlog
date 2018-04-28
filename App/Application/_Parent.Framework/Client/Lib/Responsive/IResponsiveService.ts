import * as React from "react";

export enum DeviceType{
    Mobile,
    Tablet,
    Desktop
}

export interface IResponsiveService {
    IsMobile:boolean,
    IsTablet:boolean,
    IsDesktop:boolean
    UpdateDevice(device:DeviceType):void
}

export let IResponsiveServiceKey = "IResponsiveService";
