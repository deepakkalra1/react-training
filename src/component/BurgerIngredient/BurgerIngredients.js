import React , {Component} from "react";
import classes from "../Burger/Burger.module.css";


class BurgerIngredients extends Component{
    

    provideIngredient = (ingredientName)=>{
            switch(ingredientName){
                case ("BreadTop"):
                    return  (<React.Fragment> <div className={classes.BreadTop}>
                        
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                         </div> {this.props.children} </React.Fragment>)
                         break;
                
                 case ("Meat"):
                    return <div className={classes.Meat}></div>
                                 break;

                   case ("Salad"):
                                      return  <div className={classes.Salad}></div>
                                            break;
                    case ("Cheese"):
                    return    <div className={classes.Cheese}></div>
                                                     break;


                     case ("Bacon"):
                        return   <div className={classes.Bacon}></div>
                                                             break;
               case ("BreadBottom"):
                    return     <div className={classes.BreadBottom}></div>
                         break;
            }
    }

    render(){
        
        
        let finalIngredientsMarkups = Object.keys(this.props.ingredients).map((key)=>{
            
            let ingredientsMarkup=[];
             for(let i=0; i<this.props.ingredients[key];i++){
            
                 ingredientsMarkup.push(this.provideIngredient(key))
             } 

             return ingredientsMarkup
        })
        console.log(finalIngredientsMarkups)
        let arr = [<div>helloo</div>]
    
        return(
            <React.Fragment>
            {
                //arr
                finalIngredientsMarkups
                
            }
           </React.Fragment> 
        )
    }

}

export default BurgerIngredients;