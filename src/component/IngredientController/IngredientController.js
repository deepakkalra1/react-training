import React  from "react";
import classes from "../IngredientController/IngredientController.module.css";

const IngredientController=(props)=> {

        return(
            <div className={classes.IngredientControllerContainer }>
                {
                   Object.keys(props.ingredients).map((ingredientName)=>{
                        if(ingredientName !=="BreadTop" && ingredientName!=="BreadBottom"){
                        return (<div className={classes.ItemContainer} id={ingredientName} key={ingredientName.toLowerCase()}>
                            <span className={classes.ItemName}>{ingredientName}</span>
                            
                            <button style={{marginLeft:"10px"}} className="btn btn-success" onClick={props.addIngredient}>Add</button> 
                            {
                                props.ingredients[ingredientName]===0 ?
                                <button style={{marginLeft:"10px"}} className="btn btn-danger" disabled={true} onClick={props.removeIngredient}>Less</button>
                            :   <button style={{marginLeft:"10px"}} className="btn btn-danger" onClick={props.removeIngredient}>Less</button>
                                
                            }
                            
                            
                        </div>)
                        }
                        return null
                    })
                }
                
            </div>
        )
    }



export default IngredientController;