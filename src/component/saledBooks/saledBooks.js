import React,{Component} from "react"
import "./saledBooks.scss"
import PropTypes from "prop-types";

class SaledBooks extends Component{
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
        const pay = "payed";
        const path = "/brochure/"+id+"/"+pay;
        this.context.router.history.push(path);
    }
    render(){
        const listItem = this.props.bookList.map((book,index)=>
            <li
                className="book-item"
                key={index}
                id={book.id}
                onClick={this.redirectBrochure}
            >
                <img src={book.logo}  id={book.id}/>
                <div className="book-des"  id={book.id}>
                    <h3  id={book.id}>{book.title}</h3>
                    <span
                        className="total-calc"
                        id={book.id}
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