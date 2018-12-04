import React, { Component } from 'react';
import './loading.scss'

class Loading extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='loading-container'>
                <span></span>
                <span>{this.props.loadMsg}</span>
            </div>
        )
    }
}

export default Loading