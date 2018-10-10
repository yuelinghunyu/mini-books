import React,{Component} from 'react';
import "./warn.scss";

class Warn extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={this.props.warnFlag === "success"?"warn-container success-warn":"warn-container fail-warn"}>
                <i className={this.props.warnFlag === "success"?"warning icon iconfont icon-dui":"warning icon iconfont icon-cuo"}></i>
                <span>{this.props.warnText}</span>
            </div>
        )
    }
}

export default Warn;