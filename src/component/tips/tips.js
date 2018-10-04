import React,{Component} from 'react';
import "./tips.scss";

class Tips extends Component{
    constructor(props){
        super(props)
        this.state = {
            tip:"敬请期待",
            logo:require("static/img/default.jpg")
        }
    }

    render(){
        return(
            <div className="tips-container">
                <div className="tip-container">
                    <img src={this.state.logo} />
                    <p className="tip-content">{this.state.tip}</p>
                </div>
            </div>
        )
    }
}

export default Tips;