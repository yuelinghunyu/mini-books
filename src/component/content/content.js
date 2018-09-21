import React,{Component} from "react";
import './content.scss';
import Book from "../book/book";
import Header from "../header/header";

class Content extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="content-container">
                <Header></Header>
                <Book></Book>
            </div>
        )
    }
}
export default Content;