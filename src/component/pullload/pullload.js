import ReactPullLoad,{STATS} from 'react-pullload';
import './pullload.scss';
import React,{Component} from 'react';
import Book from "../book/book";

const loadMoreLimitNum = 2;

class PullLoad extends Component{
    constructor(){
        super();
        this.state = {
            hasMore: true,
            data:[],
            action:STATS.init,
            index:loadMoreLimitNum
        }
        this.handleAction = this.handleAction.bind(this);
        this.handRefreshing = this.handRefreshing.bind(this);
    }

    handleAction(action){
        if(action === this.state.action||this.state.action === STATS.loading||action === STATS.loading){
            return false
        }
        if(action === STATS.refreshing){
            this.handRefreshing();
        }else{
            this.setState({
                action: action
            })
        }
    }

    handRefreshing(){
        if(STATS.refreshing === this.state.action){
            return false;
        }
        setTimeout(()=>{
            this.setState({
                data:[],
                hasMore:true,
                action:STATS.refreshed,
                index:loadMoreLimitNum
            });
        },3000)

        this.setState({
            action:STATS.refreshing
        })
    }
    render(){
        const {data,hasMore} = this.state
        return(
            <ReactPullLoad
                downEnough={150}
                action={this.state.action}
                handleAction={this.handleAction}
                hasMore={hasMore}
                className="block"
            >
                <Book></Book>
            </ReactPullLoad>
        )
    }
}

export default PullLoad;