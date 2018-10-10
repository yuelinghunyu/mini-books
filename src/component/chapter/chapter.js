import React,{Component} from 'react';
import ReactSwipe from 'react-swipe'
import PropTypes from "prop-types";
import "./chapter.scss";
import {getIntroMd} from "../../server/api";

class Chapter extends Component{
    static contextTypes = {
        router:PropTypes.object.isRequired
    }
    constructor(){
        super()
        this.state = {
            bookChapterList:[
                {id:"1",content:"活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！活着，就要善待自己。别跑到别人的生命里当插曲。不管是友情还是爱情，来了，就热情相拥。走了，就坦然放手！"},
                {id:"2",content:"和煦的暖风，把扰心的烦恼驱散；灿烂的阳光，把惬意的笑容奉献；嫩绿的青草，把青春的梦想点燃；悦耳的铃声，把真心的祝福送到：愿你生机盎然！"},
                {id:"3",content:"对于大多数人，生活有两种选择，要么走艰辛一点的上坡路，迎着风和各种压力；要么就走轻松容易一点的下坡路，过索然无味的一生。 ​​​​"},
                {id:"4",content:"唯有你愿意去相信，才能得到你想相信的。对的人终究会遇上，美好的人终究会遇到，只要让自己足够美好。努力让自己独立坚强，这样才能有底气告诉我爱的人，我爱他。"},
                {id:"5",content:"希望当爱情褪去激情的外表，回归平淡的真身，我们还能握着彼此的手，一直走下去，白头到老。"},
                {id:"6",content:"生活，其实并没有拖欠我们任何东西，所以我们没有必要总是板着脸给它看。我们应该感谢它，至少，它给了我们生存的空间。一路走来，经历过风和雨的洗礼，使我们成长的更加健壮⋯⋯"},
                {id:"7",content:"时刻保持一颗童心。童心之所以纯真，就因为简单，而简单是快乐之源，想让自己远离忧伤，就让自己不时保有一颗童心。不要太多的压抑，不要太多的思考，简单就好。"}
            ]
        }
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.backIntro = this.backIntro.bind(this);
    }
    next(ev) {
        this.reactSwipe.next();
    }
    
    prev(ev) {
        this.reactSwipe.prev();
    }
    backIntro(ev){
        ev.preventDefault();
        const id = this.context.router.route.match.params.id;
        const path = "/brochure/"+id;
        this.context.router.history.push(path);
    }
    render(){
        let option = {
            speed: 400,
            continuous: false,
            disableScroll: true,
            transitionEnd: ((index, elem)=>{
              
            }),
        };
        let divList = this.state.bookChapterList.map((book,index)=>
            <div className="chapter-scroll-container" key={index}>
                <div className="chapter-markdown">
                    
                </div>
            </div>
        )
        return(
            <div className="chapter-container">
               
                <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className="chapter-content-container" swipeOptions={option}>
                    {divList}
                </ReactSwipe>
              
                <div className="chapter-content-footer">
                    <i className="icon iconfont icon-left" onClick={this.prev}></i>
                    <i className="icon iconfont icon-menu" onClick={this.backIntro}></i>
                    <i className="icon iconfont icon-right" onClick={this.next}></i>
                </div>
            </div>
        )
    }
    componentWillMount(){
        const url = this.context.router.route.match.params.url;
        const params = {
            url:decodeURIComponent(url)
        }
        getIntroMd(params).then((res)=>{
            let showdown  = require('showdown');
            let converter = new showdown.Converter();
            document.getElementsByClassName("chapter-markdown")[0].innerHTML = converter.makeHtml( res.data);
        })
    }
    componentDidMount(){
        const totalH = document.getElementsByClassName("chapter-container")[0].clientHeight;
        const contentH = document.getElementsByClassName("chapter-content-footer")[0].clientHeight;
        const carouselH = totalH-contentH;
        document.getElementsByClassName("chapter-scroll-container")[0].style.height = (carouselH/75).toFixed(3)+"rem";
     }
}

export default Chapter;