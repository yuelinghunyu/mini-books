import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';
import BlogFrom from '../blogFrom/blogFrom';
import Header from "../header/header";
import "./blogList.scss";

class BlogList extends Component {
    constructor(props){
        super(props)
        this.state = {
            swiperList:[require("../../../static/img/banner1.jpg"),require("../../../static/img/banner2.jpg"),require("../../../static/img/banner3.jpg")],
            currentIndex:0,
        }
    }
    render(){
        let option = {
            speed: 400,
            continuous: false,
            transitionEnd: ((index, elem)=>{
                this.transitionEndCallback(index,elem);
            }),
        };
        let divList = [],spanList=[];
        this.state.swiperList.map((item,index)=>{
            divList.push(<div className="blog-scroll" key={index}>
            <img src={item} alt="logo"/>
            </div>);
            spanList.push(<span className={this.state.currentIndex==index?"active":"normal"} key={index}></span>);
        })
        let swiper = <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className="carousel" swipeOptions={option}>
                       {divList}
                    </ReactSwipe>


        return(
            <div className="blog-list-container">
                <div className="blog-swiper">
                    {swiper}
                    <p className="dot">{spanList}</p>
                </div>
                <div className="blog-list">
                    <Header></Header>
                    <div className="blog-item-container">
                        <BlogFrom></BlogFrom>
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
}
export default BlogList