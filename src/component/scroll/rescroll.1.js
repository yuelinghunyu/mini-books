import IScroll from "./iscroll-probe";
import "./rescroll.scss";
import React, { Component } from 'react';

class Rescroll extends Component{
    constructor(props){
        super(props)
        this.state = {
            loadingStep:0, //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新  
        }
    }
    render(){
        const {children} = this.props;
        return(
            <div id="wrapper">
                <div id="scroller">
                    <div id="pullDown" className="">
                        <span className="pullDownLabel pullDownLabel-default"></span>
                    </div>
                    <div className="pulldown-tips">
                        <span className= "pulldown-logo"></span>
                    </div>
                    {children}
                    <div id="pullUp" className="">
                        <div className="pullUpLabel">加载更多</div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        let option = {
            mouseWheel: false,
            scrollY: true,
            probeType: 2,
            bindToWrapper: true
        }
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

export default Rescroll;