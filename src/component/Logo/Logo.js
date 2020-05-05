import React from "react";
import LogoSrc from "../../assets/burgerIcon.png";
import classes from "./Logo.module.css";

class Logo extends React.Component{

    render(){
        return(
            <img className={classes.Logo} src={LogoSrc} />
        
        )
    }

}

export default Logo;