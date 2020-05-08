import React from "react"
import "./Alert.css"

const Alert = (props)=>{
    return(
        <div style={{width:"80%",margin:"auto"}} className={`alert alert-${props.type} customAlert`} >{props.msg} </div>
    )
}

export default Alert;