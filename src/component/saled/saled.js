import React,{Component} from 'react';
import './saled.scss';
import SaledBooks from "../saledBooks/saledBooks"
import {getUser,getBookList,getPayersInfo} from "../../server/api";
import {ERROR_OK,add} from "../../config/utils";
import axios from "axios";
import Tips from "../tips/tips";

class Saled extends Component{
    constructor(){
        super()
        this.state = {
            bookContactList:[],
            tip:"你还没有购买小典哦~"
        }
    }
    render(){
        let saledBook = null;
        if(this.state.bookContactList.length === 0){
            saledBook = <Tips tip={this.state.tip}></Tips>
        }else{
            saledBook = <SaledBooks bookList = {this.state.bookContactList}></SaledBooks>;       
        }
        return(
            <div className="saled-container">
                {saledBook}
            </div>
        )
    }
    componentWillMount(){
        const bookListParam = {
            bookType:-1
        }
        const userParam = {
            wechatId:getUser().wechatId
        }
        axios.all([getBookList(bookListParam),getPayersInfo(userParam)]).then(
            axios.spread((bookList,users)=>{
                if(bookList.data.code === ERROR_OK && users.data.code === ERROR_OK){
                    const type = Object.prototype.toString.call(users.data.data);
                    if(bookList.data.data.list.length > 0 && type === "[object Object]" && users.data.data.list.length>0){
                        const usersPayBooks = users.data.data.list;
                        const totalBookList = bookList.data.data.list;
                        let splitBookList = [];
                        usersPayBooks.forEach(bookId => {
                            splitBookList.push(add(totalBookList,bookId)[0]);
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