import React,{Component} from 'react';
import './book.scss';
import PropTypes from "prop-types";

class Book extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired
    }
    constructor(){
        super()
        this.state = {
            bookList:[
                {
                    id:"1",
                    logo:"static/img/a.jpg",
                    title:"微信公众号前端实践",
                    author:"月翎魂雨",
                    chapter:"14",
                    saleTotal:120,
                    price:"9.9"
                },
                {
                    id:"2",
                    logo:"static/img/b.jpg",
                    title:"小程序实战",
                    author:"月翎魂雨",
                    chapter:"10",
                    saleTotal:90,
                    price:"9.9"
                },
                {
                    id:"3",
                    logo:"static/img/c.jpg",
                    title:"angular搭建管理后台",
                    author:"月翎魂雨",
                    chapter:"20",
                    saleTotal:77,
                    price:"9.9"
                },
                {
                    id:"4",
                    logo:"static/img/d.jpg",
                    title:"vue实现音乐播放器",
                    author:"月翎魂雨",
                    chapter:"21",
                    saleTotal:120,
                    price:"9.9"
                },
                {
                    id:"5",
                    logo:"static/img/e.jpg",
                    title:"react搭建视频播放器",
                    author:"月翎魂雨",
                    chapter:"65",
                    saleTotal:120,
                    price:"9.9"
                },
                {
                    id:"6",
                    logo:"static/img/f.jpg",
                    title:"webpack 搭建自己的脚手架",
                    author:"月翎魂雨",
                    chapter:"111",
                    saleTotal:120,
                    price:"9.9"
                },
            ]
        }

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
            const path = "/brochure/"+id;
            this.context.router.history.push(path);
        }else{//直接微信支付
            console.log("支付");
        }
    }
    render(){
        const listItem = this.state.bookList.map((book,index)=>
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
                    >{parseInt(book.chapter)}小节 . {parseInt(book.saleTotal)}人已赞助</span>
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