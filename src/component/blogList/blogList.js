import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';
import BlogFrom from '../blogFrom/blogFrom';
import Header from "../header/header";
import Tips from "../tips/tips";
import Loading from '../loading/loading';
import "./blogList.scss";

import axios from "axios";
import {getBannerList, getBookTypeList,getBookTypeTotal,getBlogList} from "../../server/api";
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
            },
            bookType:-1,
            loading:false,
            loadMsg:'正在加载...'
        }
    }
    handleSetBookType(bookType){
        this.setState({
            loading:false
        })
        let type = -1
        if(bookType !== 0){
            type = bookType
        }
        const param = {
            blogType:type
        }
        this.setState({
            bookType:type 
        })
        getBlogList(param).then((res)=>{
            if(res.data.code === ERROR_OK){
                this.setState({
                    blogList:res.data.data.list
                },()=>{
                    this.setState({
                        loading:true
                    })
                })
            }
        })
    }
    handleRefresh(){
        const param = {
            blogType:this.state.bookType
        }
        getBlogList(param).then((res)=>{
            if(res.data.code === ERROR_OK){
                this.setState({
                    blogList:res.data.data.list
                },()=>{
                    this.setState({
                        loading:true
                    })
                })
            }
        })
    }
    render(){
        let divList = [],spanList=[];
        let swiper = null;
        let header = null;
        let content = null;
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
          
            if(this.state.loading){
                if(this.state.blogList.length === 0){
                    content = <Tips tip={this.state.tip}></Tips>
                }else{
                    content =  
                    <BlogFrom 
                            blogList={this.state.blogList}
                            handleRefresh={this.handleRefresh.bind(this)}
                    ></BlogFrom>;       
                }
            }else{
                content = <Loading loadMsg={this.state.loadMsg}></Loading>
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
                        {content}
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
        axios.all([getBannerList({type:2}),getBookTypeTotal(),getBlogList({})]).then(
            axios.spread((bannerList,bookTypeTotal,blogList)=>{
                const param ={
                    page:1,
                    limit:bookTypeTotal.data.data
                }
                getBookTypeList(param).then(res=>{
                    if(bannerList.data.code === ERROR_OK && res.data.code === ERROR_OK && blogList.data.code === ERROR_OK){
                        let list = res.data.data.list;
                        const all = {
                            id:'all',
                            typeId:0,
                            typeTitle:'全部'
                        }
                        list.unshift(all);
                        this.setState({
                            bannerList:bannerList.data.data.list,
                            bookTypeList:list,
                            blogList:blogList.data.data.list
                        },()=>{
                            this.setState({
                                loading:true
                            })
                        })
                    }
                })
            })
        )
    }
 
}
export default BlogList