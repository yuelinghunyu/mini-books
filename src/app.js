import "./app.scss";
import React, { Component } from 'react';
import RouterIndex from "./router/index";
import Footer from "./component/footer/footer";
import {Route,HashRouter as Router} from 'react-router-dom';
import emitter from './config/events';

//章节组件;
import Chapter from "./component/chapter/chapter";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            hideFlag:true,
        }
    }
    componentWillMount(){
        const params = window.location.hash.split("/");
        if(params[1] === "chapter"){
            const hideFlag = JSON.parse(params[3]);
            this.setState({
                hideFlag:hideFlag
            })
        }
       
    }
    componentDidMount(){
        // 装载发射器;
       this.eventEmitter = emitter.addListener("hideFooter",(msg)=>{
           this.setState({
               hideFlag:msg
           })
       })
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }
    render(){
        return(
            <Router>
                <div className='app-container'>
                    <RouterIndex></RouterIndex>
                    {this.state.hideFlag?<Footer></Footer>:null}
                    <Route path="/chapter/:id/:flag" component={Chapter}/>
                </div>
            </Router>
        )
    }
}
export default App;