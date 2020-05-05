import React , {Component} from "react";
import Burger from "../../component/Burger/Burger"
import classes from "../BurgerBuilder/BurgerBuilder.module.css"
import BurgerIngredientController from "../../container/BurgerBuilder/IngredientController/IngredientController"
import BurgerPrice from "../../component/BurgerPrice/BurgerPrice"
import OrderNow from "../../component/Button/Button"
import OrderSummary from "../../component/OrderSummary/OrderSummary"
import Sidedrawer from "../../component/SideDrawer/Sidedrawer"

class BurgerBuilder extends Component{
    total=0;
    state = {
        ingredients:{
            BreadTop:1,
            Salad:0,
            Bacon:0,
            Cheese:0,
            Meat:0,
            BreadBottom:1
        },
        price:{
            BreadTop:0,
            Salad:10,
            Bacon:30,
            Cheese:80,
            Meat:100,
            BreadBottom:0
        },
        totalPrice:0,
        orderNowClickedStatus:false,
        orderNowClickEligible:false
         
    }



    findPrice = ()=>{
        this.setState((prevState)=>{
            let total = Object.keys(prevState.price).map((key)=>{
                if(key!="BreadTop" && key!="BreadBottom"){
                let ingredientNumber = Number(prevState.ingredients[key])
                let ingredientPrice = Number(prevState.price[key])
                 this.total+= ingredientNumber * ingredientPrice;
                }
                
            })
    
            
            this.setState((prevState2)=>{
                    return {totalPrice:this.total}
            },()=>{
               this.total=0
            })

        })
       
    
    }

    checkIfAnySelected= ()=>{
        
        if(this.state.ingredients.Bacon===0 && this.state.ingredients.Salad===0 &&
            this.state.ingredients.Meat===0 && this.state.ingredients.Cheese===0 )
            {
            
                return false;
            }

            return true;
    }

    addIngredient = (e)=>{
            let keyIs = e.target.parentNode.id
            if(this.state.ingredients[keyIs]<3){
                this.setState((prevState)=>{
                    prevState.ingredients[keyIs]+=1;
                    return {ingredients:prevState.ingredients}
                },()=>{
                    this.findPrice()
                    this.updateOrderNowClickEligibleStatusOnAdd()
                })
            }
          
    }

    removeIngredient = (e)=>{
        
        let keyIs = e.target.parentNode.id
        
            
            this.setState((prevState)=>{
                if(prevState.ingredients[keyIs]>0){
                
            
                prevState.ingredients[keyIs]-=1;
                return {ingredients:prevState.ingredients}
                }
            },()=>{
                this.findPrice()
                this.updateOrderNowClickEligibleStatusOnRemove()
            })
          
}
    updateOrderNowClickEligibleStatusOnAdd=()=>{
        if(this.state.orderNowClickEligible===false){
        Object.keys(this.state.ingredients).map((ingredientName)=>{
            
                if(this.state.ingredients[ingredientName]>0 && this.state.ingredients[ingredientName]!="BreadTop" && this.state.ingredients[ingredientName]!="BreadBottom"){
                    this.setState((prevState)=>{
                       return {orderNowClickEligible:true}
                    })
                }
            
        })
    }
    }


    updateOrderNowClickEligibleStatusOnRemove=()=>{
        
        let ingKeys = Object.keys(this.state.ingredients);
        for(let i=0;i<ingKeys.length;i++){
            if(this.state.ingredients[ingKeys[i]] >0 && ingKeys[i]!="BreadTop" && ingKeys[i]!="BreadBottom" ){
                return 0;
            }
        }
        this.setState((prevState)=>{
            
            return {orderNowClickEligible:false}
        })
    }


    orderNow=()=>{
            this.setState(()=>{
                return {orderNowClickedStatus:true}
            })
    }

    backdropClick = ()=>{
        this.setState(()=>{
            return {orderNowClickedStatus:false}
        })
    }

    render(){
   
        return(
            <div className={classes.BurgerBuilderContainer +" text-monospace"}>
               
                {
                    this.checkIfAnySelected()? <Burger ingredients = {this.state.ingredients} />:
                    <Burger ingredients = {this.state.ingredients} ><h6>Please add ingredients of your choice!</h6></Burger>
                }
                {
                    this.state.orderNowClickedStatus?
                    <OrderSummary totalPrice={this.state.totalPrice} backdropClick={this.backdropClick} cancelCheckout={this.cancelCheckout} ingredientsList={this.state.ingredients} totalPrice={this.state.totalPrice}/>
                    : null
                }
                <BurgerPrice price={this.state.totalPrice}/>
                <BurgerIngredientController addIngredient={this.addIngredient} ingredients={this.state.ingredients} removeIngredient={this.removeIngredient}/>
               
               
                <OrderNow disabledStatus={ !this.state.orderNowClickEligible}  btnClick={this.orderNow} btnClassName="btn btn-primary" btnName="ORDER NOW"/>
               
            </div>
        )
    }

}

export default BurgerBuilder;