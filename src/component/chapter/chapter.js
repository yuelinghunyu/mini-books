import React,{Component} from 'react';
import PropTypes from "prop-types";
import "./chapter.scss";
import {getIntroMd,getBook} from "../../server/api";
import {ERROR_OK,indexOf} from "../../config/utils";
import ReactMarkdown from "react-markdown";
import Tips from "../tips/tips";

class Chapter extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired
    }
    constructor(){
        super()
        this.state = {
            bookChapterList:[],
            displayFlag:false,
            tip:"我想阅读",
            currentIndex:0,
            currentChapter:""
        }
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.backIntro = this.backIntro.bind(this);
    }
    next() {
        let index = this.state.currentIndex;
        if(this.state.currentIndex < this.state.bookChapterList.length-1){
            index ++;
            this.setState({
                currentIndex:index
            },()=>this.loadMarkDown())
        }  
    }
    
    prev() {
        let index = this.state.currentIndex;
        if(this.state.currentIndex > 0){
            index --;
            this.setState({
                currentIndex:index
            },()=>this.loadMarkDown())
        }
    }
    loadMarkDown(){
        let flag = false;//支持试读
        const chapterId = this.state.bookChapterList[this.state.currentIndex].id;
        const bookId = this.context.router.route.match.params.bookId;
        if(this.state.currentIndex === 0 || this.state.currentIndex === this.state.bookChapterList.length - 1){
            flag = true;
        }
        const path = "/chapter/"+bookId+"/"+chapterId+"/"+flag;
        this.context.router.history.replace(path);
        window.location.reload();
    }
   
    backIntro(ev){
        ev.preventDefault();
        const id = this.context.router.route.match.params.bookId;
        const path = "/brochure/"+id;
        this.context.router.history.push(path);
    }
    render(){
        let reactMarkDown = null;
        
        if(this.state.bookChapterList.length > 0 &&　this.state.currentChapter !== "" && this.state.displayFlag){
            const source = this.state.currentChapter;
            reactMarkDown =  <div className="chapter-markdown">
                                <ReactMarkdown source={source}></ReactMarkdown>
                            </div>
        }else{
            reactMarkDown = <div className="no-pay-container">
                                <Tips tip={this.state.tip}></Tips>
                            </div>
        }
        return(
            <div className="chapter-container">
                <div className="chapter-scroll-container">
                    {reactMarkDown}
                    <p 
                        className="pay-btn"
                    >点我购买</p>
                </div>
                <div className="chapter-content-footer">
                    <i className="icon iconfont icon-left" onClick={this.prev}></i>
                    <i className="icon iconfont icon-menu" onClick={this.backIntro}></i>
                    <i className="icon iconfont icon-right" onClick={this.next}></i>
                </div>
            </div>
        )
    }
    componentWillMount(){
        const bookId = this.context.router.route.match.params.bookId;
        const flag = JSON.parse(this.context.router.route.match.params.flag);
        const chapterId = this.context.router.route.match.params.chapterId;
        const book = {
            id:bookId
        }
        this.setState({
            displayFlag:flag
        })
        getBook(book).then((res)=>{
            if(res.data.code === ERROR_OK){
                this.setState({
                    bookChapterList:res.data.data.chapters,
                });
                const currentIndex=indexOf(this.state.bookChapterList,chapterId)
                this.setState({
                    currentIndex:currentIndex,
                });
                const urlParam = {
                    url:this.state.bookChapterList[this.state.currentIndex].href
                }
                this.getIntroMd(urlParam);
            }
        })

    }
    //解析markdown文件;
    getIntroMd(param){
        getIntroMd(param).then((res)=>{
            this.setState({
                currentChapter:res.data
            })
        });
    }
}

export default Chapter;