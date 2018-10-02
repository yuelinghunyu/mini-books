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
        const {children,init} = this.props;
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
}

export default Rescroll;