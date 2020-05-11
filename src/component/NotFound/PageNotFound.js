import React from "react"
import classes from "./PageNotFound.module.css";

class PageNotFound extends React.Component{
    render(){
        return(
            <div className={classes.PageMessageContainer +" text-monospace"}>
                Page Not Found !!
            </div>
            )
    }
}

export default PageNotFound;