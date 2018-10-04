import React,{Component} from 'react';
import Rescroll from "../scroll/rescroll";
import IScroll from "../scroll/iscroll-probe";
import PropTypes from "prop-types";
import "./blogFrom.scss";

class BlogFrom extends Component{

    constructor(props){
        super(props);
        this.state = {
            loadingStep:0, //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新  
        }
    }
    redirectBlog(href){
        window.location.href = href;
    }
    render(){
        let liList = this.props.blogList.map((blog,index)=>
            <li className="li-blog-item" key={index} onClick={this.redirectBlog.bind(this,blog.href)}>
                <p>{blog.title}</p>
                <div className="blog-status">
                    <p>
                        <i className="icon iconfont icon-chakan"></i>
                        <span>{blog.times} 次</span>
                    </p>
                    <p>
                        <i className="icon iconfont icon-chuangjianshijian"></i>
                        <span>{blog.createTime}</span>
                    </p>
                </div>
            </li>
        )
        return(
            <Rescroll>
                <ul className="li-blog-container">
                    {liList}
                </ul>
            </Rescroll>
        )
    }
    componentDidMount(){
        let option = {
            mouseWheel: false,
            scrollY: true,
            probeType: 2,
            bindToWrapper: true
        }
        const wrapper = document.getElementById("wrapper");
        document.getElementsByClassName("li-blog-container")[0].style.minHeight =  wrapper.clientHeight+ 10 + "px";
        console.log(document.getElementsByClassName("li-blog-container")[0].clientHeight);
        let myScroll,
            pullDown = document.getElementById("pullDown"),
            pullUp = document.getElementById("pullUp"),
            pullDownLabel = document.getElementsByClassName("pullDownLabel")[0],
            pullUpLabel = document.getElementsByClassName("pullUpLabel")[0],
            pulldownTips = document.getElementsByClassName("pulldown-tips")[0];
            pullDown.style.display = "none";
            pullUp.style.display = "none";
            myScroll = new IScroll('#wrapper',option);
        const that = this;
      
        myScroll.on("scroll", function() {
            if(that.state.loadingStep == 0 && !pullDown.getAttribute("class").match('refresh|loading') && !pullUp.getAttribute("class").match('refresh')){
                if(this.y > 60) { //下拉刷新操作  
                    pulldownTips.style.display = "none";
                    pullDown.setAttribute("class","refresh");
                    pullDown.style.display ="block";
                    setTimeout(function(){
                        pullDownLabel.setAttribute("class","pullDownLabel pullDownLabel-default up-rotate");
                    },300)
                    that.setState({
                        loadingStep:1
                    })
                    myScroll.refresh();
                }else if(this.y < (this.maxScrollY - 14)) { //上拉加载更多  
                    pullUp.setAttribute("class","refresh");
                    pullUp.style.display ="block";
                    pullUpLabel.innerHTML ="正在载入";
                    that.setState({
                        loadingStep:1
                    })
                    that.pullUpAction(myScroll);
                }
            }
        });
        myScroll.on("scrollEnd", function() {
            if(that.state.loadingStep == 1) {
                if(pullDown.getAttribute("class").match("refresh")) { //下拉刷新操作  
                    pullDown.setAttribute("class","loading");
                    pullDownLabel.setAttribute("class","pullDownLabel pullDownLabel-refresh up-rotate");
                    that.setState({
                        loadingStep:2
                    })
                    that.pullDownAction(myScroll);
                }
            }
        });
    }
    
    pullDownAction(myScroll){
        let pullDown = document.getElementById("pullDown"),
            pullDownLabel = document.getElementsByClassName("pullDownLabel")[0],
            pulldownTips = document.getElementsByClassName("pulldown-tips")[0];
        const that = this;
        setTimeout(function() {
            pullDown.setAttribute('class', '');
            pullDown.style.display = "none";
            pullDownLabel.setAttribute("class","pullDownLabel pullDownLabel-default");
            myScroll.refresh();
            that.setState({
                loadingStep:0
            })
            pulldownTips.style.display = "block";
        }, 1000);
    }
    pullUpAction(myScroll){
        let pullUp = document.getElementById("pullUp");
        const that = this;
        setTimeout(function() {
            pullUp.setAttribute("class","");
            pullUp.style.display ="none";
            myScroll.refresh();
            that.setState({
                loadingStep:0
            })
        }, 1000);
    }
}
export default BlogFrom;