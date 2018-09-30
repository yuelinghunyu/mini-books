import React,{Component} from 'react';
import "./blogFrom.scss";

class BlogFrom extends Component{
    constructor(props){
        super(props);
        this.state = {
            blogFromList:[
                {id:"1",title:"webview 布局适配实践",href:"https://juejin.im/post/5b92a0eaf265da0ad13b5cac",createTime:"2018-9-20",times:236},
                {id:"2",title:"前后端实现登录token拦截校验",href:"https://juejin.im/post/5b8c87f56fb9a01a1c572e2a",createTime:"2018-9-26",times:112},
                {id:"1",title:"webview 布局适配实践",href:"https://juejin.im/post/5b92a0eaf265da0ad13b5cac",createTime:"2018-9-20",times:236},
                {id:"2",title:"前后端实现登录token拦截校验",href:"https://juejin.im/post/5b8c87f56fb9a01a1c572e2a",createTime:"2018-9-26",times:112},
                {id:"1",title:"webview 布局适配实践",href:"https://juejin.im/post/5b92a0eaf265da0ad13b5cac",createTime:"2018-9-20",times:236},
                {id:"2",title:"前后端实现登录token拦截校验",href:"https://juejin.im/post/5b8c87f56fb9a01a1c572e2a",createTime:"2018-9-26",times:112},
                {id:"1",title:"webview 布局适配实践",href:"https://juejin.im/post/5b92a0eaf265da0ad13b5cac",createTime:"2018-9-20",times:236},
                {id:"2",title:"前后端实现登录token拦截校验",href:"https://juejin.im/post/5b8c87f56fb9a01a1c572e2a",createTime:"2018-9-26",times:112},
                {id:"1",title:"webview 布局适配实践",href:"https://juejin.im/post/5b92a0eaf265da0ad13b5cac",createTime:"2018-9-20",times:236},
                {id:"2",title:"前后端实现登录token拦截校验",href:"https://juejin.im/post/5b8c87f56fb9a01a1c572e2a",createTime:"2018-9-26",times:112},
                {id:"1",title:"webview 布局适配实践",href:"https://juejin.im/post/5b92a0eaf265da0ad13b5cac",createTime:"2018-9-20",times:236},
                {id:"2",title:"前后端实现登录token拦截校验",href:"https://juejin.im/post/5b8c87f56fb9a01a1c572e2a",createTime:"2018-9-26",times:112}
            ]
        }
    }
    render(){
        let liList = this.state.blogFromList.map((blog,index)=>
            <li className="li-blog-item" key={index}>
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