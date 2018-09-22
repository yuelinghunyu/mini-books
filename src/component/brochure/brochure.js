import React,{Component} from "react";
import "./brochure.scss";
import BookDes from "../bookDes/bookDes";
import Payers from "../payers/payers";

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
                <BookDes></BookDes>
                <Payers></Payers>
            </div>
        )
    }
}
export default Brochure;