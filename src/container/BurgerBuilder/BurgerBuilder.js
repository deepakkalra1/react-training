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
import Backdrop from "../../component/Backdrop/Backdrop"
import UserDetailForm from "../orderForm/OrderUserDetail"
import withErrorHandler from "../../component/ErrorHandler/withErrorHandler"
import {connect} from "react-redux"
const actions=  require( "../../actions/actions")

class BurgerBuilder extends Component{


static componentRenderCount=0;
static getDerivedStateFromProps=(nextProps)=>{

    console.log("derived",this.initialState)
   if (++this.componentRenderCount==1){
       this.initialState={...this.state,
        ingredients: {...nextProps.ingredients},
        price:{...nextProps.price}
       }
    }        




}


static getDerivedStateFromProps(nextProps){
    console.log(nextProps)
    
}

    componentDidMount(){
        this.props.setInitialIngredients(this.props.verifyErrorOccur)
        
    }

    
    total=0;
    state = {
        propsChangedNumber:0,
        orderPlaced:false,
        checkedOut:false,
        orderInPlace:false,
        
        orderNowClickedStatus:false,
        orderNowClickEligible:false,
        backdropVisible:false
        
        
         
    }

        
     initialState={...this.state}


    

    checkout=()=>{
        this.setState({orderNowClickedStatus:false,checkedOut:true})
    }



    findPrice = ()=>{
            let total = Object.keys(this.props.price).map((key)=>{
                if(key!="BreadTop" && key!="BreadBottom"){
                let ingredientNumber = Number(this.props.ingredients[key])
                let ingredientPrice = Number(this.props.price[key])
                 this.total+= ingredientNumber * ingredientPrice;
                }
                
            })
    
            this.props.setTotalPrice(this.total)
            this.total=0
        
       
    
    }



    checkIfAnySelected= ()=>{
        
        
        if(this.props.ingredients.Bacon===0 && this.props.ingredients.Salad===0 &&
            this.props.ingredients.Meat===0 && this.props.ingredients.Cheese===0 )
            {
            
                return false;
            }

            return true;
    }



    addIngredient = (e)=>{
            let keyIs = e.target.parentNode.id;
            console.log(this.props.ingredients)
            if(this.props.ingredients[keyIs]<3){
                
                this.props.addIngredient(keyIs)
                    this.findPrice()
                    this.updateOrderNowClickEligibleStatusOnAdd()
                    this.setState(prevState=>{
                        return{propsChangedNumber:prevState.propsChangedNumber+1}
                    })
                
            }
            
          
    }



    removeIngredient = (e)=>{
        
        let keyIs = e.target.parentNode.id
        
            
            
                if(this.props.ingredients[keyIs]>0){
                
                    this.props.removeIngredient(keyIs)
                    this.findPrice()
                    this.updateOrderNowClickEligibleStatusOnRemove()
                    this.setState(prevState=>{
                        return{propsChangedNumber:prevState.propsChangedNumber+1}
                    })
                }
        
                
        
          
}



    updateOrderNowClickEligibleStatusOnAdd=()=>{
        if(this.state.orderNowClickEligible===false){
        Object.keys(this.props.ingredients).map((ingredientName)=>{
            
                if(this.props.ingredients[ingredientName]>0 && this.props.ingredients[ingredientName]!="BreadTop" && this.props.ingredients[ingredientName]!="BreadBottom"){
                    this.setState((prevState)=>{
                       return {orderNowClickEligible:true}
                    })
                }
            
        })
    }
    }



    updateOrderNowClickEligibleStatusOnRemove=()=>{
        
        let ingKeys = Object.keys(this.props.ingredients);
        for(let i=0;i<ingKeys.length;i++){
            if(this.props.ingredients[ingKeys[i]] >0 && ingKeys[i]!="BreadTop" && ingKeys[i]!="BreadBottom" ){
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


    closeOrderUserDetailForm=()=>{
        this.setState({checkedOut:false})
    }

    boughtFormDetailObj={}

    bringFormDetailValues = (obj)=>{
        this.boughtFormDetailObj={...obj}

    }


    submitUserDetailForOrderForm=()=>{
        this.setState({orderInPlace:1,checkedOut:false})
        
        let order={
            name:this.boughtFormDetailObj.name.value,
            ingredients :{...this.props.ingredients},
            totalPrice : this.props.totalPrice,
            address:{
                street:this.boughtFormDetailObj.street.value,
                city:this.boughtFormDetailObj.city.value,
                state:this.boughtFormDetailObj.state.value,
                zipCode:this.boughtFormDetailObj.zipCode.value,
                
            },
            paymentMethod:this.boughtFormDetailObj.paymentMethod.value,
            phoneNumber:this.boughtFormDetailObj.phoneNumber.value,
            email:this.boughtFormDetailObj.email.value
            
        }

        axios.post("/order.json",order)
        .then(res=>{
            
            
            this.setState({orderInPlace:2})

            this.setState(()=>{
                this.initialState.orderInPlace=2;
                // here setting state to initial when order is completed
                this.props.setInitialIngredients()
                this.props.setTotalPrice(0)
                return {...this.initialState}
            })
            setTimeout(()=>{
                
            this.setState({orderInPlace:0})
            
            },3000)
            


        })


        .catch((error)=>{
            this.setState({...this.initialState})
            this.props.verifyErrorOccur(error)
        })

    }


    render(){
        console.log("render",this.initialState)
        return(
            <div className={classes.BurgerBuilderContainer +" text-monospace"}>
               
                {
                    this.state.orderInPlace===1 ?<React.Fragment>  
                        <Backdrop />
                        <Spinner style={{position:"fixed",margin: "auto",zIndex:"151",
                    left: "0",
                    right: "0"}} />

                </React.Fragment>
                    :
                    this.state.orderInPlace===2 ? 
                    <SuccessAlert imgName="successGreen.png" type={"dark"} msg={"Order Placed !!"} />
                    :null
                }
                
                {
                    this.props.ingredients ? this.checkIfAnySelected()?<div className={classes.AroundBurger}> <Burger ingredients = {this.props.ingredients} /> </div>:
                    <div className={classes.AroundBurger}><Burger ingredients = {this.props.ingredients} ><h6>Add ingredients of your choice!</h6></Burger></div>
                    : <Spinner />
                }

                {
                    this.state.orderNowClickedStatus?
                    <OrderSummary  checkout={this.checkout} totalPrice={this.state.totalPrice} backdropClick={this.backdropClickForOrder} cancelCheckout={this.cancelCheckout} ingredientsList={this.props.ingredients} totalPrice={this.props.totalPrice}/>
                    : null
                }

                <BurgerPrice price={this.props.totalPrice}/>

               {
                   this.props.ingredients? <BurgerIngredientController addIngredient={this.addIngredient} ingredients={this.props.ingredients} removeIngredient={this.removeIngredient}/>
                    :null
               }

               {
                    this.state.checkedOut? <React.Fragment> <Backdrop backdropClick={this.closeOrderUserDetailForm} /> <UserDetailForm giveInputValuesBack={this.bringFormDetailValues} submitForm={this.submitUserDetailForOrderForm} closeForm={this.closeOrderUserDetailForm}  heading="Enter Your Details:" submitBtnTitle="Place Order"/> </React.Fragment>:null
               } {/* <SuccessAlert imgName="successGreen.png" type={"dark"} msg={"Order Placed !!"} /> */}
               
               {

               }
                <OrderNow disabledStatus={ !this.state.orderNowClickEligible}  btnClick={this.orderNow} btnClassName="btn btn-primary" btnName="ORDER NOW"/>
            </div>
        )
    }

}



const mapStateToProps = (state)=>{
        
    return{
        ingredients:state.burgerBuilder.ingredients,
   price:state.burgerBuilder.price,
   totalPrice:state.burgerBuilder.totalPrice
}
}

const mapDispatchToProps = (dispatch)=>{
    return{
    setInitialIngredients: (verifyErrorOccur)=> dispatch(actions.setInititialIngredienstAction(verifyErrorOccur)),
    setTotalPrice: (total)=> dispatch(actions.setTotalPriceAction(total)),
    addIngredient:(name)=> dispatch(actions.addIngredientAction(name)),
    removeIngredient:(name)=> dispatch(actions.removeIngredientAction(name))
    
}
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder));