import React,{useState} from "react"
import Burger from "../../../component/Burger/Burger"
import classes from "./Order.module.css"
import Button from "../../../component/Button/Button"

const Order=(props)=>{
    const [state,setState] = useState({
        expand:false
    })


    const expandOrder = ()=>{
        setState(prevState=>{return {...prevState, expand:true}})
    }


    const shrinkOrder = ()=>{
        setState(prevState=>{ return{...prevState, expand:false}})
    }
        return(
            <div  className={classes.OrderContainer + " text-monospace card"}>
                    
                    <div style={{background:"white"}} className={classes.OrderedBurger +" card-header text-secondary"}>
                    <p className={classes.OrderNo}>Order ID -{props.no + 1}</p>
                  
                    <p>Date : <strong>{props.orderDetail.orderDate}</strong></p>
                    <p>Time : <strong>{props.orderDetail.orderTime}</strong></p>
                    </div>
                    {state.expand? 
                    <div className="card-body">
                        <div className="img-thumbnail">
                        <Burger ingredients={props.orderDetail.ingredients}/>
                            </div>
                        
                    <p className="text-secondary" style={{color:"#1C2833",marginTop:"5px"}}>
                    <i class='fas fa-chart-pie' style={{size:"35px",marginRight:"5px"}}></i>
                        <strong>Ingredients Quantity :</strong></p>
                    <ul  className="list-group">
                    {
                        props.orderDetail.ingredients.Meat!==0 ? 

                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Meat
                            <span className="badge badge-primary badge-pill">{props.orderDetail.ingredients.Meat}</span>
                        </li>
                        : null
                    }
                    {
                        props.orderDetail.ingredients.Bacon!==0 ? 
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Bacon
                            <span className="badge badge-primary badge-pill">{props.orderDetail.ingredients.Bacon}</span>
                        </li>
                        : null
                    }
                    {
                        props.orderDetail.ingredients.Salad!==0 ? 
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Salad
                            <span className="badge badge-primary badge-pill">{props.orderDetail.ingredients.Salad}</span>
                        </li>
                        : null
                    }
                    {
                        props.orderDetail.ingredients.Cheese !==0? 
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Cheese
                            <span className="badge badge-primary badge-pill">{props.orderDetail.ingredients.Cheese}</span>
                        </li>
                        : null
                    }
                    </ul>
                    
                    <p className="text-secondary" style={{color:"#1C2833",marginTop:"15px"}}>
                    <i style={{size:"35px",marginRight:"5px"}} className='far fa-address-card'  ></i>
                         <strong> Delivered To :</strong></p>
                    {
                        props.orderDetail.address!==undefined ?
                        <div className="border border-info" style={{color:"#5D6D7E",borderRadius:"5px",padding:"15px"}}>
                            
                    <p style={{textAlign:"right"}} >{props.orderDetail.address.street}</p>
                    <p style={{textAlign:"right"}} >{props.orderDetail.address.city}</p>
                    <p style={{textAlign:"right"}} >{props.orderDetail.address.state}</p>
                    <p style={{textAlign:"right"}} >{props.orderDetail.address.zipCode}</p> 
                    </div>
                    :null
                    }
                    <Button  btnClassName="btn btn-danger" btnName="Less" btnClick={shrinkOrder}/>
                </div>
                :
                <Button  btnClassName="btn btn-success" btnName="More" btnClick={expandOrder}/>
                
                }
                <p>Total Amount Paid : <strong>Rs {props.orderDetail.totalPrice} /-</strong></p>
                        <p>Payment Method : <strong> {props.orderDetail.paymentMethod} </strong></p>
            </div>
        )
    }


export default Order;