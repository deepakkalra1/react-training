import React , {Component} from "react";
import classes from "../BurgerPrice/BurgerPrice.module.css";


class BurgerPrice extends Component{

    render(){
        return(
            <p className={classes.PriceContainer}><span>Total Price : Rs </span> {this.props.price}<span> /-</span> </p>
        )
    }

}

export default BurgerPrice;