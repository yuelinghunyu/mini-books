import React,{Component} from "react";
import "./payers.scss";

//这个组件介绍购买者
class Payers extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const totalList = this.props.payers;
        let list = null;
        if(totalList.length > 0){
            list = totalList.slice(0,5).map((user,index)=>
                <li className="payers-user-item" id={user.wxId} key={index}>
                    <img className="payers-user-logo" alt="logo" src={user.logo} />
                </li>
            )
        }
        return(
           <div className="payers-container">
                <div className="payers-count">
                    <i className="payers-logo icon iconfont icon-haoping"></i>
                    <span className="payers-num">{totalList.length}人已购买</span>
                </div>
                <ul className="payers-name">
                    {list}
                </ul>
           </div> 
        )
    }
}

export default Payers;