import React,{Component} from "react";
import "./feedback.scss";
import {throttle} from "../../config/utils";
import emitter from "../../config/events";
import PropTypes from "prop-types";
import {setFeedBack} from "../../server/api";
import {ERROR_OK} from "../../config/utils";

class Feedback extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired,
    }

    constructor(props){
        super(props)
        this.state = {
            submitConfig:{
                submiting:false,
                submittext:"提交"
            },
            wechatId:"",
            wechatName:"",
            feedType:2,
            type:1,
            content:""
        }
    }
    componentWillMount(){
        const wechatId = this.context.router.route.match.params.wechatId;
        const wechatName = this.context.router.route.match.params.wechatName;
        this.setState({
            wechatId:wechatId,
            wechatName:wechatName,
        })
    }
    activeEvent(ev,index){
        ev.preventDefault();
        let circles = document.getElementsByClassName("select-circle");
        for(let i=0;i<circles.length;i++){
            circles[i].setAttribute("class","select-circle");
        }
        circles[index-1].setAttribute("class","select-circle select-active");
        this.setState({type:index})
    }
    textareaEvent(ev){
        this.setState({content:ev.target.value})
    }
    submitEvent(){
        this.setState({
            submitConfig:{
                submiting:true,
                submittext:"正在提交,请稍后~"
            }
        });

        const params = {
            wechatId:this.state.wechatId,
            wechatName:this.state.wechatName,
            feedType:2,
            type:this.state.type,
            content:this.state.content
        }
        setFeedBack(params).then(res=>{
            if(res.data.code === ERROR_OK){
                emitter.emit("showWarn",{
                    warnText:"提交成功,感谢你的支持~",
                    warnFlag:"success",
                    hideFlag:true,
                });
                setTimeout(()=>{
                    this.setState({
                        submitConfig:{
                            submiting:false,
                            submittext:"提交"
                        }
                    });
                    emitter.emit("showWarn",{
                        warnText:"提交成功,感谢你的支持~",
                        warnFlag:"success",
                        hideFlag:false,
                    });
                    const path = "/personal";
                    this.context.router.history.push(path);
                },2000)
            }
        })
    }
    render(){
        return(
            <div className="feedback-container">
                <textarea placeholder="请写下您的意见或建议" onInput={this.textareaEvent.bind(this)}></textarea>
                <div className="select-type-container">
                    <h4>请选择反馈类型</h4>
                    <div className="select-type-group">
                        <p className="select-type-item" onClick={(ev)=>{this.activeEvent(ev,1)}}>
                            <span className="select-circle select-active"></span>
                            <span className="select-text">功能建议</span>
                        </p>
                        <p className="select-type-item" onClick={(ev)=>{this.activeEvent(ev,2)}}>
                            <span className="select-circle"></span>
                            <span className="select-text">程序bug</span>
                        </p>
                        <p className="select-type-item" onClick={(ev)=>{this.activeEvent(ev,3)}}>
                            <span className="select-circle"></span>
                            <span className="select-text">其他</span>
                        </p>
                    </div>
                </div>
                <div className="submit-btn" onClick={throttle(this.submitEvent.bind(this),1000)}>{this.state.submitConfig.submittext}</div>
            </div>
        )
    }
}
export default Feedback;