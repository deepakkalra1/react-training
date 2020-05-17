import React, { Component } from "react"
import classes from "./ErrorHandler.module.css";
import Backdrop from "../Backdrop/Backdrop"

let withErrorHandler =(WrapperComponent)=>{
    
    return (
        class extends Component{


            verifyErrorOccur = (error)=>{
                this.setState({errorOccured:true,errorMsg:error.message})
            }            
    
            state = {
                errorOccured:false,
                errorMsg:null
            }
         

        backdropClickForError = ()=>{
            this.setState(()=>{
                return {errorOccured:false}
            })
        }
    
    
        render(){
        
            return(
               
                   this.state.errorOccured
                   ? 
                   // console.log("here is datda",res)
                   // this.setState({ingredients:res.data})
                   // this.initialState.ingredients={...res.data}
                   // console.log({...actionType.setInitialIngredientsActionType(), value=res.data})
                   <React.Fragment>
                   <Backdrop backdropClick={this.backdropClickForError} />
                   <div className={classes.ErrorContainer +" alert alert-danger" }>
                       <img alt="*" style={{height:"17px",marginRight:"5px"}} src={require("../../assets/error.png")} />
                       {this.state.errorMsg}
               </div>
               </React.Fragment>
               : <WrapperComponent {...this.props} verifyErrorOccur={this.verifyErrorOccur} />
               
               
                
            )
        }
        }
    )
}

export default withErrorHandler;