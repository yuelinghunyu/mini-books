import React,{Component} from 'react';
import './book.scss';
import PropTypes from "prop-types";
import emitter from "../../config/events";

class Book extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired
    }
    constructor(props){
        super(props)
        this.redirectBrochure = this.redirectBrochure.bind(this);
    }
    redirectBrochure(ev,bookId){
        ev.preventDefault();
        ev.stopPropagation();
        const id = ev.target.getAttribute("id");
        const flag = ev.target.getAttribute("flag");
        if(id !== null && flag === null){//跳转页面
            console.log("跳转");
            const path = "/brochure/"+id+"/"+"nopay";
            this.context.router.history.push(path);
        }else{//直接微信支付
            const price = parseFloat(ev.target.textContent.replace("￥",""))
            console.log(price);
            console.log("支付");
            const param = {bookId:bookId,price:price}
            emitter.emit("payPrice",param)
        }
    }
    render(){
        const listItem = this.props.bookList.map((book,index)=>
            <li
                className="book-item"
                key={index}
                id={book.id}
                onClick={(ev)=>{this.redirectBrochure(ev,book.id)}}
            >
                <img src={book.logo} id={book.id}/>
                <div className="book-des" id={book.id}>
                    <h3 id={book.id}>{book.title}</h3>
                    <span className="book-author" id={book.id}>{book.author}</span>
                    <span
                        className="total-calc"
                        id={book.id}
                    >{parseInt(book.chaptersList.length)}小节 . {parseInt(book.payersList.length)}人已赞助</span>
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