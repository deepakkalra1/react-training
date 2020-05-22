import React from "react"
import classes from "./Spinner.module.css";

const Spinner  = (props)=>{
    
    return(
        <div style={props.style ? props.style :null } className={classes.Ldsfacebook}><div></div><div></div><div></div></div>
    )
}
export default Spinner;