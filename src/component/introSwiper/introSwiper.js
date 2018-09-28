import React,{Component} from "react";
import ReactSwipe from 'react-swipe'
import "./introSwiper.scss";
import PropTypes from "prop-types";
import emitter from "../../config/events";
import marked from "marked";
import {getIntroMd} from "../../server/api";

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
            isPay:false,
            bookChapterList:[
                {id:"1",href:"#",title:"什么事魂典",time:"1分",studyNum:2341},
                {id:"2",href:"#",title:"魂典的架构",time:"1分",studyNum:341},
                {id:"3",href:"#",title:"基础1：魂典能帮助你实现什么功能",time:"4分",studyNum:341},
                {id:"4",href:"#",title:"基础2：采用vue路由进行拦截跳转",time:"3分",studyNum:341},
                {id:"5",href:"#",title:"基础3：采用vue生命周期",time:"3分",studyNum:341},
                {id:"6",href:"#",title:"总结：魂典总体实现方式",time:"2分",studyNum:341},
                {id:"7",href:"#",title:"结束语",time:"1分",studyNum:2341}
            ],
            introContent:""
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
        console.log(this);
        this.reactSwipe.prev();
    }
    redirectChapter(id,ev){
        ev.preventDefault();
        emitter.emit('hideFooter',false);
        const path = "/chapter/"+id+"/"+false;
        this.context.router.history.push(path);
    }
    render(){
        let option = {
            speed: 400,
            continuous: false,
            transitionEnd: ((index, elem)=>{
               this.transitionEndCallback(index,elem);
            }),
        };
        let pane1 = [];
        this.state.bookChapterList.map((chapter,index)=>{
            let i = null;
            if((index === 0 || index === this.state.bookChapterList.length-1)&& !this.state.isPay){
                i = <i className="chapter-is-pay try">试读</i>
            }else if(!this.state.isPay){
                i = <i className="chapter-is-pay icon iconfont icon-suo"></i>
            }
            let li = <li 
                        className="chapter-item" 
                        key={index} 
                        data-id={chapter.id} 
                        onClick={(ev)=>this.redirectChapter(chapter.id,ev)}
                    >
                        <span className="flag-qid">{index + 1}</span>
                        <div className="flag-qid-right">
                            <div>
                                <span className="flag-qid-title">{chapter.title}</span>
                                <p className="chapter-status">
                                    <span>时长:{chapter.time}</span>
                                    <span>{chapter.studyNum}次学习</span>
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
                    <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className="carousel" swipeOptions={option}>
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
            </div>
        )
    }
    componentWillMount(){
        getIntroMd({}).then((res)=>{
            this.state.introContent = res.data;
            let showdown  = require('showdown');
            let converter = new showdown.Converter();
            document.getElementsByClassName("intro-description")[0].innerHTML = converter.makeHtml(this.state.introContent);
        })
    }
    componentDidMount(){
       const totalH = document.getElementsByClassName("brochure-container")[0].clientHeight;
       const bookDesH = document.getElementsByClassName("bookDes-container")[0].clientHeight;
       const payersH = document.getElementsByClassName("payers-container")[0].clientHeight;
       const operateH = document.getElementsByClassName("operate-container")[0].clientHeight;
       const carouselH = totalH-bookDesH-payersH-operateH-150;
       document.getElementsByClassName("carousel")[0].style.height = (carouselH/75).toFixed(3)+"rem";
       document.getElementsByClassName("chapter-scroll")[0].style.height = (carouselH/75).toFixed(3)+"rem";
       document.getElementsByClassName("chapter-scroll")[1].style.height = (carouselH/75).toFixed(3)+"rem";
    }
}

export default IntroSwiper;