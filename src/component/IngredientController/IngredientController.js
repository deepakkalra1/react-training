import React , {Component} from "react";
import classes from "../IngredientController/IngredientController.module.css";

class IngredientController extends Component{

    render(){
        return(
            <div className={classes.IngredientControllerContainer }>
                {
                   Object.keys(this.props.ingredients).map((ingredientName)=>{
                        if(ingredientName !=="BreadTop" && ingredientName!=="BreadBottom"){
                        return (<div className={classes.ItemContainer} id={ingredientName} key={ingredientName.toLowerCase()}>
                            <span className={classes.ItemName}>{ingredientName}</span>
                            
                            <button style={{marginLeft:"10px"}} className="btn btn-success" onClick={this.props.addIngredient}>Add</button> 
                            {
                                this.props.ingredients[ingredientName]===0 ?
                                <button style={{marginLeft:"10px"}} className="btn btn-danger" disabled={true} onClick={this.props.removeIngredient}>Less</button>
                            :   <button style={{marginLeft:"10px"}} className="btn btn-danger" onClick={this.props.removeIngredient}>Less</button>
                                
                            }
                            
                            
                        </div>)
                        }
                    })
                }
                
            </div>
        )
    }

}

export default IngredientController;