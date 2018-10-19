import React,{Component} from "react";
import "./showImg.scss";
import "./hammer.min.js";
import "./hammer-pic.js";

class ShowImg extends Component{
    constructor(props){
        super(props)
        this.state = {
            pics:""
        }
    }
    render(){
        let pic = <div className="m-pic-cover">
                    <img className='m-pic-content m-pic' id="pic" src={this.state.pics} />
                </div>
        return(
            <div className="img-container">
                {pic}
            </div>
        )
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            pics:nextProps.pics
        })
        let tounchTime = new Date().getTime();
        document.getElementById("pic").addEventListener("click",function(){
           if(new Date().getTime() - tounchTime < 500){
                document.getElementsByClassName("img-container")[0].style.display = 'none';
           }else{
                tounchTime = new Date().getTime();
                console.log("click")
           }

        })
    }
}

export default ShowImg;