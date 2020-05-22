let initialState = {
    ingredients:null,
    price:{
        BreadTop:0,
        Salad:10,
        Bacon:30,
        Cheese:80,
        Meat:100,
        BreadBottom:0
    },
    totalPrice:0
}



const burgerBuilderReducer = (state=initialState,action)=>{
        let oldObj={}
        switch(action.type){
            case "SET_INITIAL_INGREDIENTS":
                return {...state,ingredients:action.value};
                

            case "SET_NEW_TOTAL_PRICE":
                 return {...state,totalPrice:action.value};

             case "ADD_INGREDIENT":
                  oldObj={...state}
                 oldObj.ingredients[action.value]+=1;
                return oldObj;
                
                case "REMOVE_INGREDIENT":
                     oldObj={...state}
                    
                        oldObj.ingredients[action.value]-=1;
                 
                    return oldObj
                    
                 
             
            default :
            return {...state};
        }

}

export default burgerBuilderReducer;