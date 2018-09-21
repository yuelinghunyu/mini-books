import React,{Component} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

//组件;
import Content from '../component/content/content';
import Saled from '../component/saled/saled';
import Personal from '../component/personal/personal';

class RouterIndex extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={Content}/>
                <Route path="/home" component={Content} />
                <Route path="/saled" component={Saled} />
                <Route path="/personal" component={Personal} />
            </Switch>
        )
    }
}

export default RouterIndex;