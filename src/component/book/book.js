import React,{Component} from 'react';
import './book.scss';

class Book extends Component{
    constructor(){
        super()
        this.state = {
            bookList:[
                {
                    logo:"http://sinastorage.com/storage.zone.photo.sina.com.cn/zone/1000_0/20180913/e5471d21744bc7b4d813627757240b09_4000_2250.jpg?&ssig=RfWuBKTimi&KID=sina,slidenews&Expires=1536854853",
                    title:"微信公众号前端实践",
                    author:"月翎魂雨",
                    chapter:"14",
                    saleTotal:120,
                    price:"9.9"
                },
                {
                    logo:"http://sinastorage.com/storage.zone.photo.sina.com.cn/zone/1000_0/20180913/ea7d5c8dc4aa79466569db9354054217_1000_1500.jpg?&ssig=x8lrS4nxGQ&KID=sina,slidenews&Expires=1536856978",
                    title:"小程序实战",
                    author:"月翎魂雨",
                    chapter:"10",
                    saleTotal:90,
                    price:"9.9"
                },
                {
                    logo:"http://sinastorage.com/storage.zone.photo.sina.com.cn/zone/1000_0/20180913/aafd449a6ff24467c9d52c3aaa1c7596_1440_1080.jpg?&ssig=b63s6i2rw0&KID=sina,slidenews&Expires=1536852241",
                    title:"angular搭建管理后台",
                    author:"月翎魂雨",
                    chapter:"20",
                    saleTotal:77,
                    price:"9.9"
                },
                {
                    logo:"http://sinastorage.com/storage.zone.photo.sina.com.cn/zone/1000_0/20180913/494c1ca86317f12036cf639d2dc1dedd_1080_1440.jpg?&ssig=qHIiC7ikdi&KID=sina,slidenews&Expires=1536857026",
                    title:"vue实现音乐播放器",
                    author:"月翎魂雨",
                    chapter:"21",
                    saleTotal:120,
                    price:"9.9"
                },
                {
                    logo:"http://sinastorage.com/storage.zone.photo.sina.com.cn/zone/1000_0/20180913/f2000a5e57d832ceb0e0164822a546a3_4032_3024.jpeg?&ssig=JNO9aqmFN2&KID=sina,slidenews&Expires=1536857036",
                    title:"react搭建视频播放器",
                    author:"月翎魂雨",
                    chapter:"65",
                    saleTotal:120,
                    price:"9.9"
                },
                {
                    logo:"http://sinastorage.com/storage.zone.photo.sina.com.cn/zone/1000_0/20180913/426c266781f564026e3964d3157afee3_4386_2862.jpg?&ssig=T0P6kxHhJr&KID=sina,slidenews&Expires=1536857105",
                    title:"webpack 搭建自己的脚手架",
                    author:"月翎魂雨",
                    chapter:"111",
                    saleTotal:120,
                    price:"9.9"
                },
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
                    <span className="book-author">{book.author}</span>
                    <span
                        className="total-calc"
                    >{parseInt(book.chapter)}小节 . {parseInt(book.saleTotal)}人已赞助</span>
                </div>
                <div className="book-price">￥{parseFloat(book.price)}</div>
            </li>
        );
        return(
            <ul>
                {listItem}
            </ul>
        )
    }
}
export default Book;