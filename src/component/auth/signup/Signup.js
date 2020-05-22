import React,{useState,useEffect} from "react"
import Button from "../../Button/Button"
import classes from "./Signup.module.css"
import axios from "axios"
import Alert from "../../alert/Alert"
import Spinner from "../../spinner/Spinner"
import Backdrop from "../../Backdrop/Backdrop"
import {connect} from "react-redux"
import {Redirect }from "react-router-dom"

let actions=require("../../../actions/actions")
let baseURL="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUoUm0_0A4VriY2PL7PlGLCq9ehISKYqE"

const Signup=(props)=> {
    const [state,setState] = useState({
        error:false,
        errorMsg:"",
        registerProcess:0,
        formElements:{
            
            
            email:{
                eleType:"input",
                id:"email",
                placeholder:"Enter your Email",
                type:"email",
                validation:{
                    required:true
                },
                value:"",
                valid:true,
                ref:React.createRef()
            },
            password:{
                eleType:"input",
                id:"password",
                placeholder:"Enter your password",
                type:"password",
                validation:{
                    required:true
                },
                value:"",
                valid:true,
                ref:React.createRef()
            },
            confirmPassword:{
                eleType:"input",
                id:"confirmPassword",
                placeholder:"Re-Enter your password",
                type:"password",
                validation:{
                    required:true
                },
                value:"",
                valid:true,
                ref:React.createRef()
            }
        }
    })




    //--------------------------------------------->
    const provideElements=(eleObj)=>{

        switch(eleObj.eleType){
            case "input":
                return(
                    <input 
                    ref={eleObj.ref}
                    style={{marginTop:"15px"}}
                    onChange={(e)=> valueChangeHandler(e,eleObj.id)}
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
    const valueChangeHandler =(e,id)=>{


        let value=e.target.value
        setState(prevState=>{
            let ps = {...prevState}
            ps.formElements[id].value=value;
            return ps;
        })

    } 


    //------------------------------------------------->
    const signupUser=(e)=>{
        e.preventDefault()
        if(state.formElements.password.value.length<8){
            state.formElements.password.ref.current.style.background="salmon"
            state.formElements.confirmPassword.ref.current.style.background="almon"
            setState((prevState)=> {
                return {...prevState, error:true,errorMsg:"Password must have 8 Characters !"}
            })
            
        return 0;
        
    }else{
        if(state.formElements.password.value!==state.formElements.confirmPassword.value){
            state.formElements.password.ref.current.style.background="salmon"
            state.formElements.confirmPassword.ref.current.style.background="salmon"
            setState(prevState=>{ return{...prevState, error:true,errorMsg:"Password did not match !"}})
            return 0;
        }
        
    }
        setState(prevState=>{ return{...prevState, registerProcess:1}});
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
            
            setState(prevState=>{ return{...prevState, registerProcess:2}})
        })
          
        .catch((error)=>{
        
            setState(prevState=>{return {...prevState, registerProcess:-1,errorMsg:error.response.data.error.message}})
            
        })

        

        }
        

    


    useEffect(()=>{
        if(state.error===true){
            setTimeout(()=>{
                state.formElements.password.ref.current.style.background="white"
                state.formElements.confirmPassword.ref.current.style.background="white"
                setState(prevState=>{ return{...prevState, error:false,errorMsg:""}})
            },2000) 
        }
        if(state.registerProcess===2){
            setTimeout(()=>{
                props.toggleAuthPage()
        },3000)

        }
        if(state.registerProcess===-1){
            setTimeout(()=>{
                setState(prevState=>{ return{...prevState, registerProcess:0}})
        },3000)
        }


    },[state.error,state.registerProcess])
    


        return(
            <div>
                
                {
                    state.error? <Alert type="danger" imgName="error.png" msg={state.errorMsg} /> : null
                }



                {
                    state.registerProcess==1?<React.Fragment><Backdrop /><Spinner style={{position:"fixed","top":"0px",bottom:"0px",left:"0px",right:"0px",margin:"auto",zIndex:"186"}} />  </React.Fragment>   : 
                        state.registerProcess==2?
                    <Alert type="success" imgName="successGreen.png" msg="Successfuly Registered and Logged In" /> : 
                    state.registerProcess==-1?
                    <Alert type="danger" imgName="error.png" msg={`${state.errorMsg} !!`} /> 
                    : null
                }
                
            <p style={{color:"black", fontSize:"30px"}}>Signup</p>
            <form onSubmit={signupUser}>
            {
                generateElements()
            }
             <Button disabledStatus={false} btnClassName="btn btn-success" btnName="Register" />
                </form>
                <div className={classes.SigninMsg}>Already Registered? <p style={{cursor:"pointer"}} onClick={props.toggleAuth} className="text-primary">Login here</p></div>
            </div>
        )
    }


const mapStateToProps = (state)=>{
    
    return{
        authenticated:state.authReducer.authenticated
        
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setUserAuthDetails:(authDetail)=> dispatch(actions.setUserAuthDetailsAction(authDetail))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( Signup);