import React , {Component} from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "../BurgerIngredient/BurgerIngredients";

class Burger extends Component{

    render(){
        return(
            <div  className={classes.BurgerComponent}>
                <BurgerIngredients  ingredients = {this.props.ingredients}>{this.props.children}</BurgerIngredients>
            </div>
        )
    }
}

export default Burger;