import React,{Component} from "react"
import "./saledBooks.scss"

class SaledBooks extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const listItem = this.props.bookList.map((book,index)=>
            <li
                className="book-item"
                key={index}
            >
                <img src={book.logo} />
                <div className="book-des">
                    <h3>{book.title}</h3>
                    <span
                        className="total-calc"
                    >{parseInt(book.chapters.length)}小节 . {parseInt(book.payers.length)}人已赞助</span>
                </div>
            </li>
        );
        return(
            <ul>{listItem}</ul>
        )
    }
}

export default SaledBooks;