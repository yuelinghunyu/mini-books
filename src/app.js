import "./app.scss";
import React, { Component } from 'react';
import Header from "./component/header/header";
import Content from "./component/content/content";
import Footer from "./component/footer/footer";
import PullLoad from "./component/pullload/pullload";

class App extends Component{
    render(){
        return(
            <div className='app-container'>
               <Header></Header>
               <PullLoad></PullLoad>
               <Footer></Footer>
            </div>
        )
    }
}
export default App;