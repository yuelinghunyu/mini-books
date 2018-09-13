import React,{Component} from "react";
import './content.scss';
import Book from "../book/book";

class Content extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="content-container">
                <Book></Book>
            </div>
        )
    }
}

export default Content;