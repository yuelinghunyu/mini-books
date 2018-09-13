import "./app.scss";
import React, { Component } from 'react';
import Header from "./component/header/header";
import Footer from "./component/footer/footer";

class App extends Component{
    render(){
        return(
            <div className='app-container'>
               <Header></Header>
               <div className="content-container"></div>
               <Footer></Footer>
            </div>
        )
    }
}
export default App;