import React  from "react";
import classes from "../Burger/Burger.module.css";


const BurgerIngredients=(props)=>{
    

    const provideIngredient = (ingredientName)=>{
            switch(ingredientName){
                case ("BreadTop"):
                    return  (<React.Fragment key="upperBread"> <div key="breadTop" className={classes.BreadTop}>
                        
                        <div key="seed1" className={classes.Seeds1}></div>
                        <div key="seed2" className={classes.Seeds2}></div>
                         </div> {props.children} </React.Fragment>)
                         
                
                 case ("Meat"):
                    return <div key="meat" className={classes.Meat}></div>
                                 

                   case ("Salad"):
                                      return  <div key="salad" className={classes.Salad}></div>
                                            
                    case ("Cheese"):
                    return    <div key="cheese" className={classes.Cheese}></div>
                                                     


                     case ("Bacon"):
                        return   <div key="bacon" className={classes.Bacon}></div>
                                                            
               case ("BreadBottom"):
                    return     <div key="breadBottom" className={classes.BreadBottom}></div>
                       
                default :
                return null;
                        }
    }

    

        let finalIngredientsMarkups = [];
        finalIngredientsMarkups.push(provideIngredient("BreadTop"))
        
        let keySet=Object.keys(props.ingredients)
        
        for(let i=0;i<keySet.length;i++){
            let key=keySet[i];
            let ingredientsMarkup=[];
            
            for(let j=0; j<props.ingredients[key];j++){
                                if(key!=="BreadTop" && key!== "BreadBottom"){
                                ingredientsMarkup.push(provideIngredient(key))
                            }

        }
        finalIngredientsMarkups.push(ingredientsMarkup)
    }
    finalIngredientsMarkups.push(provideIngredient("BreadBottom"))

    
        return(
            <React.Fragment>
            {
                finalIngredientsMarkups
            }
           </React.Fragment> 
        )
    }

export default BurgerIngredients;