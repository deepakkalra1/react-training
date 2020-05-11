import React , {Component} from "react";
import DataBlock from "../DataBlock/DataBlock"
import BurgerBuilder from "../../container/BurgerBuilder/BurgerBuilder"
import Toolbar from "./Toolbar/Toolbar"
import Sidedrawer from "../SideDrawer/Sidedrawer"
import Backdrop from "../Backdrop/Backdrop"
import Orders from "../../container/Orders/Orders"
import PageNotFound from "../../component/NotFound/PageNotFound"
import {Route,Switch, Redirect} from "react-router-dom"

const layoutCss = {
    
marginTop:"6vh"
}
class Layout extends Component{
    state = {
        menuStatus:false
    }

    openMenu=()=>{
        this.setState(()=>{
            return {menuStatus:true }
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
                    this.state.menuStatus?<React.Fragment> <Sidedrawer menuStatus={this.state.menuStatus} /><Backdrop backdropClick={this.closeMenu} /></React.Fragment> : null
                }
                <Toolbar  openMenu={this.openMenu}/>
                <DataBlock>

                    <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/my-orders" exact component={Orders} />
                    <Route path="/page-not-found" component={PageNotFound} />
                    <Redirect  to="/page-not-found" />
                    </Switch>
                
                </DataBlock>

            </div>
        )
    }

}

export default Layout;