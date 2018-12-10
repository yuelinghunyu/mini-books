import React,{Component} from "react";
import "./bookDes.scss";

import { getUser } from "../../server/api";

// 此组件是介绍典籍;
class BookDes extends Component{
    constructor(props){
        super(props)
        this.state={
            user:{}
        }
    }
    componentWillMount(){
        this.setState({
            user:getUser() 
        })
    }
    render(){
        const book = this.props.bookDes;
        return(
            <div className="bookDes-container">
                <img className="des-logo" src={book.logo} alt="logo"/>
                <div className="des-book-description">
                    <h3>{book.title}</h3>
                    <span className="book-desciption-content">
                        {book.description}
                    </span>
                    <div className="des-user-container">
                        <img className="des-user-logo" src={book.logo} alt="logo"/>
                        <span>{book.author}</span>
                    </div>    
                </div>
            </div>
        )
    }
}

export default BookDes;