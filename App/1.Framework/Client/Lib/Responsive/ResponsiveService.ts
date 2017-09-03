import {injectable} from "inversify";
import {observable, action} from "mobx";

import {IResponsiveService, DeviceType} from "./IResponsiveService"

@injectable()
export class ResponsiveService implements IResponsiveService {

    @observable
    public IsMobile:boolean;
    @observable
    public IsTablet:boolean;
    @observable
    public IsDesktop:boolean;

    constructor() {
        const desktopQuery = window.matchMedia("(min-width: 1025px)");
        desktopQuery.addListener(this.DesktopListener.bind(this));
        this.DesktopListener(desktopQuery);

        const tabletQuery = window.matchMedia("(min-width: 769px) and (max-width: 1024px)");
        tabletQuery.addListener(this.TabletListener.bind(this));
        this.TabletListener(tabletQuery);

        const mobileQuery = window.matchMedia("(max-width: 768px)");
        mobileQuery.addListener(this.MobileListener.bind(this));
        this.MobileListener(mobileQuery);      
    }

    private DesktopListener(mq:MediaQueryList):void{
        if(mq.matches){
            this.UpdateDevice(DeviceType.Desktop);
        }
    }

    private TabletListener(mq:MediaQueryList):void{
        if(mq.matches){
            this.UpdateDevice(DeviceType.Tablet);
        }       
    }

    private MobileListener(mq:MediaQueryList):void{
        if(mq.matches){
            this.UpdateDevice(DeviceType.Mobile);
        }       
    }    

    @action public UpdateDevice(device:DeviceType):void{
        this.IsMobile = false;
        this.IsDesktop = false;
        this.IsTablet = false;
        switch (device) {
            case DeviceType.Desktop:     
                this.IsDesktop = true;          
                break;
            case DeviceType.Mobile:
                this.IsMobile = true;                   
                break;
            case DeviceType.Tablet:  
                this.IsTablet = true;                    
                break;                                        
            default:
                break;
        }     
    }
}