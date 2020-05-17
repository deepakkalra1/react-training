import React , {Component} from "react";
import Burger from "../../component/Burger/Burger"
import classes from "../BurgerBuilder/BurgerBuilder.module.css"
import BurgerIngredientController from "../../component/IngredientController/IngredientController"
import BurgerPrice from "../../component/BurgerPrice/BurgerPrice"
import OrderNow from "../../component/Button/Button"
import OrderSummary from "../../component/OrderSummary/OrderSummary"
import axios from "../BurgerBuilder/axios"
import Spinner from "../../component/spinner/Spinner"
import SuccessAlert from "../../component/alert/Alert"
import Backdrop from "../../component/Backdrop/Backdrop"
import UserDetailForm from "../orderForm/OrderUserDetail"
import withErrorHandler from "../../component/ErrorHandler/withErrorHandler"
import {connect} from "react-redux"
import Alert from "../../component/alert/Alert"
const actions=  require( "../../actions/actions")

export class BurgerBuilder extends Component{
    
    total=0;
    state = {
        alert:false,
        alertIcon:"error.png",
        alertMsg:"error occured !!",
        alertType:"danger",
        orderPlaced:false,
        checkedOut:false,
        orderInPlace:false,
        orderNowClickedStatus:false,
        orderNowClickEligible:false,
        backdropVisible:false
        
        
         
    }

    boughtFormDetailObj={}
        
    initialState={...this.state}


    static getDerivedStateFromProps(nextProps){
        
        return {
          
        }
    }

    
    //------------------------------------------------>
     componentDidMount(){
        this.props.setInitialIngredients(this.props.verifyErrorOccur)   
    }


    //------------------------------------------------>
    checkout=()=>{
        this.setState({orderNowClickedStatus:false,checkedOut:true})
    }


    //------------------------------------------------>
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


    //------------------------------------------------>
    checkIfAnySelected= ()=>{
        
        
        if(this.props.ingredients.Bacon===0 && this.props.ingredients.Salad===0 &&
            this.props.ingredients.Meat===0 && this.props.ingredients.Cheese===0 )
            {
            
                return false;
            }

            return true;
    }


    //------------------------------------------------>
    addIngredient = (e)=>{
            let keyIs = e.target.parentNode.id;
            console.log(this.props.ingredients)
            if(this.props.ingredients[keyIs]<3){
                
                this.props.addIngredient(keyIs)
                    this.findPrice()
                    this.updateOrderNowClickEligibleStatusOnAdd()
                    
                
            }
            
          
    }


    //------------------------------------------------>
    removeIngredient = (e)=>{
        
        let keyIs = e.target.parentNode.id
        
            
            
                if(this.props.ingredients[keyIs]>0){
                
                    this.props.removeIngredient(keyIs)
                    this.findPrice()
                    this.updateOrderNowClickEligibleStatusOnRemove()
                    
                }
        
                
        
          
}


    //------------------------------------------------>
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


    //------------------------------------------------>
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


    //------------------------------------------------>
    orderNow=()=>{
            this.setState(()=>{
                return {orderNowClickedStatus:true}
            })
    }


    //------------------------------------------------>
    backdropClickForOrder = ()=>{
        this.setState(()=>{
            return {orderNowClickedStatus:false}
        })
    }


    //------------------------------------------------>
    closeOrderUserDetailForm=()=>{
        this.setState({checkedOut:false})
    }


    //------------------------------------------------>
    bringFormDetailValues = (obj)=>{
        this.boughtFormDetailObj={...obj}

    }




    //------------------------------------------------>
    findMonth(no){
        switch(no){
            case 1:
                return "January"
                case 2:
                    return "February"
                    case 3:
                return "March"
                case 4:
                return "April"
                case 5:
                return "May"
                case 6:
                return "June"
                case 7:
                return "July"
                case 8:
                return "August"
                case 9:
                return "September"
                case 10:
                return "October"
                case 11:
                return "November"
                case 12:
                return "December"
                
        }
    }


    //------------------------------------------------>
    submitUserDetailForOrderForm=()=>{
        this.setState({orderInPlace:1,checkedOut:false})
        
        let order={
            userId:this.props.userId,
            name:this.boughtFormDetailObj.name.value,
            ingredients :{...this.props.ingredients},
            totalPrice : this.props.totalPrice,
            orderDate:`${new Date().getDate()}-${this.findMonth(new Date().getMonth()+1)}-${new Date().getFullYear()}`,
            orderTime: `${  new Date().getHours() >12 ? new Date().getHours()-12 :   new Date().getHours()   }: ${new Date().getMinutes().toString().length==1?0+""+new Date().getMinutes() : new Date().getMinutes()} ${new Date().getHours()>12 ? "PM":"AM"}`,
            address:{
                street:this.boughtFormDetailObj.street.value,
                city:this.boughtFormDetailObj.city.value,
                state:this.boughtFormDetailObj.state.value,
                zipCode:this.boughtFormDetailObj.zipCode.value,
                email:this.props.username
                
            },
            paymentMethod:this.boughtFormDetailObj.paymentMethod.value,
            phoneNumber:this.boughtFormDetailObj.phoneNumber.value
            
            
        }


        if(this.props.authenticated){

            axios.post("/order.json?auth="+this.props.authToken,order)
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
            let errormsg=error.response.data.error
            this.props.verifyErrorOccur({message:errormsg})
        })
        }
        else{
                this.setState({alert:true,alertIcon:"error.png",alertMsg:"You need to login to make an order !!",alertType:"danger"})

                setTimeout(()=>{
                    this.setState({...this.initialState})
                },2500)
        }

    }





    //------------------------------------------------>
    render(){
        return(
            <div className={classes.BurgerBuilderContainer +" text-monospace"}>
               {
                   this.state.alert? <Alert msg={this.state.alertMsg} type={this.state.alertType} imgName={this.state.alertIcon} />:null
               }
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
   totalPrice:state.burgerBuilder.totalPrice,
   authenticated:state.authReducer.authenticated,
   authToken:state.authReducer.authToken,
   username:state.authReducer.username,
   userId:state.authReducer.userId
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