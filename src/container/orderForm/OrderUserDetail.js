import React, { useState } from "react"
import classes from "./OrderUserDetail.module.css"

const UserDetail=(props)=> {

    const [state,setState] = useState({
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
               
                phoneNumber:{
                    id:"phoneNumber",
                    value:null,
                    elementType:"input",
                    type:"tel",
                    placeholder:"Mobile Number without prefix",
                    validation:{
                                required:true,
                                maxLength:"10"
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
                                required:true,
                                maxLength:"6"
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
    })

    
    //--------------------------------------------->

    const provideElements=(elementObj)=>{   
            switch(elementObj.elementType){
                case "input":
                    return <input 
                    maxLength= {elementObj.validation.maxLength ?  elementObj.validation.maxLength:null }
                    
                    onChange={(e)=> inputChangeHandler(e,elementObj)}
                    key={elementObj.id}
                    className="form-control"
                    type={elementObj.type} 
                    id={elementObj.id}
                    placeholder={elementObj.placeholder} 
                    required={elementObj.validation.required}
                    />
                    break;
            
                case "dropdown":
                    return (<select  className="custom-select" onChange={(e)=> inputChangeHandler(e,elementObj)} required={true}>
                        {
                        elementObj.options.map((option)=>( option==="Payment Method"? <option selected={true} >{option}</option>: <option style={{color:"black"}} value={option}>{option}</option>))
                        }
                    </select>)
                    break;
                default:
                    return null;
                }
    }



    //--------------------------------------------->
   const generateFormElement=()=>{
        
        let formElementsKeys = Object.keys(state.formElements);
        let formElementsArr=[]
        for(let i=0;i<formElementsKeys.length;i++){
            formElementsArr.push( provideElements(state.formElements[formElementsKeys[i]]) );
        }
        return formElementsArr;
    }


    //--------------------------------------------->
    const inputChangeHandler=(e,elementObj)=>{
        
        let value = e.target.value;
        setState((prevState)=>{
           let ps=  {...prevState}
           ps.formElements[elementObj.id].value=value
            return {...ps}
        })
    }


    //--------------------------------------------->
    const close=()=>{
        props.closeForm()
    }



    //--------------------------------------------->
    const formSubmit=(e)=>{
        e.preventDefault()
        props.giveInputValuesBack(state.formElements);
        props.submitForm()
    }


    //--------------------------------------------->
        return(
            <form className={classes.UserDetailForm } onSubmit={formSubmit}>
                <i style={{cursor:"pointer",color:"red",textAlign:"right"}} data-toggle="tooltip" title="Close" onClick={close} class="material-icons">highlight_off</i>
                <p><strong>{props.heading}</strong></p>
                <div className="form-group">
                {
                    generateFormElement()
                }
                </div>
            <button type="submit" className="btn btn-primary" >{props.submitBtnTitle}</button>
        </form>
        )
    }


export default UserDetail;