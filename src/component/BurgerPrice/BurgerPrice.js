import React  from "react";
import classes from "../BurgerPrice/BurgerPrice.module.css";


const BurgerPrice=(props)=> {

        return(
            <p className={classes.PriceContainer}><span>Total Price : Rs </span> {props.price}<span> /-</span> </p>
        )
    }



export default BurgerPrice;