import React from "react"
import Burger from "../../../component/Burger/Burger"
import classes from "./Order.module.css"
import Button from "../../../component/Button/Button"

class Order extends React.Component{

    state = {
        expand:false
    }

    expandOrder = ()=>{
        this.setState({expand:true})
    }


    shrinkOrder = ()=>{
        this.setState({expand:false})
    }
    render(){
        return(
            <div className={classes.OrderContainer + " text-monospace card"}>
                    <p className={classes.OrderNo}>order no-{this.props.no + 1}</p>
                    <div style={{background:"white"}} className={classes.OrderedBurger +" card-header"}>
                        <Burger ingredients={this.props.orderDetail.ingredients}/>
                    </div>
                    {this.state.expand? 
                    <div className="card-body">
                    <p style={{color:"#1C2833"}}><strong>Ingredients Quantity :</strong></p>
                    <ul  className="list-group">
                    {
                        this.props.orderDetail.ingredients.Meat!==0 ? 

                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Meat
                            <span className="badge badge-primary badge-pill">{this.props.orderDetail.ingredients.Meat}</span>
                        </li>
                        : null
                    }
                    {
                        this.props.orderDetail.ingredients.Bacon!==0 ? 
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Bacon
                            <span className="badge badge-primary badge-pill">{this.props.orderDetail.ingredients.Bacon}</span>
                        </li>
                        : null
                    }
                    {
                        this.props.orderDetail.ingredients.Salad!==0 ? 
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Salad
                            <span className="badge badge-primary badge-pill">{this.props.orderDetail.ingredients.Salad}</span>
                        </li>
                        : null
                    }
                    {
                        this.props.orderDetail.ingredients.Cheese !==0? 
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Cheese
                            <span className="badge badge-primary badge-pill">{this.props.orderDetail.ingredients.Cheese}</span>
                        </li>
                        : null
                    }
                    </ul>
                    <p style={{color:"#1C2833",marginTop:"15px"}}>Delivered To :</p>
                    {
                        this.props.orderDetail.address!==undefined ?
                        <div className="border border-info" style={{color:"#5D6D7E",borderRadius:"5px",padding:"15px"}}>
                    <p style={{textAlign:"right"}} >{this.props.orderDetail.address.street}</p>
                    <p style={{textAlign:"right"}} >{this.props.orderDetail.address.city}</p>
                    <p style={{textAlign:"right"}} >{this.props.orderDetail.address.state}</p>
                    <p style={{textAlign:"right"}} >{this.props.orderDetail.address.zipCode}</p> 
                    </div>
                    :null
                    }
                    <Button  btnClassName="btn btn-danger" btnName="Less" btnClick={this.shrinkOrder}/>
                </div>
                :
                <Button  btnClassName="btn btn-success" btnName="More" btnClick={this.expandOrder}/>
                
                }
        
                    <p>Total Amount Paid : <strong>Rs {this.props.orderDetail.totalPrice} /-</strong></p>
                    <p>Payment Method : <strong> {this.props.orderDetail.paymentMethod} </strong></p>
                    
            </div>
        )
    }
}

export default Order;