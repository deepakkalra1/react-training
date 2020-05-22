import React,{useReducer} from "react"
import Signin from "./signin/Signin"
import Signup from "./signup/Signup"
import classes from "./Auth.module.css"


const authLocalReducer = (prevState,action)=>{

    switch(action.type){
        case "toggleAuth":
            
            return {...prevState,authToggle:!prevState.authToggle}

        default:
            return {...prevState}
    }
}


const Auth=(props)=> {
    let [state,dispatch] = useReducer(authLocalReducer,{
        authToggle:true
        
    })
        return(
            <div className={classes.AuthContainer + " text-monospace"}> 
                {
                    state.authToggle ? <Signin toggleAuthPage={props.toggleAuthPage} toggleAuth={()=> dispatch({type:"toggleAuth"})} /> : <Signup toggleAuthPage={props.toggleAuthPage} toggleAuth={()=> dispatch({type:"toggleAuth"})} />
                }  
            </div>
        )
    }

export default Auth;