import React,{Component} from 'react';
import './book.scss';
import PropTypes from "prop-types";

class Book extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired
    }
    constructor(props){
        super(props)
        this.redirectBrochure = this.redirectBrochure.bind(this);
    }
    redirectBrochure(ev){
        ev.preventDefault();
        ev.stopPropagation();
        const id = ev.target.getAttribute("id");
        const flag = ev.target.getAttribute("flag");
        console.log(ev.target);
        if(id !== null && flag === null){//跳转页面
            console.log("跳转");
            const path = "/brochure/"+id+"/"+"nopay";
            this.context.router.history.push(path);
        }else{//直接微信支付
            console.log("支付");
        }
    }
    render(){
        const listItem = this.props.bookList.map((book,index)=>
            <li
                className="book-item"
                key={index}
                id={book.id}
                onClick={this.redirectBrochure}
            >
                <img src={book.logo} id={book.id}/>
                <div className="book-des" id={book.id}>
                    <h3 id={book.id}>{book.title}</h3>
                    <span className="book-author" id={book.id}>{book.author}</span>
                    <span
                        className="total-calc"
                        id={book.id}
                    >{parseInt(book.chapters.length)}小节 . {parseInt(book.payers.length)}人已赞助</span>
                </div>
                <div className="book-price" id={book.id} flag="pay">￥{parseFloat(book.price)}</div>
            </li>
        );
        return(
           <div className="book-container">
                <ul>
                    {listItem}
                </ul>
           </div>
        )
    }
}
export default Book;