import React , {Component} from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo"
import NavigationToolbar from "../../NavigationToolbar/NavigationToolbar"


class Toolbar extends Component{

    render(){
        return(
            <div className={classes.ToolbarContainer + " text-monospace"}>
                
                 
                <div onClick={this.props.openMenu} className={classes.Hamburger}>
                    <div className={classes.HamburgerLine}></div>
                    <div className={classes.HamburgerLine}></div>
                    <div className={classes.HamburgerLine}></div>
                </div>
                
                <div className={classes.LogoDiv}>
                <p className={classes.Heading}>Burger'O'Builder</p>
                    <div className={classes.LogoTag}><Logo  /></div>
                </div>
                
                <div className={classes.Navigation}>
                    <NavigationToolbar />
                </div>
            </div>
        )
    }

}

export default Toolbar;