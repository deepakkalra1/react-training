import React , {Component} from "react";

class Button extends Component{

    render(){
        return(
        <button disabled={this.props.disabledStatus?this.props.disabledStatus : false } style={{width:"auto",margin:"auto",mariginTop:"10px",marginBottom:"10px"}} className={this.props.btnClassName} onClick={this.props.btnClick}>{this.props.btnName}</button>
        )
    }

}

export default Button;