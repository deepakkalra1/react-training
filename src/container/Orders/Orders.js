import React from "react"
import classes from "./Orders.module.css"
import Order from "./Order/Order"
import Spinner from "../../component/spinner/Spinner"
import axios from "../BurgerBuilder/axios"
import {connect} from "react-redux"

class Orders extends React.Component{

    state={
        orders:null,
        orderBeginCountNumber:0,
        pagePointer:1,
        firstPageNumber:1,
        secondPageNumber:2,
        thirdPageNumber:3,
        innerNavorderBeginCountNumber:0
    }



    //----------------------------------------------->
    static getDerivedStateFromProps(){
        return{}
    }


    //----------------------------------------------->
    componentDidMount(){


        if(this.props.authenticated){
        axios.get("/order.json?auth="+this.props.authToken +`&orderBy="userId"&equalTo="`+this.props.userId+`"`)
        .then(response=>{
                this.setState({orders:response.data})
        })
        .catch(error=>{

        })
    }
    
    }


    //----------------------------------------------->
    populateOrders=()=>{
        let ordersArr=[]

        let keys= Object.keys(this.state.orders)
        
        for(let i=this.state.innerNavorderBeginCountNumber; i<this.state.innerNavorderBeginCountNumber+10;i++){
            
            if(this.state.orders[keys[i]]!==undefined){
                let obj = this.state.orders[keys[i]]
                
            ordersArr.push(<Order no={i}
                orderDetail= {obj} 
                />)
            }
            
            
        }

        return ordersArr;
    }
    

    //----------------------------------------------->
    onNextClickHandler=()=>{
        if(Object.keys(this.state.orders).length > this.state.orderBeginCountNumber+30){

        
        this.setState(prevState=>{
            return {orderBeginCountNumber: prevState.orderBeginCountNumber+30,
                firstPageNumber:prevState.firstPageNumber+3,
                secondPageNumber:prevState.secondPageNumber+3,
                thirdPageNumber:prevState.thirdPageNumber+3,
                pagePointer:1,
                innerNavorderBeginCountNumber:prevState.orderBeginCountNumber+30
            }
        })
    }
    }


    //----------------------------------------------->
    onPreviousClickHandler=()=>{
        if(this.state.orderBeginCountNumber!==0 && this.state.orderBeginCountNumber-30>=0){
            // if(this.state.pagePointer==3){

            //     this.setState(prevState=>{
            //         return {orderBeginCountNumber: prevState.orderBeginCountNumber-10,
                       
            //             pagePointer:2
            //         }
            //     })


            // }
            // else if(this.state.pagePointer==2){
            //     this.setState(prevState=>{
            //         return {orderBeginCountNumber: prevState.orderBeginCountNumber-10,
                       
            //             pagePointer:1
            //         }
            //     })

            // }else{

                this.setState(prevState=>{
                    return {orderBeginCountNumber: prevState.orderBeginCountNumber-30,
                        firstPageNumber:prevState.firstPageNumber-3,
                        secondPageNumber:prevState.secondPageNumber-3,
                        thirdPageNumber:prevState.thirdPageNumber-3,
                        pagePointer:1,
                        innerNavorderBeginCountNumber:prevState.orderBeginCountNumber-30
                    }
                })

            
        
        
    }
    }


    //----------------------------------------------->
    onFirstNavBtnClickHandler=()=>{

         if(this.state.pagePointer===2){
            this.setState((prevState)=>{
                return {innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber-10,pagePointer:1}

            })

        }
        else if(this.state.pagePointer===3){
            this.setState((prevState)=>{
                return {innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber-20,pagePointer:1}

            })

        }

    }


    //----------------------------------------------->
    onSecondNavBtnClickHandler=()=>{

        if(this.state.pagePointer===1){
           this.setState((prevState)=>{
               return {innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber+10,pagePointer:2}

           })

       }
       else if(this.state.pagePointer===3){
           this.setState((prevState)=>{
               return {innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber-10,pagePointer:2}

           })

       }

   }


   //----------------------------------------------->
   onThirdNavBtnClickHandler=()=>{

    if(this.state.pagePointer===2){
       this.setState((prevState)=>{
           return {innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber+10,pagePointer:3}

       })

   }
   else if(this.state.pagePointer===1){
       this.setState((prevState)=>{
           return {innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber+20,pagePointer:3}

       })

   }

}



    //----------------------------------------------->
    render(){
        return(
            <div className={classes.OrdersContainer}>
                
                   
           {this.state.orders? this.populateOrders() :
           <Spinner style={{position:"fixed",left:"0px",right:"0px",top:"0px",bottom:"0px",margin:"auto",zIndex:"160"}} />
           }
           <div style={{display:"flex",justifyContent:"center"}} className="pagination">
                    {
                        this.state.orderBeginCountNumber===0?<div  class="page-item"><p style={{background:"darkgray", color:"white"}} disabled={true} class="page-link">previous</p></div>
                        : <div className="page-item"><p onClick={this.onPreviousClickHandler} class="page-link">previous</p></div>
                    }
                
                <div className="page-item"><p onClick={this.onFirstNavBtnClickHandler} style={this.state.pagePointer===1?{background:"#0275d8",color:"white"}:null }  className="page-link">{this.state.firstPageNumber}</p></div>
                <div className="page-item"><p onClick={this.onSecondNavBtnClickHandler} style={this.state.pagePointer===2?{background:"#0275d8",color:"white"}:null } className="page-link">{this.state.secondPageNumber}</p></div>
                <div className="page-item"><p onClick={this.onThirdNavBtnClickHandler} style={this.state.pagePointer===3?{background:"#0275d8",color:"white"}:null } className="page-link">{this.state.thirdPageNumber }</p></div>
                
                {
                    this.state.orders ?
                    Object.keys(this.state.orders).length > this.state.orderBeginCountNumber+30 ?
                    <div className="page-item"><p onClick={this.onNextClickHandler} class="page-link">next</p></div>
                    : <div className="page-item"><p style={{background:"darkgray",color:"white"}} disabled={true} class="page-link">next</p></div>

                    :null
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        authenticated:state.authReducer.authenticated,
        username:state.authReducer.username,
        authToken:state.authReducer.authToken,
        userId:state.authReducer.userId
    }
}

const mapDispatchToProps=(state)=>{
    return{

    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Orders);