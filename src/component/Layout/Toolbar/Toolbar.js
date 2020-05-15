import React , {Component} from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo"
import NavigationToolbar from "../../NavigationToolbar/NavigationToolbar"
import {connect} from "react-redux"

const actions = require("../../../actions/actions")


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
                    
                    <NavigationToolbar auth={this.props.auth} toggleAuthPage={this.props.toggleAuthPage} />
                
                </div>
            </div>
        )
    }

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


export default connect(mapStateToProps,mapDispatchToProps)(Toolbar)

