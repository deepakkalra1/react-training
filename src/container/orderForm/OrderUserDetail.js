import React, { Component } from "react"
import classes from "./OrderUserDetail.module.css"

class UserDetail extends Component{
    state={
        formElements:{
            name:{
                    id:"name",
                    value:null,
                    elementType:"input",
                    type:"text",
                    placeholder:"Full Name",
                    validation:{
                                required:true
                                }
                
                },
                email:{
                    id:"email",
                    value:null,
                    elementType:"input",
                    type:"email",
                    placeholder:"E-mail",
                    validation:{
                                required:true
                                }
                
                },
                phoneNumber:{
                    id:"phoneNumber",
                    value:null,
                    elementType:"input",
                    type:"number",
                    placeholder:"Mobile Number without prefix",
                    validation:{
                                required:true,
                                size:10
                                }
                
                },
                street:{
                    id:"street",
                    value:null,
                    elementType:"input",
                    type:"text",
                    placeholder:"Street Address",
                    validation:{
                                required:true
                                }
                
                },
                city:{
                    id:"city",
                    value:null,
                    elementType:"input",
                    type:"text",
                    placeholder:"City",
                    validation:{
                                required:true
                                }
                
                },
                state:{
                    id:"state",
                    value:null,
                    elementType:"input",
                    type:"text",
                    placeholder:"State",
                    validation:{
                                required:true
                                }
                
                },
                zipCode:{
                    id:"zipCode",
                    value:null,
                    elementType:"input",
                    type:"text",
                    placeholder:"Zip-code",
                    validation:{
                                required:true
                                }
                
                },
                paymentMethod:{
                    id:"paymentMethod",
                    value:null,
                    elementType:"dropdown",
                    options:["Payment Method","Cash on delivery","Paytm","Credit/Debit Card"],
                    validation:{
                        required:true
                        }
                    
                }


        }
    }

    provideElements=(elementObj)=>{
            switch(elementObj.elementType){
                case "input":
                    return <input 
                    onChange={(e)=> this.inputChangeHandler(e,elementObj)}
                    key={elementObj.id}
                    className="form-control"
                    type={elementObj.type} 
                    placeholder={elementObj.placeholder} 
                    required={elementObj.validation.required}
                    />
                    break;
            
                case "dropdown":
                    return (<select  className="custom-select" onChange={(e)=> this.inputChangeHandler(e,elementObj)} required={true}>
                        {
                        elementObj.options.map((option)=>( option==="Payment Method"? <option selected={true} >{option}</option>: <option style={{color:"black"}} value={option}>{option}</option>))
                        }
                        
                    </select>)
                    break;

                }
    }

    generateFormElement=()=>{
        let formElementsKeys = Object.keys(this.state.formElements);
        let formElementsArr=[]
        for(let i=0;i<formElementsKeys.length;i++){
            formElementsArr.push( this.provideElements(this.state.formElements[formElementsKeys[i]]) );
        }

        return formElementsArr;
    }

    inputChangeHandler=(e,elementObj)=>{
        
        let value = e.target.value;
        this.setState((prevState)=>{
            prevState.formElements[elementObj.id].value=value
            return {prevState}
        })
    }

    close=()=>{
        this.props.closeForm()
    }

    formSubmit=(e)=>{
        e.preventDefault()
        this.props.giveInputValuesBack(this.state.formElements);
        this.props.submitForm()
    }
    render(){
        return(
            <form className={classes.UserDetailForm} onSubmit={this.formSubmit}>
                <i style={{cursor:"pointer",color:"red",textAlign:"right"}} data-toggle="tooltip" title="Close" onClick={this.close} class="material-icons">highlight_off</i>
                <p><strong>{this.props.heading}</strong></p>
                <div className="form-group">
                {
                    this.generateFormElement()
                }
                </div>
            <button type="submit" className="btn btn-primary" >{this.props.submitBtnTitle}</button>
        </form>
        )
    }
}

export default UserDetail;