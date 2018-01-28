import * as React from "react";
import { withRouter, Switch, Route } from "react-router";
import { observer } from "mobx-react";
import {injectable, interfaces} from "inversify";

import {IContent} from "1.Framework/Client/Container/Content/IContent"

import { IBlogWrapperKey, IBlogWrapper } from "2.Application/Client/Container/Content/Blog/IBlogWrapper";

import style from "Style.sass"

@withRouter
@injectable()
@observer
export class Content extends React.Component<any, any> implements IContent  {

    @lazyInject(IBlogWrapperKey)
    public BlogWrapper : interfaces.Newable<IBlogWrapper>;

    render(){
        return  <Switch>
                    <Route path="/blog" component={this.BlogWrapper}/>
                    <Route render={()=><p>content type not matched</p>}/>
                </Switch>
    }


    // render() {
    //     return <div className="content is-medium">
    //                 <h1>Page Title</h1>
    //                 <h2>additional info</h2>                   
    //                 <p>
    //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a magna quis lorem semper convallis sit amet quis ex. Nam a mi sit amet nisl fringilla lobortis. Ut elementum consequat rutrum. Proin volutpat et felis vel accumsan. Sed tincidunt turpis posuere lorem vehicula, imperdiet hendrerit neque finibus. Nulla eu nisl ultricies, suscipit eros quis, aliquam nisl. Nullam ac justo id justo iaculis venenatis ut placerat lorem.
    //                     Phasellus mi mauris, blandit quis mi eget, imperdiet fringilla neque. Aenean vulputate lorem eu dui consequat, vel porttitor lorem aliquam. Phasellus euismod aliquam lacus, ut varius tortor tempus ut. Nunc vitae mattis ex, consequat iaculis eros. Nam ac sem sollicitudin, finibus nulla eget, posuere urna. Nulla magna mauris, consequat a ante eu, euismod tempor risus. Mauris malesuada mi mollis, iaculis nibh id, interdum ante. Vestibulum dolor diam, sagittis at dignissim eu, aliquam et purus. Etiam at accumsan quam. Fusce mollis, nunc id interdum varius, felis ipsum congue dolor, ut congue urna turpis vel lectus. Aliquam mauris eros, convallis ut mattis at, lobortis ac risus. Donec placerat velit non ante feugiat tristique. Integer elit lacus, auctor at tincidunt nec, efficitur eu elit. Curabitur vel magna sagittis nulla sagittis ultricies sed in leo.
    //                     Vestibulum neque augue, hendrerit et eleifend in, varius non augue. Vestibulum venenatis, arcu eu accumsan volutpat, nisl erat aliquam dui, quis venenatis ex nisi in odio. Suspendisse ornare vel lectus hendrerit aliquet. Sed suscipit arcu ut nisi congue, sodales malesuada felis porta. Nullam vitae leo euismod, interdum orci ut, tempor nulla. Nam vitae erat eget diam vulputate ornare. Sed convallis blandit massa, quis pellentesque felis tristique in. Sed sit amet metus consequat, tristique velit at, consectetur quam. Suspendisse potenti. Nullam venenatis consectetur eros, ac accumsan tellus laoreet in. Mauris ut convallis odio, eget porta nulla.
    //                     Morbi consequat et enim sit amet rhoncus. Donec sed est ultricies, luctus felis non, condimentum dui. Cras scelerisque dapibus ultrices. Donec laoreet id nibh quis tempor. Phasellus id consequat lorem. Aenean turpis lectus, pulvinar a pellentesque sit amet, condimentum eu lacus. Cras leo purus, pulvinar eu elit sed, viverra sollicitudin velit. Phasellus vestibulum faucibus nisi, a lobortis enim scelerisque hendrerit. Ut at pulvinar metus. Duis eget sapien quis velit dictum rhoncus nec a tellus. Etiam non lobortis velit, ut fringilla orci.
    //                     Ut eu dui sem. Morbi ultricies porttitor mauris. Donec arcu risus, molestie tempus rutrum id, egestas eget purus. Donec neque sapien, dapibus id augue bibendum, sodales tempor libero. Etiam purus magna, congue id ante ut, ultricies facilisis arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce eleifend felis turpis, ac pellentesque nulla finibus ut. Nam pellentesque dapibus finibus. Donec eleifend felis et ipsum elementum finibus. Etiam magna turpis, lobortis nec ornare dictum, volutpat vel sem. Vivamus placerat non arcu quis sollicitudin. Integer porttitor dolor eget faucibus mattis. In pharetra tempus pharetra. Aenean placerat bibendum dolor, a rutrum turpis ornare at. Maecenas pellentesque, leo quis blandit vehicula, arcu turpis tincidunt orci, vitae mollis lectus eros in dui.            
    //                 </p>  
    //                 <p>
    //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a magna quis lorem semper convallis sit amet quis ex. Nam a mi sit amet nisl fringilla lobortis. Ut elementum consequat rutrum. Proin volutpat et felis vel accumsan. Sed tincidunt turpis posuere lorem vehicula, imperdiet hendrerit neque finibus. Nulla eu nisl ultricies, suscipit eros quis, aliquam nisl. Nullam ac justo id justo iaculis venenatis ut placerat lorem.
    //                     Phasellus mi mauris, blandit quis mi eget, imperdiet fringilla neque. Aenean vulputate lorem eu dui consequat, vel porttitor lorem aliquam. Phasellus euismod aliquam lacus, ut varius tortor tempus ut. Nunc vitae mattis ex, consequat iaculis eros. Nam ac sem sollicitudin, finibus nulla eget, posuere urna. Nulla magna mauris, consequat a ante eu, euismod tempor risus. Mauris malesuada mi mollis, iaculis nibh id, interdum ante. Vestibulum dolor diam, sagittis at dignissim eu, aliquam et purus. Etiam at accumsan quam. Fusce mollis, nunc id interdum varius, felis ipsum congue dolor, ut congue urna turpis vel lectus. Aliquam mauris eros, convallis ut mattis at, lobortis ac risus. Donec placerat velit non ante feugiat tristique. Integer elit lacus, auctor at tincidunt nec, efficitur eu elit. Curabitur vel magna sagittis nulla sagittis ultricies sed in leo.
    //                     Vestibulum neque augue, hendrerit et eleifend in, varius non augue. Vestibulum venenatis, arcu eu accumsan volutpat, nisl erat aliquam dui, quis venenatis ex nisi in odio. Suspendisse ornare vel lectus hendrerit aliquet. Sed suscipit arcu ut nisi congue, sodales malesuada felis porta. Nullam vitae leo euismod, interdum orci ut, tempor nulla. Nam vitae erat eget diam vulputate ornare. Sed convallis blandit massa, quis pellentesque felis tristique in. Sed sit amet metus consequat, tristique velit at, consectetur quam. Suspendisse potenti. Nullam venenatis consectetur eros, ac accumsan tellus laoreet in. Mauris ut convallis odio, eget porta nulla.
    //                     Morbi consequat et enim sit amet rhoncus. Donec sed est ultricies, luctus felis non, condimentum dui. Cras scelerisque dapibus ultrices. Donec laoreet id nibh quis tempor. Phasellus id consequat lorem. Aenean turpis lectus, pulvinar a pellentesque sit amet, condimentum eu lacus. Cras leo purus, pulvinar eu elit sed, viverra sollicitudin velit. Phasellus vestibulum faucibus nisi, a lobortis enim scelerisque hendrerit. Ut at pulvinar metus. Duis eget sapien quis velit dictum rhoncus nec a tellus. Etiam non lobortis velit, ut fringilla orci.
    //                     Ut eu dui sem. Morbi ultricies porttitor mauris. Donec arcu risus, molestie tempus rutrum id, egestas eget purus. Donec neque sapien, dapibus id augue bibendum, sodales tempor libero. Etiam purus magna, congue id ante ut, ultricies facilisis arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce eleifend felis turpis, ac pellentesque nulla finibus ut. Nam pellentesque dapibus finibus. Donec eleifend felis et ipsum elementum finibus. Etiam magna turpis, lobortis nec ornare dictum, volutpat vel sem. Vivamus placerat non arcu quis sollicitudin. Integer porttitor dolor eget faucibus mattis. In pharetra tempus pharetra. Aenean placerat bibendum dolor, a rutrum turpis ornare at. Maecenas pellentesque, leo quis blandit vehicula, arcu turpis tincidunt orci, vitae mollis lectus eros in dui.                            
    //                 </p>                         
    //             </div>
    // }
}