const actionName = require("../actions/actionsName")
const initialState = {
    authenticated:false,
    authToken:null,
    refreshToken:null,
    username:null,
    userId:null
}

const authReducer=(state=initialState,action)=>{
    let oldObj;

    switch(action.type){
        case actionName.SET_USER_AUTH:  //--------------------------->
        oldObj = {...state}
        oldObj.authenticated=true;
        oldObj.authToken=action.value.authToken;
        oldObj.username=action.value.username;
        oldObj.refreshToken=action.value.refreshToken
        oldObj.userId=action.value.userId
        return oldObj;
        


        case actionName.LOGOUT:  //--------------------------->
            oldObj = {...state}
            oldObj.authenticated=false
            oldObj.authToken=null
            oldObj.refreshToken=null
            oldObj.username=null
            return oldObj;



        



        default:
            return {...state}
    }
}

export default authReducer;