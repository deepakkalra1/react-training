import React,{useState,useEffect} from "react"
import Button from "../../Button/Button"
import classes from "./Signin.module.css"
import axios from "axios"
import Spinner from "../../spinner/Spinner"
import Backdrop from "../../Backdrop/Backdrop"
import {connect} from "react-redux"
import Alert from "../../alert/Alert"

let actions=require("../../../actions/actions")


const Signin =(props)=>{

    const [state,setState] = useState({
        error:false,
        errorMsg:"",
        signinProcess:false,
        formElements:{
            
            email:{
                id:"email",
                eleType:"input",
                placeholder:"Enter your Email",
                type:"email",
                validation:{
                    required:true
                },
                value:""
            },
            password:{
                id:"password",
                eleType:"input",
                placeholder:"Enter your password",
                type:"password",
                validation:{
                    required:true
                },
                value:""
            }
        }
    })



    //-------------------------------------------------->
    const valueChangeHandler =(e,id)=>{


        let value=e.target.value
        setState(prevState=>{
            let ps = {...prevState}
            ps.formElements[id].value=value;
            
            return ps;
        })

    } 



    //--------------------------------------------->
    const provideElements=(eleObj)=>{

        switch(eleObj.eleType){
            case "input":
                return(
                    <input 
                    onChange={(e)=> valueChangeHandler(e,eleObj.id)}
                    style={{marginTop:"15px"}}
                    className="form-control"
                    type={eleObj.type}
                     placeholder={eleObj.placeholder}
                     required={eleObj.validation.required}
                     />
                )

                 default:
                    return null;
        }

    }

    //---------------------------------------------->
    const generateElements=()=>{
    
        let formEleArr=[]
        formEleArr=Object.keys(state.formElements).map((eleName)=>{
            return provideElements(state.formElements[eleName])
        })
        
        return formEleArr
    }




//-------------------------------------------------->
    const signin=(e)=>{
        
        e.preventDefault()
        setState((prevState)=> { 
            
            return {...prevState, signinProcess:true}})
        let baseURL="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUoUm0_0A4VriY2PL7PlGLCq9ehISKYqE"
        let userDetail = {
            email:state.formElements.email.value,
            password:state.formElements.password.value,
            returnSecureToken:true

            }
        axios.post(baseURL,userDetail)
        .then(res=>{
            const authDetail = {
                authToken:res.data.idToken,
    refreshToken:res.data.refreshToken,
    username:res.data.email,
    userId:res.data.localId
            }

            localStorage.setItem("authDetail", JSON.stringify(authDetail))
            
            props.setUserAuthDetails(authDetail)
            props.toggleAuthPage()
            
    
        })

        .catch(error=>{
            let errorMsg="error"
            errorMsg=error.response.data.error.message
            setState((ps)=>{
                    return{...ps, error:true,errorMsg:errorMsg}
            })
            
        })
    }


    useEffect(()=>{
        if(state.error===true){
            
            setTimeout(()=>{
                setState((ps)=>{
                    return {...ps, error:false,errorMsg:"",signinProcess:false}
                } )
            },3000)

        }
    },[state.error])
        return(
            <div className={classes.SigninContainer}>
                {
                    state.error? <Alert type="danger" imgName="error.png" msg={state.errorMsg} /> : null
                }
                {
                    state.signinProcess?<React.Fragment><Backdrop /><Spinner style={{position:"fixed","top":"0px",bottom:"0px",left:"0px",right:"0px",margin:"auto",zIndex:"186"}} />  </React.Fragment>   : 
                    null
                }
                <p style={{color:"black",fontSize:"30px"}}>Login</p>
                <form className="form-group" onSubmit={signin}>
                    {
                        generateElements()
                    }
                    <Button disabledStatus={false} btnClassName="btn btn-success" btnName="submit" />
                </form>

                <div className={classes.SignupMsg}>Dont have an account? <p style={{cursor:"pointer"}} onClick={props.toggleAuth} className="text-primary">Signup here</p></div>
                             
            </div>
        )
    
}




const mapStateToProps = (state)=>{
    
    return{
        
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setUserAuthDetails:(authDetail)=> dispatch(actions.setUserAuthDetailsAction(authDetail))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signin)

