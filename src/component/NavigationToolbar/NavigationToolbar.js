import React,{useEffect,useState,useContext } from "react"
import {NavLink,Redirect} from "react-router-dom"
import classes from "./NavigationToolbar.module.css";
import Backdrop from "../Backdrop/Backdrop"
import Auth from "../auth/Auth"
import {LayoutContext} from "../Layout/LayoutContext"
import {connect} from "react-redux"


const actions = require("../../actions/actions")


 const NavigationToolbar=(props)=> {

    const [state,setState] = useState({
        redirectToHome:false
    })

    const logoutRevised=()=>{
        if(LayoutContextConsumer.mobileView!==undefined){
            LayoutContextConsumer.closeMenu()
        }
        setState(prevState=> { return{...prevState, redirectToHome:true}})
        props.logout()
     
    }

    useEffect(()=>{
        if(state.redirectToHome===true){
            setTimeout(()=>{
                setState(prevState=>{return {...prevState, redirectToHome:false}})
                },2000)
            }
    },[state.redirectToHome])


    //------------------------------------------>
    const LayoutContextConsumer = useContext(LayoutContext);
    
        return(
            <div className={classes.NavOfToolbarContainer}>
                {
                    !state.redirectToHome?null : <Redirect to="/" />
                }
                
                   <p > <NavLink activeClassName={classes.NavlinksActive} onClick={LayoutContextConsumer.mobileView!==undefined?()=>LayoutContextConsumer.closeMenu():null} className={classes.Navlinks}   exact to="/">Build Burger</NavLink></p>
                  

                  {
                      
                      props.authenticated? <p>    <NavLink activeClassName={classes.NavlinksActive} onClick={LayoutContextConsumer.mobileView!==undefined?()=>LayoutContextConsumer.closeMenu():null} className={classes.Navlinks}   exact to="/my-orders">My Orders</NavLink></p>
                  :null
                  }
                  {
                      props.authenticated? <p className={classes.LoginLink +" bg bg-danger"} onClick={ logoutRevised}>Logout</p>
                      :
                      <p className={classes.LoginLink +" bg bg-success"} onClick={ props.toggleAuthPage}>Login</p>
                  }
        {
            LayoutContextConsumer.auth? 
                <React.Fragment>
                    <Backdrop backdropClick={props.toggleAuthPage} /> 
                         <Auth toggleAuthPage={props.toggleAuthPage} />
                </React.Fragment>
            : null
        }
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
     setUserAuthDetails:(authDetail)=> dispatch(actions.setUserAuthDetailsAction(authDetail)),
     logout:()=> dispatch(actions.logoutUserAction())
   
}
}


export default connect(mapStateToProps,mapDispatchToProps)(NavigationToolbar)
