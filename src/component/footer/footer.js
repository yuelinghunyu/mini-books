import React,{Component} from "react";
import PropTypes from 'prop-types';
import "./footer.scss";

class Footer extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired,
    }
    constructor(props){
        super(props)
        this.state = {
            tabList:['首页','典集','已购','我的'],
            index:0,
            hideFlag:true,
        }
        this.tabEvent = this.tabEvent.bind(this);
    }
    componentWillMount(){
        const pathName = this.context.router.route.location.pathname;
        if(pathName === "/blogList"){
            this.setState({
                index:0
            })
        }else if(pathName === "/home"){
            this.setState({
                index:1
            })
        }else if(pathName === "/saled"){
            this.setState({
                index:2
            })
        }else if(pathName === "/personal"){
            this.setState({
                index:3
            })
        }
    }
    tabEvent(ev){
        ev.preventDefault();
        this.setState({
            index:parseInt(ev.target.getAttribute("data-index"))
        })
        const index = parseInt(ev.target.getAttribute("data-index"));
        let path = "";
        if(index === 0){

        }else if(index === 1){
            path = "/home"
        }else if(index === 2){
            path = "/saled"
        }else if(index === 3){
            path = "/personal"
        }
        this.context.router.history.push(path);
    }
    render(){
        const listItem = this.state.tabList.map((tab,index)=>
            
            <li 
                className={index == this.state.index?"tab-item active":"tab-item"}
                key={index}
                onClick={this.tabEvent}
                data-index={index}
            >
            <i 
                className={
                    index === 0?"tab-i icon iconfont icon-shouye":
                    (
                        index === 1?"tab-i icon iconfont icon-shujia-xu":
                        (
                            index === 2?"tab-i icon iconfont icon-zhinengyouhua":"tab-i icon iconfont icon-geren"
                        )
                    )
                } 
            data-index={index}
            ></i>
                <span
                    className="tab-text"
                    data-index={index}
                >{tab}</span>
            </li>
        );
        return(
            <div className="footer-bottom">
                <ul>
                    {listItem}
                </ul>
            </div>
        )
    }
}
export default Footer;