import React,{Component} from 'react';
import PropTypes from "prop-types";
import "./chapter.scss";
import {getIntroMd,getBookList} from "../../server/api";
import {ERROR_OK,indexOf} from "../../config/utils";
import ReactMarkdown from "react-markdown";
import Tips from "../tips/tips";
import ShowImg from '../showImg/showImg';
import Loading from '../loading/loading';
import "../showImg/hammer.min.js";
import "../showImg/hammer-pic.js";
import emmiter from '../../config/events'

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
            currentChapter:"",
            picShow:"",
            price:0,
            payFlag:false,
            loading:false,
            loadMsg:'正在加载...'
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
        const payed = this.context.router.route.match.params.pay;
        if(this.state.payFlag){
            flag = true;
        }else{
            if(this.state.currentIndex === 0 || this.state.currentIndex === this.state.bookChapterList.length - 1){
                flag = true;
            }else{
                flag = false;
            }
        }
        const path = "/chapter/"+bookId+"/"+chapterId+"/"+payed+"/"+flag;
        this.context.router.history.replace(path);
        window.location.reload();
    }
   
    backIntro(ev){
        ev.preventDefault();
        const id = this.context.router.route.match.params.bookId;
        const payed = this.context.router.route.match.params.pay;
        const path = "/brochure/"+id+"/"+payed;
        this.context.router.history.push(path);
    }
    render(){
        let reactMarkDown = null,pl=null;
       
        if(!this.state.payFlag){
            pl =  <p 
                className="pay-btn"
                onClick={this.payPriceEvent.bind(this)}
            >点我购买</p>
        }
        if(this.state.loading){
            reactMarkDown = <Loading loadMsg={this.state.loadMsg}></Loading>
        }else{
            if(this.state.bookChapterList.length > 0 &&　this.state.currentChapter !== "" && this.state.displayFlag){
                const source = this.state.currentChapter;
                reactMarkDown =  <div id='mark-down-container'>
                                    <ReactMarkdown source={source}></ReactMarkdown>
                                </div>
            }else{
                reactMarkDown = <div className="no-pay-container">
                                    <Tips tip={this.state.tip}></Tips>
                                </div>
            }
        }

        return(
            <div className="chapter-container">
                <div className="chapter-scroll-container">
                    {reactMarkDown}
                    {pl}
                </div>
                <div className="chapter-content-footer">
                    <i className="icon iconfont icon-left" onClick={this.prev}></i>
                    <i className="icon iconfont icon-menu" onClick={this.backIntro}></i>
                    <i className="icon iconfont icon-right" onClick={this.next}></i>
                </div>
                <ShowImg pics={this.state.picShow}></ShowImg>
            </div>
        )
    }
    payPriceEvent(){
        const param = {bookId:this.context.router.route.match.params.bookId,price:this.state.price}
        emmiter.emit("payPrice",param)
    }
    componentWillMount(){
        this.setState({
            loading:true
        })

        const bookId = this.context.router.route.match.params.bookId;
        const flag = JSON.parse(this.context.router.route.match.params.flag);
        const chapterId = this.context.router.route.match.params.chapterId;
        const payed = this.context.router.route.match.params.pay;
        const book = {
            id:bookId
        }
        this.setState({
            displayFlag:flag,
            payFlag:payed==="payed"?true:false
        })
        getBookList(book).then((res)=>{
            if(res.data.code === ERROR_OK){
                const book = res.data.data.list[0]
                this.setState({
                    bookChapterList:book.chaptersList,
                    price:book.price
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
            if(res.data.code === ERROR_OK){
                this.setState({
                    currentChapter:res.data.data.content
                },()=>{
                    this.setState({
                        loading:false
                    })
                })
            }
           
            //图片预览;
            let imgs = document.getElementsByTagName("img");
            let that = this;
            for(let i=0;i<imgs.length;i++){
                imgs[i].addEventListener("click",function(){
                    that.setState({
                        picShow:this.src
                    })
                    document.getElementsByClassName("img-container")[0].style.display = 'block';
                    let pic = new Pic('.m-pic');
                    pic.picInit();
                })
            }
        });
    }
}

export default Chapter;