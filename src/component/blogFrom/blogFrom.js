import React,{Component} from 'react';
import {setBlogBrowers} from "../../server/api";
import {ERROR_OK,formatDate} from "../../config/utils";
import "./blogFrom.scss";

class BlogFrom extends Component{

    constructor(props){
        super(props);
    }
    redirectBlog(title,bookType,href){
        //添加浏览次数;
        const param = {
            title:title,
            blogType:bookType,
            href:href,
            times:1
        }
        setBlogBrowers(param).then(res=>{
            if(res.data.code === ERROR_OK){
                console.log("浏览")
            }
        })
        window.location.href = href;
    }
    formatDate(time){
        console.log(time)
        const date = Date.parse(new Date(time)) || Date.parse(new Date(String(time).replace(/\-/g, "/")))
        return formatDate(date,'Y-M-D hh:mm:ss')
    }
    render(){
        let liList = this.props.blogList.map((blog,index)=>
            <li className="li-blog-item" key={index} onClick={this.redirectBlog.bind(this,blog.title,blog.blogType,blog.href)}>
                <p>{blog.title}</p>
                <div className="blog-status">
                    <p>
                        <i className="icon iconfont icon-chakan"></i>
                        <span>{blog.times} 次</span>
                    </p>
                    <p>
                        <i className="icon iconfont icon-chuangjianshijian"></i>
                        <span>{blog.createTime}</span>
                    </p>
                </div>
            </li>
        )
        return(
            <ul className="li-blog-container">
                {liList}
            </ul>
           
        )
    }
}
export default BlogFrom;