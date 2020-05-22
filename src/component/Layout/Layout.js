import React ,  {useState, useEffect,useMemo,useCallback} from "react";
import DataBlock from "../DataBlock/DataBlock"
import BurgerBuilder from "../../container/BurgerBuilder/BurgerBuilder"
import Toolbar from "./Toolbar/Toolbar"
import Sidedrawer from "../SideDrawer/Sidedrawer"
import Backdrop from "../Backdrop/Backdrop"
import Orders from "../../container/Orders/Orders"
import PageNotFound from "../../component/NotFound/PageNotFound"
import {Route,Switch, Redirect} from "react-router-dom"
import Auth from "../auth/Auth"
import {connect} from "react-redux"
import {LayoutContext} from "./LayoutContext"
const actions = require("../../actions/actions")


const layoutCss = {
marginTop:"6vh"
}


export const Layout= (props)=> {

    useEffect(()=>{
        
        let authDetail = localStorage.getItem("authDetail")
        if(authDetail!==null){
            authDetail =JSON.parse(authDetail)
         props.setUserAuthDetails(authDetail)   
        }

    },[])


    const [state,setState] = useState({
        menuStatus:false,
        menuAnimationName:"menuSwipeOut",
        auth:false,
        menuAuth:false
    })



    //----------------------------------------------->
    const openMenu=()=>{
        
        setState((prevState)=>{
            return {...prevState, menuStatus:true }
        })
    }



    //----------------------------------------------->
    const toggleAuthPage= useCallback( ()=>{
        
        setState(prevState=>{
            return{...prevState, auth:!prevState.auth}
        })
    },[state.auth])



    //----------------------------------------------->
    const toggleAuthInMenuState=()=>{
        closeMenu()
        
        setState(prevState=>{
            return {...prevState, menuAuth:!prevState.menuAuth}
        })
    }



    //----------------------------------------------->
    const closeMenu=()=>{
        setState((prevState)=>{
            return  {...prevState, menuStatus:false }
        })
    }


    //------------------------------------------------->
    const renderToolbar=useMemo(()=>{
        
        return <Toolbar toggleAuthPage={toggleAuthPage}  />
    },[toggleAuthPage])


    //----------------------------------------------->
    
        return(
            <LayoutContext.Provider value={{mobileView:state.menuStatus,
                closeMenu:closeMenu,
                auth:state.auth,
                openMenu:openMenu
            }} >
              
            <div style={layoutCss}>
                {
                    state.menuStatus?<React.Fragment> <Sidedrawer myStyle={{backround:"yellow"}}  toggleAuthPage={toggleAuthInMenuState} /><Backdrop backdropClick={closeMenu} /></React.Fragment> : null
                }
            
                {
                    renderToolbar
                }
                {
                    state.menuAuth?<React.Fragment> <Backdrop backdropClick={toggleAuthInMenuState} /> <Auth toggleAuthPage={toggleAuthInMenuState}  /> </React.Fragment>:null
                }
                <DataBlock>
                    
                    <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                   
                   {
                       props.authenticated?<Route path="/my-orders" exact component={Orders} />
                    : <Route path="/my-orders" exact component={PageNotFound} />
                   }
                    
                    <Route path="/page-not-found" component={PageNotFound} />
                    
                    <Redirect  to="/page-not-found" />
                    </Switch>
                
                </DataBlock>

            </div>
            </LayoutContext.Provider>
        )
    }



const mapStateToProps = (state)=>{
    
    return{
        authenticated:state.authReducer.authenticated,
        
}
}

const mapDispatchToProps = (dispatch)=>{
    return{
     setUserAuthDetails:(authDetail)=> dispatch(actions.setUserAuthDetailsAction(authDetail)),
    
   
}
}


export default connect(mapStateToProps,mapDispatchToProps) (Layout);