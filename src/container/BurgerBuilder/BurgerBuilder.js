import React , {Component} from "react";
import Burger from "../../component/Burger/Burger"
import classes from "../BurgerBuilder/BurgerBuilder.module.css"
import BurgerIngredientController from "../../container/BurgerBuilder/IngredientController/IngredientController"
import BurgerPrice from "../../component/BurgerPrice/BurgerPrice"
import OrderNow from "../../component/Button/Button"
import OrderSummary from "../../component/OrderSummary/OrderSummary"
import Sidedrawer from "../../component/SideDrawer/Sidedrawer"
import axios from "../BurgerBuilder/axios"
import Spinner from "../../component/spinner/Spinner"
import SuccessAlert from "../../component/alert/Alert"

class BurgerBuilder extends Component{

    componentDidMount(){
        axios.get("ingredients.json")
        .then(res=>{
            this.setState({ingredients:res.data})
          
        })
        .catch(error=>{
            console.log(error)
        })
    }

    total=0;
    state = {
        orderPlaced:false,
        checkedOut:false,
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
        orderNowClickEligible:false,
        
         
    }

    checkout=(orderDetail)=>{
        
        this.setState(
            ()=>{
            return {checkedOut:true}}
            
        
        )
        axios.post("/order.json",orderDetail)
        .then(res=>{
            this.setState({checkedOut:false})
            this.backdropClickForOrder();

            this.setState({orderPlaced:true})
            setTimeout(()=>{
                this.setState({orderPlaced:false})
            },4000)

        })
        .catch(()=>{
            this.setState({checkedOut:false})
            this.backdropClickForOrder();
        })
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

    backdropClickForOrder = ()=>{
        this.setState(()=>{
            return {orderNowClickedStatus:false}
        })
    }

    render(){
   
        return(
            <div className={classes.BurgerBuilderContainer +" text-monospace"}>
                {
                    this.state.orderPlaced ?<SuccessAlert imgName="successGreen.png" type={"dark"} msg={"Order Placed !!"} />
                    :null
                }
                
                {
                    this.state.ingredients ? this.checkIfAnySelected()? <Burger ingredients = {this.state.ingredients} />:
                    <Burger ingredients = {this.state.ingredients} ><h6>Please add ingredients of your choice!</h6></Burger>
                    : <Spinner />
                }
                {
                    this.state.orderNowClickedStatus?
                    <OrderSummary checkoutClickedStatus={this.state.checkedOut} checkout={this.checkout} totalPrice={this.state.totalPrice} backdropClick={this.backdropClickForOrder} cancelCheckout={this.cancelCheckout} ingredientsList={this.state.ingredients} totalPrice={this.state.totalPrice}/>
                    : null
                }
                <BurgerPrice price={this.state.totalPrice}/>
               {
                   this.state.ingredients? <BurgerIngredientController addIngredient={this.addIngredient} ingredients={this.state.ingredients} removeIngredient={this.removeIngredient}/>
                    :null
               }
               
                <OrderNow disabledStatus={ !this.state.orderNowClickEligible}  btnClick={this.orderNow} btnClassName="btn btn-primary" btnName="ORDER NOW"/>
               
            </div>
        )
    }

}

export default BurgerBuilder;