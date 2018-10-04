import React, { Component } from 'react';
import "./header.scss";
import {guid} from "../../config/utils";

import PropTypes from 'prop-types';
class Header extends Component{
    static propTypes = {
        handleSetBookType: PropTypes.func.isRequired,
    }
    constructor(props){
        super(props);
        this.state = {
            index:0,
            bookTypeList:[{id:guid(),title:"全部", bookType:0}]
        };
        this.activeEvent = this.activeEvent.bind(this);
    }
    activeEvent(index,bookType){
       this.setState({
           index:index
       });
       this.props.handleSetBookType(bookType);
    }
    render(){
        let liList = []
        this.state.bookTypeList.map((type,index)=>{
            liList.push(<li 
                key={index}
                className={index==this.state.index?"li-item active":"li-item"}
                onClick={this.activeEvent.bind(this,index,type.bookType)}
                data-type={type.bookType}
                data-index= {index}
            >{type.title}</li>)
        });
        this.props.bookTypeList.map((type,index)=>{
            liList.push(<li 
                key={index+1}
                className={(index+1)==this.state.index?"li-item active":"li-item"}
                onClick={this.activeEvent.bind(this,index+1,type.bookType)}
                data-type={type.bookType}
                data-index= {index+1}
            >{type.title}</li>)
        });
        return(
            <div className="header-top">
                <ul className="top-ul">{liList}</ul>
            </div>
        )
    }
}
export default Header;