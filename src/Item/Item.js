import React,{Component} from "react";
import ReactDOM from "react-dom";
import "./Item.css"


class Item extends Component{
    
    removeComponent=()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById(`item_${this.props.countNo}`));
        document.getElementById(`item_${this.props.countNo}`).remove();
    }

    render(){
    return(
        <div className="item">
            <span className="sp1">
                    {this.props.name}
            </span>
            <span className="sp2">
                    {this.props.quantity}
            </span>
            <span>
                <button className="btn btn-danger" type="button" onClick={this.removeComponent}>Remove</button>
            </span>
        </div>
    )
    }
}

export default Item;