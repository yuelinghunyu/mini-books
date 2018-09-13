import React,{Component} from "react";
import "./footer.scss";

class Footer extends Component{
    constructor(){
        super()
        this.state = {
            tabList:['典集','已购','我的'],
            index:0
        }
        this.tabEvent = this.tabEvent.bind(this);
    }

    tabEvent(ev){
        this.setState({
            index:parseInt(ev.target.getAttribute("data-index"))
        })
    }
    render(){
        const listItem = this.state.tabList.map((tab,index)=>
            <li 
                className={index == this.state.index?"tab-item active":"tab-item"}
                key={index}
                onClick={this.tabEvent}
                data-index={index}
            >
                <span 
                    className="tab-img"
                    data-index={index}
                ></span>
                <span
                    className="tab-text"
                >{tab}</span>
            </li>
        );
        return(
            <div className="footer-bottom">
                <ul>{listItem}</ul>
            </div>
        )
    }
}
export default Footer;