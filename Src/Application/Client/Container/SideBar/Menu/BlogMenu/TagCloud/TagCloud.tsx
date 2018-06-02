import * as React from "react";
import {injectable, interfaces} from "inversify";
import classNames from "classnames";
import { computed } from "mobx";
import { observer } from "mobx-react";
import { TagCloud as ReactTagCloud} from "react-tagcloud";

import { ITagCloudProps } from "../../../../../../Client/Container/SideBar/Menu/BlogMenu/TagCloud/ITagCloudProps";
import { ITagCloud } from "../../../../../../Client/Container/SideBar/Menu/BlogMenu/TagCloud/ITagCloud";

import style from "Theme/Style.less";

type tagItem = {value:string, count:number}

@observer
@injectable()
export class TagCloud extends React.Component<ITagCloudProps> implements ITagCloud  {

    private readonly componentClass:string = 'tag-cloud';

    constructor(props:ITagCloudProps) {
        super(props);
    }

    @computed
    private get tagData():tagItem[]{
        let tagItems = new Array<tagItem>();
        let tagCloud = this.props.tagCloud;
        tagCloud.forEach((val,key)=>{
            tagItems.push({value:key, count:val});
        });
        if(this.props.maxTags){
            let toKeep = tagItems.slice(0)
                            .sort((a,b)=>a.count-b.count)
                            .slice(-this.props.maxTags)
                            .map(el=>el.value);
            tagItems = tagItems.filter(el=>{return toKeep.indexOf(el.value) > -1});
        }
        return tagItems;
    }

    private customRenderer = (tag, size, color) => {
        let tagSizeStyle:string;
        switch (size) {
            case 1:
                tagSizeStyle = 'style.isSmall';
                break;
            case 2:
                tagSizeStyle = "";
                break;  
            case 3:
                tagSizeStyle = 'style.isMedium';
                break;                                                       
            default:
                tagSizeStyle = "";
                break;
        }
        return <span key={tag.value} className={classNames('style.button', tagSizeStyle)}>{tag.value}</span>;
      };
    
    render() {
            return [<p className={classNames('style.menuLabel')} key='1'>Tags</p>,                  
                    <ReactTagCloud 
                        className={classNames(this.componentClass, 'style.buttons')}
                        tags={this.tagData} 
                        minSize={1} 
                        maxSize={3} 
                        disableRandomColor={true}
                        shuffle={false}
                        renderer={this.customRenderer}
                        key='2'/>                        
                    ]}
}