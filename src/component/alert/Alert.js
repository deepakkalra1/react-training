import React from "react"
import "./Alert.css"

const Alert = (props)=>{
    return(
        <div style={{width:"80%",margin:"auto"}} className={`customAlert alert alert-${props.type}`}><img alt="icon" className="alerticon" src={require(`../../assets/${props.imgName}`)} /> {props.msg} </div>
    )
}

export default Alert;