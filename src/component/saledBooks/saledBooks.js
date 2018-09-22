import React,{Component} from "react"
import "./saledBooks.scss"

class SaledBooks extends Component{
    constructor(){
        super()
        this.state = {
            bookList:[
                {
                    id:"1",
                    logo:"static/img/b.jpg",
                    title:"微信公众号前端实践",
                    author:"月翎魂雨",
                    chapter:"14",
                    saleTotal:120,
                    price:"9.9"
                },
                {
                    id:"2",
                    logo:"static/img/g.jpg",
                    title:"小程序实战",
                    author:"月翎魂雨",
                    chapter:"10",
                    saleTotal:90,
                    price:"9.9"
                }
            ]
        }
    }
    render(){
        const listItem = this.state.bookList.map((book,index)=>
            <li
                className="book-item"
                key={index}
            >
                <img src={book.logo} />
                <div className="book-des">
                    <h3>{book.title}</h3>
                    <span
                        className="total-calc"
                    >{parseInt(book.chapter)}小节 . {parseInt(book.saleTotal)}人已赞助</span>
                </div>
            </li>
        );
        return(
            <ul>{listItem}</ul>
        )
    }
}

export default SaledBooks;