import React,{Component} from "react";
import ReactSwipe from 'react-swipe'
import "./introSwiper.scss";
import PropTypes from "prop-types";
import {getIntroMd} from "../../server/api";
import ShowImg from '../showImg/showImg';
import "../showImg/hammer.min.js";
import "../showImg/hammer-pic.js";

//此组件有目录和介绍组成;

class IntroSwiper extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired
    }
    constructor(props){
        super(props)
        this.state = {
            currentIndex:0,
            isClick:true,
            picShow:"",
            option:{
                speed: 400,
                continuous: false,
                transitionEnd: ((index, elem)=>{
                   this.transitionEndCallback(index,elem);
                }),
            }
        }
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }
    transitionEndCallback(index,elem){
        let flag = null;
        if(index === 0){
            flag = true
        }else{
            flag = false
        }
        this.setState({
            isClick:flag
        })
    }
    next(ev) {
        this.setState({
            isClick:false
        })
        this.reactSwipe.next();
    }
    
    prev(ev) {
        this.setState({
            isClick:true
        })
        this.reactSwipe.prev();
    }
    redirectChapter(chapterId,index,ev){
        ev.preventDefault();
        const id = this.context.router.route.match.params.id;
        let flag = false;//支持试读
        if(this.props.payFlag === "payed" || (index === 0 || index === this.props.bookIntro.chapters.length - 1)){
            flag = true;
        }
        if(this.props.payFlag === "payed"){
            let history = {}
            if(localStorage.getItem("history")){
                history = JSON.parse(localStorage.getItem("history"));
                history[id] = chapterId;
            }else{
                history[id] = chapterId;
            }
            localStorage.setItem("history",JSON.stringify(history));
        }
        const path = "/chapter/"+id+"/"+chapterId+"/"+this.props.payFlag+"/"+flag;
        this.context.router.history.push(path);
    }
    render(){
        let pane1 = [];
        this.props.bookIntro.chapters.map((chapter,index)=>{
            let i = null;
            if((index === 0 || index === this.props.bookIntro.chapters.length-1)&& (this.props.payFlag === "nopay")){
                i = <i className="chapter-is-pay try">试读</i>
            }else if (this.props.payFlag === "nopay"){
                i = <i className="chapter-is-pay icon iconfont icon-suo"></i>
            }else{
                i = <i></i>
            }
            let li = <li 
                        className="chapter-item" 
                        key={index} 
                        data-id={chapter.id} 
                        onClick={(ev)=>this.redirectChapter(chapter.id,index,ev)}
                    >
                        <span className="flag-qid">{index + 1}</span>
                        <div className="flag-qid-right">
                            <div>
                                <span className="flag-qid-title">{chapter.title}</span>
                                <p className="chapter-status">
                                    <span>时长:{chapter.time}</span>
                                    <span>{chapter.browser}次学习</span>
                                </p>
                            </div>
                            {i}
                        </div>
                    </li>
            pane1.push(li);
        });
        return(
            <div className="intro-chapter-container">
                <div className="intro-chapter-tab">
                    <span className={this.state.isClick?"intro-active":""} onClick={this.prev}>目录</span>
                    <span className={!this.state.isClick?"intro-active":""} onClick={this.next}>介绍</span>
                    <i className={!this.state.isClick?"i-active":""}></i>
                </div>
                <div className="intro-chapter-swiper">
                    <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className="carousel" swipeOptions={this.state.option}>
                        <div className="box">
                            <div className="chapter-scroll">
                                <ul >
                                    {pane1}
                                </ul>
                            </div>
                        </div>
                        <div className="box">
                            <div className="chapter-scroll">
                                <div className="intro-description"></div>
                            </div>
                        </div>
                    </ReactSwipe>
                </div>
                <ShowImg pics={this.state.picShow}></ShowImg>
            </div>
        )
    }
    componentWillMount(){
        const params = {
            url:this.props.bookIntro.introUrl
        };
        getIntroMd(params).then((res)=>{
            let showdown  = require('showdown');
            let converter = new showdown.Converter();
            document.getElementsByClassName("intro-description")[0].innerHTML = converter.makeHtml(res.data);


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
    componentDidMount(){
       const totalH = document.getElementsByClassName("brochure-container")[0].clientHeight;
       const bookDesH = document.getElementsByClassName("bookDes-container")[0].clientHeight;
       const payersH = document.getElementsByClassName("payers-container")[0].clientHeight;
       const operateH = document.getElementsByClassName("operate-container")[0].clientHeight;
       const tabH = document.getElementsByClassName("intro-chapter-tab")[0].clientHeight;
       const carouselH = totalH-bookDesH-payersH-operateH-tabH-30;
       document.getElementsByClassName("carousel")[0].style.height = carouselH+"px";
       document.getElementsByClassName("chapter-scroll")[0].style.height = carouselH+"px";
       document.getElementsByClassName("chapter-scroll")[1].style.height = carouselH+"px";
    }
}

export default IntroSwiper;