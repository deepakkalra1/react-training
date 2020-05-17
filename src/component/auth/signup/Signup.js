import React from "react"
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

class Signup extends React.Component{

    state={
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
    }



    //--------------------------------------------->
    provideElements=(eleObj)=>{

        switch(eleObj.eleType){
            case "input":
                return(
                    <input 
                    ref={eleObj.ref}
                    style={{marginTop:"15px"}}
                    onChange={(e)=> this.valueChangeHandler(e,eleObj.id)}
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
    generateElements=()=>{
    
        let formEleArr=[]
        formEleArr=Object.keys(this.state.formElements).map((eleName)=>{
            return this.provideElements(this.state.formElements[eleName])
        })
        
        return formEleArr
    }


    //-------------------------------------------------->
    valueChangeHandler =(e,id)=>{


        let value=e.target.value
        this.setState(prevState=>{
            let ps = {...prevState}
            ps.formElements[id].value=value;
            
            return ps;
        })

    } 


    //------------------------------------------------->
    signupUser=(e)=>{
        e.preventDefault()
        if(this.state.formElements.password.value.length<8){
            this.state.formElements.password.ref.current.style.background="salmon"
            this.state.formElements.confirmPassword.ref.current.style.background="almon"
            this.setState({error:true,errorMsg:"Password must have 8 Characters !"})
            setTimeout(()=>{
                this.state.formElements.password.ref.current.style.background="white"
                this.state.formElements.confirmPassword.ref.current.style.background="white"
                this.setState({error:false,errorMsg:""})
            },2000)
            

        return 0;
        
    }else{
        if(this.state.formElements.password.value!==this.state.formElements.confirmPassword.value){
            this.state.formElements.password.ref.current.style.background="salmon"
            this.state.formElements.confirmPassword.ref.current.style.background="salmon"
            this.setState({error:true,errorMsg:"Password did not match !"})
            setTimeout(()=>{
                this.state.formElements.password.ref.current.style.background="white"
                this.state.formElements.confirmPassword.ref.current.style.background="white"
                this.setState({error:false,errorMsg:""})
            },2000)
            return 0;
        }
        
    }
        this.setState({registerProcess:1});
        let userDetail = {
            email:this.state.formElements.email.value,
            password:this.state.formElements.password.value,
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

    this.props.setUserAuthDetails(authDetail)
            
            this.setState({registerProcess:2})
            
            setTimeout(()=>{
                this.props.toggleAuthPage()
        },3000)
        })
        .catch((error)=>{
        
            this.setState({registerProcess:-1,errorMsg:error.response.data.error.message})
            setTimeout(()=>{
                    this.setState({registerProcess:0})
            },3000)
        })

        

        }

   
    


    render(){
        return(
            <div>
                
                {
                    this.state.error? <Alert type="danger" imgName="error.png" msg={this.state.errorMsg} /> : null
                }



                {
                    this.state.registerProcess==1?<React.Fragment><Backdrop /><Spinner style={{position:"fixed","top":"0px",bottom:"0px",left:"0px",right:"0px",margin:"auto",zIndex:"186"}} />  </React.Fragment>   : 
                        this.state.registerProcess==2?
                    <Alert type="success" imgName="successGreen.png" msg="Successfuly Registered and Logged In" /> : 
                    this.state.registerProcess==-1?
                    <Alert type="danger" imgName="error.png" msg={`${this.state.errorMsg} !!`} /> 
                    : null
                }
                
            <p style={{color:"black", fontSize:"30px"}}>Signup</p>
            <form onSubmit={this.signupUser}>
            {
                this.generateElements()
            }
             <Button disabledStatus={false} btnClassName="btn btn-success" btnName="Register" />
                </form>
                <div className={classes.SigninMsg}>Already Registered? <p style={{cursor:"pointer"}} onClick={this.props.toggleAuth} className="text-primary">Login here</p></div>
            </div>
        )
    }
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