import React  from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "../BurgerIngredient/BurgerIngredients";

const Burger=(props)=>{
        return(
            <div  className={classes.BurgerComponent}>
                <BurgerIngredients  ingredients = {props.ingredients}>{props.children}</BurgerIngredients>
            </div>
        )
    }
export default Burger;