let initialState = {
    test:"working"
}

const burgerBuilderReducer = (state=initialState,action)=>{

        switch(action.type){
            case 'SET_INITIAL_INGREDIENTS':
                
                return {...state};
                
            default :
            return {...state};
        }

}

export default burgerBuilderReducer;