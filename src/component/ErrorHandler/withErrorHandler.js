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
                   <React.Fragment>
                   <Backdrop backdropClick={this.backdropClickForError} />
                   <div className={classes.ErrorContainer}>
                       {this.state.errorMsg}
               </div>
               </React.Fragment>
               : <WrapperComponent verifyErrorOccur={this.verifyErrorOccur} />
               
               
                
            )
        }
        }
    )
}

export default withErrorHandler;