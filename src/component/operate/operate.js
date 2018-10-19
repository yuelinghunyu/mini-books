import React,{Component} from "react";
import PropTypes from "prop-types";
import "./operate.scss";

//此组件介绍是购买过后的状态还是没购买的状态；
class Operate extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired
    }
    constructor(props){
        super(props)
        this.state = {
            histroy:"",
            readerText:"开始阅读"
        }
    }
    componentWillMount(){
        const localHistory = localStorage.getItem("history");
        const id =  this.context.router.route.match.params.id;
        let bookId = "";
        if(JSON.parse(localHistory)){
            bookId = JSON.parse(localHistory)[id]
        }
        if(bookId &&  this.props.payFlag === "payed"){
            this.setState({
                readerText:"继续上次阅读"
            })
        }
    }
    render(){
        let panel1= null,panel2 = null;
        if(this.props.payFlag === "payed"){
            panel1 = <span className="go-on">{this.state.readerText}</span>
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