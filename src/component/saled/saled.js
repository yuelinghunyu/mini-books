import React,{Component} from 'react';
import './saled.scss';
import SaledBooks from "../saledBooks/saledBooks"

class Saled extends Component{
    render(){
        return(
            <div className="saled-container">
                <SaledBooks></SaledBooks>
            </div>
        )
    }
}
export default Saled;