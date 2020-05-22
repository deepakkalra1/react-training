import React , {useState,useEffect} from "react";
import Burger from "../../component/Burger/Burger"
import classes from "../BurgerBuilder/BurgerBuilder.module.css"
import BurgerIngredientController from "../../component/IngredientController/IngredientController"
import BurgerPrice from "../../component/BurgerPrice/BurgerPrice"
import OrderNow from "../../component/Button/Button"
import OrderSummary from "../../component/OrderSummary/OrderSummary"
import axios from "../BurgerBuilder/axios"
import Spinner from "../../component/spinner/Spinner"
import SuccessAlert from "../../component/alert/Alert"
import Backdrop from "../../component/Backdrop/Backdrop"
import UserDetailForm from "../orderForm/OrderUserDetail"
import withErrorHandler from "../../component/ErrorHandler/withErrorHandler"
import {connect} from "react-redux"
import Alert from "../../component/alert/Alert"
const actions=  require( "../../actions/actions")

export const BurgerBuilder=React.memo( (props)=>{
   
    const [state,setState] = useState({
        alert:false,
        alertIcon:"error.png",
        alertMsg:"error occured !!",
        alertType:"danger",
        orderPlaced:false,
        checkedOut:false,
        orderInPlace:false,
        orderNowClickedStatus:false,
        orderNowClickEligible:false,
        backdropVisible:false 
    })
    
    let total=0;
    

   let boughtFormDetailObj={}
        
    let initialState={...state}

    
    //------------------------------------------------>
    //to be used as componentDidMount
    useEffect(()=>{
        props.setInitialIngredients(props.verifyErrorOccur)
    },[])



    //------------------------------------------------>
    const checkout=()=>{
        setState(prevState=> {return {...prevState, orderNowClickedStatus:false,checkedOut:true}})
    }


    //------------------------------------------------>
    const findPrice = ()=>{
             Object.keys(props.price).map((key)=>{
                if(key!=="BreadTop" && key!=="BreadBottom"){
                let ingredientNumber = Number(props.ingredients[key])
                let ingredientPrice = Number(props.price[key])
                 total+= ingredientNumber * ingredientPrice;
                }
              return null;  
            })
    
            props.setTotalPrice(total)
            total=0
        
       
    
    }


    //------------------------------------------------>
    const checkIfAnySelected= ()=>{
        if(props.ingredients.Bacon===0 && props.ingredients.Salad===0 &&
            props.ingredients.Meat===0 && props.ingredients.Cheese===0 )
            {
                return false;
            }
            return true;
    }


    //------------------------------------------------>
   const addIngredient = (e)=>{
            let keyIs = e.target.parentNode.id;
          
            if(props.ingredients[keyIs]<3){
                props.addIngredient(keyIs)
                    findPrice()
                    updateOrderNowClickEligibleStatusOnAdd()
            }            
    }


    //------------------------------------------------>
    const removeIngredient = (e)=>{
        
        let keyIs = e.target.parentNode.id
                if(props.ingredients[keyIs]>0){
                    props.removeIngredient(keyIs)
                    findPrice()
                    updateOrderNowClickEligibleStatusOnRemove()   
                }      
}


    //------------------------------------------------>
    const updateOrderNowClickEligibleStatusOnAdd=()=>{
        if(state.orderNowClickEligible===false){
        Object.keys( props.ingredients).map((ingredientName)=>{
            
                if( props.ingredients[ingredientName]>0 && props.ingredients[ingredientName]!=="BreadTop" &&  props.ingredients[ingredientName]!=="BreadBottom"){
                     setState((prevState)=>{
                       return {...prevState, orderNowClickEligible:true}
                    })
                }
            return null;
        })
    }
    }


    //------------------------------------------------>
    const updateOrderNowClickEligibleStatusOnRemove=()=>{
        let ingKeys = Object.keys( props.ingredients);
        for(let i=0;i<ingKeys.length;i++){
            if( props.ingredients[ingKeys[i]] >0 && ingKeys[i]!=="BreadTop" && ingKeys[i]!=="BreadBottom" ){
                return 0;
            }
        }
         setState((prevState)=>{
            return {...prevState, orderNowClickEligible:false}
        })
    }


    //------------------------------------------------>
    const orderNow=()=>{
             setState((prevState)=>{
                return {...prevState, orderNowClickedStatus:true}
            })
    }


    //------------------------------------------------>
    const backdropClickForOrder = ()=>{
         setState((prevState)=>{
            return {...prevState, orderNowClickedStatus:false}
        })
    }


    //------------------------------------------------>
    const closeOrderUserDetailForm=(prevState)=>{
         setState({...prevState, checkedOut:false})
    }


    //------------------------------------------------>
   const bringFormDetailValues = (obj)=>{
         boughtFormDetailObj={...obj}

    }




    //------------------------------------------------>
    const findMonth=(no)=>{
        switch(no){
            case 1:
                return "January"
                case 2:
                    return "February"
                    case 3:
                return "March"
                case 4:
                return "April"
                case 5:
                return "May"
                case 6:
                return "June"
                case 7:
                return "July"
                case 8:
                return "August"
                case 9:
                return "September"
                case 10:
                return "October"
                case 11:
                return "November"
                case 12:
                return "December"
                default:
                    return null;
                
        }
    }


    //------------------------------------------------>
    const submitUserDetailForOrderForm=()=>{
         setState(prevState=> { return{...prevState, orderInPlace:1,checkedOut:false}})
        
        let order={
            userId: props.userId,
            name: boughtFormDetailObj.name.value,
            ingredients : { ...props.ingredients },
            totalPrice :  props.totalPrice,
            orderDate:`${new Date().getDate()}-${ findMonth(new Date().getMonth()+1)}-${new Date().getFullYear()}`,
            orderTime: `${  new Date().getHours() >12 ? new Date().getHours()-12 :   new Date().getHours()   }: ${new Date().getMinutes().toString().length===1?0+""+new Date().getMinutes() : new Date().getMinutes()} ${new Date().getHours()>12 ? "PM":"AM"}`,
            address:{
                street: boughtFormDetailObj.street.value,
                city: boughtFormDetailObj.city.value,
                state: boughtFormDetailObj.state.value,
                zipCode: boughtFormDetailObj.zipCode.value,
                email: props.username
                
            },
            paymentMethod: boughtFormDetailObj.paymentMethod.value,
            phoneNumber: boughtFormDetailObj.phoneNumber.value
            
            
        }

        if( props.authenticated){
            axios.post("/order.json?auth="+ props.authToken,order)
        .then(res=>{  
            //  setState( {orderInPlace:2})

             setState(()=>{
                 
                // here setting state to initial when order is completed
                 props.setInitialIngredients()
                 props.setTotalPrice(0)
             
                return {
                    alert:false,
                    alertIcon:"error.png",
                    alertMsg:"error occured !!",
                    alertType:"danger",
                    orderPlaced:false,
                    checkedOut:false,
                    orderInPlace:2,
                    orderNowClickedStatus:false,
                    orderNowClickEligible:false,
                    backdropVisible:false 
                }
            })
            setTimeout(()=>{
             setState(prevState=>{ return{...prevState, orderInPlace:0}})
            },3000)
            


        })
        .catch((error)=>{
             setState(prevState=>{return { ...initialState}})
            let errormsg=error.response.data.error
             props.verifyErrorOccur({message:errormsg})
        })
        }
        else{
                 setState(prevState=>{return {...prevState, alert:true,alertIcon:"error.png",alertMsg:"You need to login to make an order !!",alertType:"danger"}})

                setTimeout(()=>{
                     setState( { ...initialState})
                },2500)
        }

    }





    //------------------------------------------------>
    
        return(
            <div className={classes.BurgerBuilderContainer +" text-monospace"}>
               {
                    state.alert? <Alert msg={ state.alertMsg} type={ state.alertType} imgName={ state.alertIcon} />:null
               }
                {
                     state.orderInPlace===1 ?<React.Fragment>  
                        <Backdrop />
                        <Spinner style={{position:"fixed",margin: "auto",zIndex:"151",
                    left: "0",
                    right: "0"}} />

                </React.Fragment>
                    :
                     state.orderInPlace===2 ? 
                    <SuccessAlert imgName="successGreen.png" type={"dark"} msg={"Order Placed !!"} />
                    :null
                }
                
                {
                     props.ingredients ?  checkIfAnySelected()?<div className={classes.AroundBurger}> <Burger ingredients = { props.ingredients} /> </div>:
                    <div className={classes.AroundBurger}><Burger ingredients = { props.ingredients} ><h6>Add ingredients of your choice!</h6></Burger></div>
                    : <Spinner />
                }

                {
                     state.orderNowClickedStatus?
                    <OrderSummary  checkout={ checkout}  backdropClick={ backdropClickForOrder}  ingredientsList={ props.ingredients} totalPrice={ props.totalPrice}/>
                    : null
                }

                <BurgerPrice price={ props.totalPrice}/>

               {
                    props.ingredients? <BurgerIngredientController addIngredient={ addIngredient} ingredients={ props.ingredients} removeIngredient={ removeIngredient}/>
                    :null
               }

               {
                     state.checkedOut? <React.Fragment> <Backdrop backdropClick={ closeOrderUserDetailForm} /> <UserDetailForm giveInputValuesBack={ bringFormDetailValues} submitForm={ submitUserDetailForOrderForm} closeForm={ closeOrderUserDetailForm}  heading="Enter Your Details:" submitBtnTitle="Place Order"/> </React.Fragment>:null
               } {/* <SuccessAlert imgName="successGreen.png" type={"dark"} msg={"Order Placed !!"} /> */}
               
               {

               }
                <OrderNow disabledStatus={ ! state.orderNowClickEligible}  btnClick={ orderNow} btnClassName="btn btn-primary" btnName="ORDER NOW"/>
            </div>
        )
    }
)



const mapStateToProps = (state)=>{
        
    return{
        ingredients:state.burgerBuilder.ingredients,
   price:state.burgerBuilder.price,
   totalPrice:state.burgerBuilder.totalPrice,
   authenticated:state.authReducer.authenticated,
   authToken:state.authReducer.authToken,
   username:state.authReducer.username,
   userId:state.authReducer.userId
}
}

const mapDispatchToProps = (dispatch)=>{
    return{
    setInitialIngredients: (verifyErrorOccur)=> dispatch(actions.setInititialIngredienstAction(verifyErrorOccur)),
    setTotalPrice: (total)=> dispatch(actions.setTotalPriceAction(total)),
    addIngredient:(name)=> dispatch(actions.addIngredientAction(name)),
    removeIngredient:(name)=> dispatch(actions.removeIngredientAction(name))
    
}
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder));