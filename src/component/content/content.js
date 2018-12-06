import React,{Component} from "react";
import './content.scss';
import Book from "../book/book";
import Header from "../header/header";
import Tips from "../tips/tips";
import axios from "axios";
import {getUser,getBookTypeList,getBookList,getUserInfo,getBookTypeTotal} from "../../server/api";
import {ERROR_OK,remove} from "../../config/utils";

class Content extends Component{
    constructor(){
        super()
        this.state = {
            bookTypeList:[],
            bookContactList:[],
            tip:"敬请期待-_-",
        }
    }
    render(){
        let header = null;
        let book = null;
        if(this.state.bookTypeList.length > 0){
            header =  <Header 
                    bookTypeList={this.state.bookTypeList}
                    handleSetBookType = { this.handleSetBookType.bind(this)}
            ></Header>;
        }
        if(this.state.bookContactList.length === 0){
            book = <Tips tip={this.state.tip}></Tips>
        }else{
            book = <Book bookList = {this.state.bookContactList}></Book>;       
        }
        return(
            <div className="content-container">
                {header}
                {book}
            </div>
        )
    }
    handleSetBookType(bookType){
        const userParam = {
            wxId:getUser()
        }
        if(bookType === 0){
            bookType = -1
        }
        const param = {
            bookType:bookType
        }
        axios.all([getBookList(param),getUserInfo(userParam)]).then(
            axios.spread((bookList,users)=>{
                if(bookList.data.code === ERROR_OK && users.data.code === ERROR_OK){
                    const type = Object.prototype.toString.call(users.data.data);
                    if(bookList.data.data.list.length > 0 && type === "[object Object]" && users.data.data.list.length>0){
                        const usersPayBooks = users.data.data.list;
                        const totalBookList = bookList.data.data.list;
                        let splitBookList = [];
                        usersPayBooks.forEach(bookId => {
                            splitBookList = remove(totalBookList,bookId)
                        });
                        this.setState({
                            bookContactList:splitBookList,
                        });
                    }else{
                        this.setState({
                            bookContactList:bookList.data.data.list,
                        })
                    }
                }
            })
        );
    }
    componentWillMount(){
        const bookListParam = {
            bookType:-1
        }
        const userParam = {
            wxId:getUser()
        }
        getBookTypeTotal().then(res=>{
            if(res.data.code === ERROR_OK){
                const param ={
                    page:1,
                    limit:res.data.data
                }
                axios.all([getBookTypeList(param),getBookList(bookListParam),getUserInfo(userParam)]).then(
                    axios.spread((bookTypeList,bookList,users)=>{
                        if(bookTypeList.data.code === ERROR_OK && bookList.data.code === ERROR_OK && users.data.code === ERROR_OK){
                            const type = Object.prototype.toString.call(users.data.data);
                            if(bookList.data.data.list.length > 0 && type === "[object Object]" && users.data.data.list.length>0){
                                const usersPayBooks = users.data.data.list;
                                const totalBookList = bookList.data.data.list;
                                let splitBookList = [];
                                usersPayBooks.forEach(bookId => {
                                    splitBookList = remove(totalBookList,bookId)
                                });
                                this.setState({
                                    bookContactList:splitBookList,
                                })
                            }else{
                                this.setState({
                                    bookContactList:bookList.data.data.list,
                                })
                            }
                        let list = bookTypeList.data.data.list;
                        const all = {
                            id:'all',
                            typeId:0,
                            typeTitle:'全部'
                        }
                        list.unshift(all);
                            this.setState({
                                bookTypeList:list,
                            })
                        }
                    })
                )
            }
        })
       
    }
}
export default Content;