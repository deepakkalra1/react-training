import React  from "react";
import classes from "./OrderSummary.module.css";
import CheckoutButton from "../Button/Button"
import Backdrop from "../Backdrop/Backdrop"

const OrderSummary=(props)=>{

    const checkoutHandler = ()=>{
        props.checkout()
    }
    
    
      let listValues=  Object.keys(props.ingredientsList).map((ingredientName)=>{
            if(ingredientName!=="BreadTop" && ingredientName!=="BreadBottom" && props.ingredientsList[ingredientName]>0){
              
                return(
                    <li  className={classes.ListItem }><p className={classes.ChildItem }>{ingredientName}</p><p className={classes.ChildItem}>x{props.ingredientsList[ingredientName]}</p> </li>
                    )
            }
        })




        return(
            <React.Fragment>
                
                <Backdrop backdropClick={props.backdropClick}/>
            
            <div className={classes.OrderSummaryContainer + " text-dark text-monospace"}>
            
                <strong style={{textDecoration:"underline"}}>Order Summary</strong>
                <p >A delicious Burger with following ingredients :</p>
                  
                <ul>
                {
                            listValues
                    }
                </ul>
                <p><strong>Total Price: </strong>Rs {props.totalPrice} /-</p>
                        <CheckoutButton btnClick={checkoutHandler} btnClassName="btn btn-warning" btnName="Checkout with items!"/>
            </div>
            </React.Fragment>
        )
    }



export default OrderSummary;