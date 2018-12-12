import React,{Component} from 'react';
import './personal.scss';
import PropTypes from "prop-types";
import axios from "axios";
import {getUser,getPayersInfo,getUserInfo} from "../../server/api";
import {ERROR_OK} from "../../config/utils";

class Personal extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired,
    }
    constructor(){
        super()
        this.state = {
            payerTotal:0,
            user:{
                wechatId:"",
                wechatName:"",
                wechatLogo:""
            }
        }
        this.eventPerson = this.eventPerson.bind(this);
    }

    eventPerson(ev){
        ev.preventDefault();
        const path = "/feedback"+"/"+this.state.user.wechatId+"/"+this.state.user.wechatName;
        this.context.router.history.push(path);
    }
    render(){
        return(
            <div className="personal-container">
                <div className='username-container' id={this.state.user.wechatId}>
                    <img src={this.state.user.wechatLogo} alt="logo" />
                    <span className="username">{this.state.user.wechatName}</span>
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
                    <span>{this.state.payerTotal}本</span>
                </div>
            </div>
        )
    }
    componentWillMount(){
        const userParam = {
            wechatName:getUser().wechatName
        }
        const payerParam = {
            wechatId:getUser().wechatId
        }
        axios.all([getUserInfo(userParam),getPayersInfo(payerParam)]).then(
            axios.spread((user,payer)=>{
                if(user.data.code === ERROR_OK){
                    this.setState({
                        user:{
                            wechatId:user.data.data.list[0].wechatId,
                            wechatName:user.data.data.list[0].wechatName,
                            wechatLogo:user.data.data.list[0].wechatLogo
                        }
                    })
                }
                if(payer.data.code === ERROR_OK){
                    this.setState({
                        payerTotal:payer.data.data.total
                    })
                }
            })
        )
    }
}
export default Personal;