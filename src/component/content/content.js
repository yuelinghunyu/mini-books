import React,{Component} from "react";
import './content.scss';
import Book from "../book/book";
import Header from "../header/header";

import axios from "axios";
import {getBookTypeList} from "../../server/api";
import {ERROR_OK} from "../../config/utils";

class Content extends Component{
    constructor(){
        super()
        this.state = {
            bookTypeList:[],
        }
    }
    render(){
        let header = null;
        if(this.state.bookTypeList.length > 0){
            header =  <Header 
                    bookTypeList={this.state.bookTypeList}
                    handleSetBookType = { this.handleSetBookType.bind(this)}
            ></Header>;
        }
        return(
            <div className="content-container">
                {header}
                <Book></Book>
            </div>
        )
    }
    handleSetBookType(bookType){
        const param = {
            bookType:bookType
        }
        
    }
    componentWillMount(){
        axios.all([getBookTypeList()]).then(
            axios.spread((bookTypeList)=>{
                if(bookTypeList.data.code === ERROR_OK){
                    this.setState({
                        bookTypeList:bookTypeList.data.data,
                    })
                }
            })
        )
    }
}
export default Content;