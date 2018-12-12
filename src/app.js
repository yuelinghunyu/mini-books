import "./app.scss";
import React, { Component } from 'react';
import RouterIndex from "./router/index";
import Footer from "./component/footer/footer";
import {Route,HashRouter as Router} from 'react-router-dom';
import Warn from './component/warn/warn';
import emitter from './config/events';

//章节组件;
import Chapter from "./component/chapter/chapter";
//反馈组件;
import Feedback from "./component/feedback/feedback";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            warnConfig:{
                warnText:"提交失败",
                warnFlag:"fail",
                hideFlag:false,
            }
        }
    }
    componentWillMount(){
     
    }
    componentDidMount(){
        // 装载发射器;
       this.eventEmitter = emitter.addListener("showWarn",(msg)=>{
           this.setState({
                warnConfig:msg
           })
       })
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }
    render(){
        let warnShowOrHide = null;
        if(this.state.warnConfig.hideFlag){
            warnShowOrHide = <Warn warnText={this.state.warnConfig.warnText} warnFlag={this.state.warnConfig.warnFlag}></Warn>
        }
        return(
            <Router>
                <div className='app-container'>
                    {warnShowOrHide}
                    <RouterIndex></RouterIndex>
                    <Footer></Footer>
                    <Route path="/chapter/:bookId/:chapterId/:pay/:flag" component={Chapter}/>
                    <Route path="/feedback/:wechatId/:wechatName" component={Feedback}></Route>
                </div>
            </Router>
        )
    }
}
export default App;