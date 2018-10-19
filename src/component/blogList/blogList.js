import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';
import BlogFrom from '../blogFrom/blogFrom';
import Header from "../header/header";
import Tips from "../tips/tips";
import "./blogList.scss";

import axios from "axios";
import {getBannerList, getBookTypeList,getBlogList} from "../../server/api";
import {ERROR_OK} from "../../config/utils";

class BlogList extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentIndex:0,
            bannerList:[],
            bookTypeList:[],
            blogList:[],
            tip:"敬请期待-_-",
            option:{
                speed: 400,
                auto: 5000,
                continuous: true,
                transitionEnd: ((index, elem)=>{
                    this.transitionEndCallback(index,elem);
                }),
            }
        }
    }
    handleSetBookType(bookType){
        const param = {
            bookType:bookType
        }
        getBlogList(param).then((res)=>{
            if(res.data.code === ERROR_OK){
                this.setState({
                    blogList:res.data.data
                })
            }
        })
    }
    render(){
        let divList = [],spanList=[];
        let swiper = null;
        let header = null;
        let blogFrom = null;
        if(this.state.bannerList.length > 0 && this.state.bookTypeList.length > 0){
            this.state.bannerList.map((item,index)=>{
                divList.push(<div className="blog-scroll" key={item.id}>
                <img src={item.href} alt="logo"/>
                </div>);
                spanList.push(<span className={this.state.currentIndex==index?"active":"normal"} key={index}></span>);
            })
            swiper = <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className="carousel" swipeOptions={this.state.option}>
                        {divList}
                    </ReactSwipe>
            header =  <Header 
                            bookTypeList={this.state.bookTypeList}
                            handleSetBookType = { this.handleSetBookType.bind(this)}
                      ></Header>;
            if(this.state.blogList.length === 0){
                blogFrom = <Tips tip={this.state.tip}></Tips>
            }else{
                blogFrom =  <BlogFrom blogList={this.state.blogList}></BlogFrom>;       
            }
        }
       
        return(
            <div className="blog-list-container">
                <div className="blog-swiper">
                    {swiper}
                    <p className="dot">{spanList}</p>
                </div>
                <div className="blog-list">
                    {header}
                    <div className="blog-item-container">
                        {blogFrom}
                    </div>
                </div>
            </div>
        )
    }
    transitionEndCallback(index, elem){
        this.setState({
            currentIndex:index
        });
    }

    componentWillMount(){
        const param = {bookType:0}
        axios.all([getBannerList(),getBookTypeList(),getBlogList(param)]).then(
            axios.spread((bannerList,bookTypeList,blogList)=>{
                if(bannerList.data.code === ERROR_OK && bookTypeList.data.code === ERROR_OK && blogList.data.code === ERROR_OK){
                    this.setState({
                        bannerList:bannerList.data.data,
                        bookTypeList:bookTypeList.data.data,
                        blogList:blogList.data.data
                    })
                }
            })
        )
    }
 
}
export default BlogList