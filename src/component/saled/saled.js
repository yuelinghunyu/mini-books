import React,{Component} from 'react';
import './saled.scss';
import SaledBooks from "../saledBooks/saledBooks"
import {getUser,getBookList,getUserInfo} from "../../server/api";
import {ERROR_OK,add} from "../../config/utils";
import axios from "axios";

class Saled extends Component{
    constructor(){
        super()
        this.state = {
            bookContactList:[]
        }
    }
    render(){
        return(
            <div className="saled-container">
                <SaledBooks></SaledBooks>
            </div>
        )
    }
    componentWillMount(){
        const wxId = getUser();
        const bookListParam = {
            bookType:0
        }
        const userParam = {
            wxId:wxId
        }
        axios.all([getBookList(bookListParam),getUserInfo(userParam)]).then(
            axios.spread((bookList,users)=>{
                if(bookList.data.code === ERROR_OK && users.data.code === ERROR_OK){
                    const type = Object.prototype.toString.call(users.data.data);
                    if(bookList.data.data.length > 0 && type === "[object Object]" && users.data.data.books.length>0){
                        const usersPayBooks = users.data.data.books;
                        const totalBookList = bookList.data.data;
                        let splitBookList = [];
                        usersPayBooks.forEach(bookId => {
                            splitBookList = add(totalBookList,bookId)
                        });
                        this.setState({
                            bookContactList:splitBookList,
                        });
                    }else{
                        this.setState({
                            bookContactList:[],
                        })
                    }
                }
            })
        );
    }
}
export default Saled;