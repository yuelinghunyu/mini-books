import React,{Component} from "react";
import "./payers.scss";

//这个组件介绍购买者
class Payers extends Component{
    constructor(props){
        super(props)
        this.state = {
            userList:[
                {userId:"1",userName:"月翎魂雨",logo:"static/img/user.jpg"},
                {userId:"2",userName:"月翎魂雨",logo:"static/img/a.jpg"},
                {userId:"3",userName:"月翎魂雨",logo:"static/img/b.jpg"},
                {userId:"4",userName:"月翎魂雨",logo:"static/img/c.jpg"},
                {userId:"5",userName:"月翎魂雨",logo:"static/img/d.jpg"},
                {userId:"6",userName:"月翎魂雨",logo:"static/img/e.jpg"},
                {userId:"7",userName:"月翎魂雨",logo:"static/img/f.jpg"},
            ]
        }
    }
    render(){
        const totalList = this.state.userList;
        const list = totalList.slice(0,4).map((user,index)=>
            <li className="payers-user-item" id={user.userId} key={index}>
                <img className="payers-user-logo" alt="logo" src={user.logo} />
            </li>
        )
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