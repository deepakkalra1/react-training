import React  from "react";

const Button=(props)=>{

        return(
        <button  disabled={props.disabledStatus?props.disabledStatus : false } style={{width:"auto",margin:"auto",marginTop:"10px",marginBottom:"10px"}} className={props.btnClassName} onClick={props.btnClick}>{props.btnName}</button>
        )
    }

export default Button;