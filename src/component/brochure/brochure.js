import React,{Component} from "react";
import "./brochure.scss";
import BookDes from "../bookDes/bookDes";
import Payers from "../payers/payers";
import Operate from "../operate/operate";
import IntroSwiper from "../introSwiper/introSwiper";

//单个典籍的入口介绍页；
class Brochure extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        const match = this.props.match.params;
        console.log(match);
    }
    render(){
        return(
            <div className="brochure-container">
                <div>
                    <BookDes></BookDes>
                    <Payers></Payers>
                    <Operate></Operate>
                    <IntroSwiper></IntroSwiper>
                </div>
            </div>
        )
    }
}
export default Brochure;