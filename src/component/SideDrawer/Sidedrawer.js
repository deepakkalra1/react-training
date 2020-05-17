import React from "react"
import classes from "./Sidedrawer.module.css"
import Logo from "../Logo/Logo"
import Navigation from "../NavigationToolbar/NavigationToolbar"
import {connect} from "react-redux"

const actions=require("../../actions/actions")

class Sidedrawer extends React.Component{
    static getDerivedStateFromProps(){
        return{}
    }
    render(){
        console.log(this.props.myStyle)
        return(
            <div className={classes.SidedrawerContainer }   >
                
                <div className={classes.SidedrawerContent}>
                <Logo />
                <p className={classes.Heading}>Burger'O'Builder</p>
        {this.props.authenticated?<p style={{background:"#181818",color:"white",fontWeight:"bold",padding:"5px"}}>Hi, {this.props.username}</p>:null }
                <Navigation mobileView={this.props.mobileView} closeMenu={this.props.closeMenu} toggleAuthPage={this.props.toggleAuthPage} />
            </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        authenticated:state.authReducer.authenticated,
        username:state.authReducer.username
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Sidedrawer);