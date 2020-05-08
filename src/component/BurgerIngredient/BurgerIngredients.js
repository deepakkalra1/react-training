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
    
        let finalIngredientsMarkups = [];
        finalIngredientsMarkups.push(this.provideIngredient("BreadTop"))
        
        let keySet=Object.keys(this.props.ingredients)
        
        for(let i=0;i<keySet.length;i++){
            let key=keySet[i];
            let ingredientsMarkup=[];
            console.log(key)
            for(let j=0; j<this.props.ingredients[key];j++){
                                if(key!=="BreadTop" && key!== "BreadBottom"){
                                ingredientsMarkup.push(this.provideIngredient(key))
                            }

        }
        finalIngredientsMarkups.push(ingredientsMarkup)
    }
    finalIngredientsMarkups.push(this.provideIngredient("BreadBottom"))

    
        return(
            <React.Fragment>
            {
                finalIngredientsMarkups
                
            }
           </React.Fragment> 
        )
    }

}

export default BurgerIngredients;