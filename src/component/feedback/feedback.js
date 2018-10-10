import React,{Component} from "react";
import "./feedback.scss";

class Feedback extends Component{
    constructor(props){
        super(props)
        this.state = {
            warnText:"提交成功"
        }
    }
    activeEvent(ev,index){
        ev.preventDefault();
        let circles = document.getElementsByClassName("select-circle");
        for(let i=0;i<circles.length;i++){
            circles[i].setAttribute("class","select-circle");
        }
        circles[index].setAttribute("class","select-circle select-active");
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
                <div className="submit-btn">提交</div>
            </div>
        )
    }
}
export default Feedback;