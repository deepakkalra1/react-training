import axios from "axios"
const baseURL = "https://burger-application-48baa.firebaseio.com/"


const actionType=require("./actionsType")
//Async actions can be done here

 const setInititialIngredienstAction = (verifyErrorOccur)=>{
    
    return (dispatch,getState)=>{
        axios.get(baseURL+ "ingredients.json")
    .then(res=>{
        let oldObj = actionType.setInitialIngredientsActionType()
        dispatch({...oldObj, value:res.data})
    })
    .catch(error=>{  
            verifyErrorOccur(error)
    })   
    }
}


const setTotalPriceAction = (total)=>{
    return (dispatch)=>{
          let oldObj=actionType.setNewTotalPriceActionType();
            dispatch({...oldObj,value:total})
    }
}


const addIngredientAction = (name)=>{
    return (dispatch)=>{
          let oldObj=actionType.addIngredientActionType();
            dispatch({...oldObj,value:name})
    }
}

const removeIngredientAction = (name)=>{
    
    return (dispatch)=>{
          let oldObj=actionType.removeIngredientActionType();
            dispatch({...oldObj,value:name})
    }
}


export  {
    setInititialIngredienstAction,
    setTotalPriceAction,
    addIngredientAction,
    removeIngredientAction
};