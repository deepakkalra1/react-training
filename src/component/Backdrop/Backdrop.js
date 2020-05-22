import React  from "react";
import classes from "./Backdrop.module.css";

const Backdrop=(props)=> {

        return(
            <div onClick={props.backdropClick} className={classes.BackdropContainer}>
            </div>
        )
    }

export default Backdrop;