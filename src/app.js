import "./app.scss";
import React, { Component } from 'react';
import RouterIndex from "./router/index";
import Footer from "./component/footer/footer";
import {HashRouter as Router} from 'react-router-dom';

class App extends Component{
    render(){
        return(
            <Router>
                <div className='app-container'>
                    <RouterIndex></RouterIndex>
                    <Footer></Footer>
                </div>
            </Router>
        )
    }
}
export default App;