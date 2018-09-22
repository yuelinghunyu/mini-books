import React,{Component} from 'react';
import './personal.scss';

class Personal extends Component{
    constructor(){
        super()

        this.eventPerson = this.eventPerson.bind(this);
    }

    eventPerson(ev){
        ev.preventDefault();
        window.location.href = "https://juejin.im/user/5aab1203f265da239d490ab0";
    }
    render(){
        return(
            <div className="personal-container">
                <div className='username-container'>
                    <img src="static/img/user.jpg" alt="" />
                    <span className="username">月翎魂雨</span>
                    <i 
                        className="redirect icon iconfont icon-xiayibu" 
                        onClick={this.eventPerson}
                    ></i>
                </div>
                <div className='personal-div message-center'>意见反馈</div>
                <div className='personal-div saled-btn'>
                    <span>已购</span>
                    <span>2本</span>
                </div>
                <div className='ancel-btn personal-div'>退出登录</div>
            </div>
        )
    }
}
export default Personal;