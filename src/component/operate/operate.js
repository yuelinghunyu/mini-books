import React,{Component} from "react";
import "./operate.scss";

//此组件介绍是购买过后的状态还是没购买的状态；
class Operate extends Component{
    constructor(props){
        super(props)
        this.state = {
            payFlag:false
        }
    }
    render(){
        let panel1= null,panel2 = null;
        if(this.state.payFlag){
            panel1 = <span className="go-on">继续上次阅读</span>
        }else{
            panel1 = <span className="try-read">试读</span>
            panel2 = <span className="pay-for-price">购买 ￥9.9</span>
        }
        return(
            <div className="operate-container">
                {panel1}{panel2}
            </div>
        )
    }
}

export default Operate;