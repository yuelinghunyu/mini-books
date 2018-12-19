import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';
import BlogFrom from '../blogFrom/blogFrom';
import Header from "../header/header";
import Tips from "../tips/tips";
import Loading from '../loading/loading';
import IscrollLuo from 'iscroll-luo';
import "./blogList.scss";
import "./refresh.scss";

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
            page:1,
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
        this.setState({
            loading:false,
            page:1
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
    handleLoading(){
        let count = this.state.page
        this.setState({
            loading:false,
            page:++count
        },()=>{
            const param = {
                blogType:this.state.bookType,
                page:this.state.page
            }
            getBlogList(param).then((res)=>{
                if(res.data.code === ERROR_OK){
                    let array = res.data.data.list
                    let newBlogList = this.state.blogList.concat(array)
                    this.setState({
                        blogList:newBlogList
                    },()=>{
                        this.setState({
                            loading:true
                        })
                    })
                }
            })
        })
        
    }
    render(){
        let divList = [],spanList=[];
        let swiper = null;
        let header = null;
        let content = null;
        if(this.state.bannerList.length > 0){
            this.state.bannerList.map((item,index)=>{
                divList.push(<div className="blog-scroll" key={item.id}>
                <img src={item.href} alt="logo"/>
                </div>);
                spanList.push(<span className={this.state.currentIndex==index?"active":"normal"} key={index}></span>);
            })
            swiper = <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className="carousel" swipeOptions={this.state.option}>
                        {divList}
                    </ReactSwipe>
            
           
        }
        if(this.state.bookTypeList.length > 0){
            header =  <Header 
                            bookTypeList={this.state.bookTypeList}
                            handleSetBookType = { this.handleSetBookType.bind(this)}
                      ></Header>;
          
            if(this.state.loading){
                if(this.state.blogList.length === 0){
                    content = <Tips tip={this.state.tip}></Tips>
                }else{
                    content = <BlogFrom  blogList={this.state.blogList}></BlogFrom>;       
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
                    <IscrollLuo
                        onPullDownRefresh={() => this.handleRefresh()}
                        onPullUpLoadMore={() => this.handleLoading()}
                    >
                        <div className="blog-item-container">
                            {content}
                        </div>
                    </IscrollLuo>    
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
                        if(res.data.data.list.length > 0){
                            let list = res.data.data.list;
                            const all = {
                                id:'all',
                                typeId:0,
                                typeTitle:'全部'
                            }
                            list.unshift(all);
                            this.setState({
                                bookTypeList:list
                            })
                        }
                       if(bannerList.data.data.list.length>0){
                            this.setState({
                                bannerList:bannerList.data.data.list
                            })
                       }
                       if(blogList.data.data.list.length>0){
                            this.setState({
                                blogList:blogList.data.data.list
                            },()=>{
                                this.setState({
                                    loading:true
                                })
                            })
                       }
                    }
                })
            })
        )
    }
 
}
export default BlogList