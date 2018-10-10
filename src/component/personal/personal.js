import React,{Component} from 'react';
import './personal.scss';
import PropTypes from "prop-types";

class Personal extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired,
    }
    constructor(){
        super()
        this.eventPerson = this.eventPerson.bind(this);
    }

    eventPerson(ev){
        ev.preventDefault();
        const path = "/feedback";
        this.context.router.history.push(path);
    }
    render(){
        return(
            <div className="personal-container">
                <div className='username-container'>
                    <img src="static/img/user.jpg" alt="" />
                    <span className="username">月翎魂雨</span>
                </div>
                <div className='personal-div message-center'>
                    <span>意见反馈</span>
                    <i 
                        className="redirect icon iconfont icon-xiayibu" 
                        onClick={this.eventPerson}
                    ></i>
                </div>
                <div className='personal-div saled-btn'>
                    <span>已购</span>
                    <span>2本</span>
                </div>
                <div className='ancel-btn'>退出登录</div>
            </div>
        )
    }
}
export default Personal;