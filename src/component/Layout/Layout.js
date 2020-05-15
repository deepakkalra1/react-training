import React , {Component} from "react";
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

const actions = require("../../actions/actions")
const layoutCss = {
marginTop:"6vh"
}
class Layout extends Component{

    static getDerivedStateFromProps(){
        return {}
    }

    componentDidMount(){

        let authDetail = localStorage.getItem("authDetail")
        if(authDetail!==null){
            authDetail =JSON.parse(authDetail)
         this.props.setUserAuthDetails(authDetail)   
        }

    }


    state = {
        menuStatus:false,
        auth:false,
        menuAuth:false
    }

    openMenu=()=>{
        this.setState(()=>{
            return {menuStatus:true }
        })
    }

    toggleAuthPage=()=>{
        
        this.setState(prevState=>{
            return{auth:!prevState.auth}
        })
    }

    toggleAuthInMenuState=()=>{
        this.closeMenu()
        
        this.setState(prevState=>{
            return{menuAuth:!prevState.menuAuth}
        })
    }

    closeMenu=()=>{
        this.setState(()=>{
            return {menuStatus:false }
        })
    }

    render(){
        return(
            <div style={layoutCss}>
                {
                    this.state.menuStatus?<React.Fragment> <Sidedrawer mobileView={this.state.menuStatus} closeMenu={this.closeMenu}    toggleAuthPage={this.toggleAuthInMenuState} /><Backdrop backdropClick={this.closeMenu} /></React.Fragment> : null
                }
                <Toolbar  auth={this.state.auth} toggleAuthPage={this.toggleAuthPage}  openMenu={this.openMenu}/>
                {
                    this.state.menuAuth?<React.Fragment> <Backdrop backdropClick={this.toggleAuthInMenuState} /> <Auth toggleAuthPage={this.toggleAuthInMenuState}  /> </React.Fragment>:null
                }
                <DataBlock>
                    
                    <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                   
                   {
                       this.props.authenticated?<Route path="/my-orders" exact component={Orders} />
                    : <Route path="/my-orders" exact component={PageNotFound} />
                   }
                    
                    <Route path="/page-not-found" component={PageNotFound} />
                    
                    <Redirect  to="/page-not-found" />
                    </Switch>
                
                </DataBlock>

            </div>
        )
    }

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