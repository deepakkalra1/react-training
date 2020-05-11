import React from "react"
import classes from "./Orders.module.css"
import Order from "./Order/Order"
import Spinner from "../../component/spinner/Spinner"
import axios from "../BurgerBuilder/axios"

class Orders extends React.Component{

    state={
        orders:null
    }


    componentDidMount(){
        axios.get("/order.json")
        .then(response=>{
                this.setState({orders:response.data})
        })
        .catch(error=>{

        })
    }



    populateOrders=()=>{
        let ordersArr=[]

        let keys= Object.keys(this.state.orders)
        
        for(let i=0; i<keys.length;i++){
            

            let obj = this.state.orders[keys[i]]
                    console.log(obj.ingredients)
            ordersArr.push(<Order no={i}

                orderDetail={obj}
                />)
        }

        return ordersArr;
    }
    
    render(){
        return(
            <div className={classes.OrdersContainer}>
                   
           {this.state.orders? this.populateOrders() :
           <Spinner />
           }
            </div>
        )
    }
}

export default Orders;