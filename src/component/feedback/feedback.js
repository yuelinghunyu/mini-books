import React,{Component} from "react";
import "./feedback.scss";
import {throttle} from "../../config/utils";
import emitter from "../../config/events";
import PropTypes from "prop-types";

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
            feedbackContent:{
                content:"",

            }
        }
    }
    componentWillMount(){
        const wechatId = this.context.router.route.match.params.wechatId;
        const wechatName = this.context.router.route.match.params.wechatName;
    }
    activeEvent(ev,index){
        ev.preventDefault();
        let circles = document.getElementsByClassName("select-circle");
        for(let i=0;i<circles.length;i++){
            circles[i].setAttribute("class","select-circle");
        }
        circles[index].setAttribute("class","select-circle select-active");
    }
    submitEvent(){
        this.setState({
            submitConfig:{
                submiting:true,
                submittext:"正在提交,请稍后~"
            }
        });
        setTimeout(()=>{
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
            },3000)
        },3000)
    }
    render(){
        return(
            <div className="feedback-container">
                <textarea placeholder="请写下您的意见或建议"></textarea>
                <div className="select-type-container">
                    <h4>请选择反馈类型</h4>
                    <div className="select-type-group">
                        <p className="select-type-item" onClick={(ev)=>{this.activeEvent(ev,0)}}>
                            <span className="select-circle select-active"></span>
                            <span className="select-text">功能建议</span>
                        </p>
                        <p className="select-type-item" onClick={(ev)=>{this.activeEvent(ev,1)}}>
                            <span className="select-circle"></span>
                            <span className="select-text">程序bug</span>
                        </p>
                        <p className="select-type-item" onClick={(ev)=>{this.activeEvent(ev,2)}}>
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