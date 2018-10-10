import React,{Component} from "react";
import "./brochure.scss";
import BookDes from "../bookDes/bookDes";
import Payers from "../payers/payers";
import Operate from "../operate/operate";
import IntroSwiper from "../introSwiper/introSwiper";


import {getBook} from "../../server/api";
import {ERROR_OK} from "../../config/utils";

//单个典籍的入口介绍页；
class Brochure extends Component{
    constructor(props){
        super(props)
        this.state = {
            bookDes:{},
            payers:[],
            bookIntro:{}
        }
    }
    componentWillMount(){
        const params = this.props.match.params;
        getBook(params).then(res=>{
            if(res.data.code === ERROR_OK){
               const book = res.data.data;
               this.setState({
                   bookDes:{
                       id:book.id,
                       title:book.title,
                       logo:book.logo,
                       author:book.author,
                       description:book.description
                   },
                   payers:book.payers,
                   bookIntro:{
                       chapters:book.chapters,
                       introUrl:book.introUrl
                   }
               })
            }
        })
    }
    render(){
        let bookIntro=null;
        if(this.state.bookIntro.chapters !== undefined){
            bookIntro = <IntroSwiper bookIntro={this.state.bookIntro}></IntroSwiper>
        }
        return(
            <div className="brochure-container">
                <div>
                    <BookDes bookDes={this.state.bookDes}></BookDes>
                    <Payers payers={this.state.payers}></Payers>
                    <Operate></Operate>
                    {bookIntro}
                </div>
            </div>
        )
    }
}
export default Brochure;