import React,{Component} from "react"
import Button from "../Button/Button"
import Signin from "./signin/Signin"
import Signup from "./signup/Signup"
import classes from "./Auth.module.css"
import Backdrop from "../Backdrop/Backdrop"


class Auth extends Component{

    state={
        authToggle:true
        
    }

    toggleAuth=()=>{
        
        this.setState((prevState)=>{
            return{authToggle:!prevState.authToggle}
        })
    }

    render(){
        
    
        return(
            

            <div className={classes.AuthContainer + " text-monospace"}> 
            
                {
                    this.state.authToggle ? <Signin toggleAuthPage={this.props.toggleAuthPage} toggleAuth={this.toggleAuth} /> : <Signup toggleAuthPage={this.props.toggleAuthPage} toggleAuth={this.toggleAuth} />
                }  
                

            </div>
        )
    }
}

export default Auth;