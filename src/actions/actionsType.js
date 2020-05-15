import axios from "axios";

let actionsName =require("./actionsName")

const setInitialIngredientsActionType = ()=>{
    return{
        type:actionsName.SET_INITIAL_INGREDIENTS
    }
}

const setNewTotalPriceActionType = ()=>{
    return{
        type:actionsName.SET_NEW_TOTAL_PRICE
    }
}

const addIngredientActionType = ()=>{
    return{
        type:actionsName.ADD_INGREDIENT
    }
}


const removeIngredientActionType = ()=>{
    return{
        type:actionsName.REMOVE_INGREDIENT
    }
}

const setUserAuthDetailsActionType = ()=>{
    return{
        type:actionsName.SET_USER_AUTH
    }
}

const logoutUserActionType = ()=>{
    return{
        type:actionsName.LOGOUT
    }
}






export {
    setInitialIngredientsActionType,
    setNewTotalPriceActionType,
    addIngredientActionType,
    removeIngredientActionType,
    setUserAuthDetailsActionType,
    logoutUserActionType
    
}