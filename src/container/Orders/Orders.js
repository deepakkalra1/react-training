import React,{useEffect,useState} from "react"
import classes from "./Orders.module.css"
import Order from "./Order/Order"
import Spinner from "../../component/spinner/Spinner"
import axios from "../BurgerBuilder/axios"
import {connect} from "react-redux"

const Orders=(props)=> {
    const [state,setState] = useState({
        orders:null,
        orderBeginCountNumber:0,
        pagePointer:1,
        firstPageNumber:1,
        secondPageNumber:2,
        thirdPageNumber:3,
        innerNavorderBeginCountNumber:0
    })


    //----------------------------------------------->
    useEffect(()=>{

        if(props.authenticated){
            axios.get("/order.json?auth="+props.authToken +`&orderBy="userId"&equalTo="`+props.userId+`"`)
            .then(response=>{
                    setState(prevState=> { return{...prevState, orders:response.data}})
            })
            .catch(error=>{
            })
        }
    },[])



    //----------------------------------------------->
    const populateOrders=()=>{
        let ordersArr=[]

        let keys= Object.keys(state.orders)
        
        for(let i=state.innerNavorderBeginCountNumber; i<state.innerNavorderBeginCountNumber+10;i++){
            
            if(state.orders[keys[i]]!==undefined){
                let obj = state.orders[keys[i]]    
            ordersArr.push(<Order no={i}
                orderDetail= {obj} 
                key={Math.random()}
                />)
            }   
        }
        return ordersArr;
    }
    

    //----------------------------------------------->
    const onNextClickHandler=()=>{
        if(Object.keys(state.orders).length > state.orderBeginCountNumber+30){

        
        setState(prevState=>{
            return {...prevState, orderBeginCountNumber: prevState.orderBeginCountNumber+30,
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
   const  onPreviousClickHandler=()=>{
        if(state.orderBeginCountNumber!==0 && state.orderBeginCountNumber-30>=0){
                setState(prevState=>{
                    return {...prevState, orderBeginCountNumber: prevState.orderBeginCountNumber-30,
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
   const onFirstNavBtnClickHandler=()=>{

         if(state.pagePointer===2){
            setState((prevState)=>{
                return {...prevState, innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber-10,pagePointer:1}

            })

        }
        else if(state.pagePointer===3){
            setState((prevState)=>{
                return {...prevState, innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber-20,pagePointer:1}
            })
        }
    }


    //----------------------------------------------->
    const onSecondNavBtnClickHandler=()=>{
        if(state.pagePointer===1){
           setState((prevState)=>{
               return {...prevState, innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber+10,pagePointer:2}
           })

       }
       else if(state.pagePointer===3){
           setState((prevState)=>{
               return {...prevState, innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber-10,pagePointer:2}
           })
       }
   }


   //----------------------------------------------->
  const onThirdNavBtnClickHandler=()=>{
    if(state.pagePointer===2){
       setState((prevState)=>{
           return {...prevState, innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber+10,pagePointer:3}
       })
   }
   else if(state.pagePointer===1){
       setState((prevState)=>{
           return {...prevState, innerNavorderBeginCountNumber:prevState.innerNavorderBeginCountNumber+20,pagePointer:3}
       })
   }
}



    //----------------------------------------------->
        return(
            <div className={classes.OrdersContainer}>       
           {state.orders? populateOrders() :
           <Spinner style={{position:"fixed",left:"0px",right:"0px",top:"0px",bottom:"0px",margin:"auto",zIndex:"160"}} />
           }
           <div style={{display:"flex",justifyContent:"center"}} className="pagination">
                    {
                        state.orderBeginCountNumber===0?<div  className="page-item"><p style={{background:"darkgray", color:"white"}} disabled={true} className="page-link">previous</p></div>
                        : <div className="page-item"><p onClick={onPreviousClickHandler} className="page-link">previous</p></div>
                    }
                
                <div className="page-item"><p onClick={onFirstNavBtnClickHandler} style={state.pagePointer===1?{background:"#0275d8",color:"white"}:null }  className="page-link">{state.firstPageNumber}</p></div>
                <div className="page-item"><p onClick={onSecondNavBtnClickHandler} style={state.pagePointer===2?{background:"#0275d8",color:"white"}:null } className="page-link">{state.secondPageNumber}</p></div>
                <div className="page-item"><p onClick={onThirdNavBtnClickHandler} style={state.pagePointer===3?{background:"#0275d8",color:"white"}:null } className="page-link">{state.thirdPageNumber }</p></div>
                
                {
                    state.orders ?
                    Object.keys(state.orders).length > state.orderBeginCountNumber+30 ?
                    <div className="page-item"><p onClick={onNextClickHandler} class="page-link">next</p></div>
                    : <div className="page-item"><p style={{background:"darkgray",color:"white"}} disabled={true} className="page-link">next</p></div>

                    :null
                }
                </div>
            </div>
        )
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