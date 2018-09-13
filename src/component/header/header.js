import React, { Component } from 'react';
import "./header.scss";

class Header extends Component{
    constructor(){
        super();
        this.state = {
            typeList:["全部","PC","后端","移动H5","人工智能","通用"],
            index:0
        };
        this.activeEvent = this.activeEvent.bind(this);
    }
    activeEvent(ev){
       this.setState({
           index:parseInt(ev.target.getAttribute("data-index"))
       })
    }
    render(){
        const listItem = this.state.typeList.map((type,index)=>
            <li 
                key={index}
                className={index==this.state.index?"li-item active":"li-item"}
                onClick={this.activeEvent}
                data-index={index}
            >{type}</li>
        );
        return(
            <div className="header-top">
                <ul className="top-ul">{listItem}</ul>
            </div>
        )
    }
}
export default Header;