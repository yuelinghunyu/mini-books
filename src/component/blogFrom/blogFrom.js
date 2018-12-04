import React,{Component} from 'react';
import IscrollLuo from 'iscroll-luo';
import PropTypes from "prop-types";
import "./blogFrom.scss";
import "./refresh.scss";

class BlogFrom extends Component{

    constructor(props){
        super(props);
    }
    redirectBlog(href){
        window.location.href = href;
    }
    onDown() {
        this.props.handleRefresh()
    }
    
    onUp() {
      
    }
    render(){
        let liList = this.props.blogList.map((blog,index)=>
            <li className="li-blog-item" key={index} onClick={this.redirectBlog.bind(this,blog.href)}>
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
            <IscrollLuo
                onPullDownRefresh={() => this.onDown()}
                onPullUpLoadMore={() => this.onUp()}
            >
                <ul className="li-blog-container">
                    {liList}
                </ul>
            </IscrollLuo>
        )
    }
    componentDidMount(){
     
    }
   
}
export default BlogFrom;