import React from "react";
import LogoSrc from "../../assets/burgerIcon.png";
import classes from "./Logo.module.css";

const Logo=()=> {
        return(
            <img alt="logo" className={classes.Logo} src={LogoSrc} />
        )
    }

export default Logo;