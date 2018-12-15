import React,{Component} from "react";
import PropTypes from "prop-types";
import "./operate.scss";
import emitter from "../../config/events"

//此组件介绍是购买过后的状态还是没购买的状态；
class Operate extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired
    }
    constructor(props){
        super(props)
        this.state = {
            histroy:"",
            readerText:"开始阅读",
            historyPath:""
        }
    }
    componentWillMount(){
        const localHistory = localStorage.getItem("history");
        const bookId =  this.context.router.route.match.params.id;
        if(JSON.parse(localHistory)){
            this.setState({
                historyPath:JSON.parse(localHistory)[bookId]
            },()=>{
                if(this.state.historyPath &&  this.props.payFlag === "payed"){
                    this.setState({
                        readerText:"继续上次阅读"
                    })
                }
            })
        }else{
            this.tryReadEvent(true)
        }
        
    }
    tryReadEvent(flag){
        const chapterId = localStorage.getItem("firstChapterId");
        const bookId = this.context.router.route.match.params.id;
        const payed = this.context.router.route.match.params.pay;
        const path = "/chapter/"+bookId+"/"+chapterId+"/"+payed+"/"+flag;
        this.setState({
            historyPath:path
        })
        this.context.router.history.replace(path);
        window.location.reload();
    }
    renderHistoryChapter(){
        this.context.router.history.replace(this.state.historyPath);
        window.location.reload();
    }
    payPriceEvent(){
        const param = {bookId:this.context.router.route.match.params.id,price:parseFloat(this.props.price)}
        emitter.emit("payPrice",param)
    }
    render(){
        let panel1= null,panel2 = null;
        if(this.props.payFlag === "payed"){
            panel1 = <span className="go-on" onClick={this.renderHistoryChapter.bind(this)}>{this.state.readerText}</span>
        }else{
            panel1 = <span className="try-read" onClick={this.tryReadEvent.bind(this,true)}>试读</span>
            panel2 = <span className="pay-for-price" onClick={this.payPriceEvent.bind(this)}>购买 ￥{this.props.price}</span>
        }
        return(
            <div className="operate-container">
                {panel1}{panel2}
            </div>
        )
    }
}

export default Operate;