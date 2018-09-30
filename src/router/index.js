import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';

//组件;
import BlogList from '../component/blogList/blogList';
import Content from '../component/content/content';
import Saled from '../component/saled/saled';
import Personal from '../component/personal/personal';

//魂典组件;
import Brochure from "../component/brochure/brochure";

class RouterIndex extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={BlogList}/>
                <Route path="/blogList" component={BlogList} />
                <Route path="/home" component={Content} />
                <Route path="/saled" component={Saled} />
                <Route path="/personal" component={Personal} />
                <Route path="/brochure/:id" component={Brochure}/>
            </Switch>
        )
    }
}

export default RouterIndex;