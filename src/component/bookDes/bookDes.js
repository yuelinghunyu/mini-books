import React,{Component} from "react";
import "./bookDes.scss";

// 此组件是介绍典籍;
class BookDes extends Component{
    constructor(props){
        super(props)
        this.state = {
            book:{
                id:"1",
                logo:"static/img/a.jpg",
                title:"vue 音乐播放器",
                des:"整个项目采用vue-cli打造，数据源来源于qq音乐，音乐播放器有播放、音乐详情，音乐搜索、音乐人查询等一系列功能。",
                author:'月翎魂雨',
                userLogo:"static/img/user.jpg"
            }
        }
    }
    render(){
        const book = this.state.book;
        return(
            <div className="bookDes-container">
                <img className="des-logo" src={book.logo} alt="logo"/>
                <div className="des-book-description">
                    <h3>{book.title}</h3>
                    <span className="book-desciption-content">
                        {book.des}
                    </span>
                    <div className="des-user-container">
                        <img className="des-user-logo" src={book.userLogo} alt="logo"/>
                        <span>{book.author}</span>
                    </div>    
                </div>
            </div>
        )
    }
}

export default BookDes;