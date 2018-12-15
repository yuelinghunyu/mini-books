import "./app.scss";
import React, { Component } from 'react';
import RouterIndex from "./router/index";
import Footer from "./component/footer/footer";
import {Route,HashRouter as Router} from 'react-router-dom';
import Warn from './component/warn/warn';
import emitter from './config/events';
import {getUser,setAttention,getUserInfo,setPayPrice} from './server/api'
import { ERROR_OK } from './config/utils'

//章节组件;
import Chapter from "./component/chapter/chapter";
//反馈组件;
import Feedback from "./component/feedback/feedback";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            warnConfig:{
                warnText:"提交失败",
                warnFlag:"fail",
                hideFlag:false,
            }
        }
    }
    componentWillMount(){
        //关注微信公众号；
        const param = {
            wechatId:getUser().wechatId,
            wechatName:getUser().wechatName,
            wechatLogo:getUser().wechatLogo
        }
        const userParam = {
            wechatId:getUser().wechatId
        }
        getUserInfo(userParam).then(res=>{//查询有没有
            if(res.data.code === ERROR_OK && res.data.data.total === 0){
                setAttention(param).then(res=>{
                    if(res.data.code === ERROR_OK){
                        console.log("关注微信公众号、插入数据库成功")
                    }
                })
            }
        })
    }
    payPriceEvent(param){
        setPayPrice(param).then(res=>{
            if(res.data.code === ERROR_OK){
                emitter.emit("showWarn",{
                    warnText:"谢谢打赏,感谢你的支持~",
                    warnFlag:"success",
                    hideFlag:true,
                });
                const path = "/brochure/"+param.bookId+"/payed";
                window.location.hash = path;
                setTimeout(()=>{
                    emitter.emit("showWarn",{
                        warnText:"谢谢打赏,感谢你的支持~",
                        warnFlag:"success",
                        hideFlag:false,
                    });
                },1000)
            }
        })
    }
    componentDidMount(){
        // 装载发射器;
       this.eventEmitterWarn = emitter.addListener("showWarn",(msg)=>{
           this.setState({
                warnConfig:msg
           })
       })
       //调支付接口
       this.eventEmitterPay = emitter.addListener("payPrice",(payParam)=>{
           console.log("price",payParam.price)
           const param = {
                wechatId:getUser().wechatId,
                wechatName:getUser().wechatName,
                wechatLogo:getUser().wechatLogo,
                bookId:payParam.bookId
            }
            console.log(param)
            this.payPriceEvent(param)
       })
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitterWarn);
        emitter.removeListener(this.eventEmitterPay);
    }
    render(){
        let warnShowOrHide = null;
        if(this.state.warnConfig.hideFlag){
            warnShowOrHide = <Warn warnText={this.state.warnConfig.warnText} warnFlag={this.state.warnConfig.warnFlag}></Warn>
        }
        return(
            <Router>
                <div className='app-container'>
                    {warnShowOrHide}
                    <RouterIndex></RouterIndex>
                    <Footer></Footer>
                    <Route path="/chapter/:bookId/:chapterId/:pay/:flag" component={Chapter}/>
                    <Route path="/feedback/:wechatId/:wechatName" component={Feedback}></Route>
                </div>
            </Router>
        )
    }
}
export default App;