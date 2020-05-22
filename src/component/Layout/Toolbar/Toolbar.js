import React , {useContext} from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo"
import NavigationToolbar from "../../NavigationToolbar/NavigationToolbar"
import {connect} from "react-redux"
import {LayoutContext} from "../LayoutContext"

// const actions = require("../../../actions/actions")


const Toolbar= (props)=> {

    const LayoutContextConsumer = useContext(LayoutContext);

        return(
            <div className={classes.ToolbarContainer + " text-monospace"}>
                <div onClick={LayoutContextConsumer.openMenu} className={classes.Hamburger}>
                    <div className={classes.HamburgerLine}></div>
                    <div className={classes.HamburgerLine}></div>
                    <div className={classes.HamburgerLine}></div>
                </div>
                
                <div className={classes.LogoDiv}>
                <div className={classes.LogoTag}><Logo  /></div>
                <p className={classes.Heading}>Burger'O'Builder</p>
                    
                </div>
                
                <div className={classes.Navigation}>
                    
                    <NavigationToolbar  toggleAuthPage={props.toggleAuthPage} />
                
                </div>
            </div>
        )
    }






const mapStateToProps = (state)=>{
    
    return{
        authenticated:state.authReducer.authenticated,
        username:state.authReducer.username
}
}

const mapDispatchToProps = (dispatch)=>{
    return{   
}
}


export default connect(mapStateToProps,mapDispatchToProps)( Toolbar)

