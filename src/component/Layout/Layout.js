import React , {Component} from "react";
import DataBlock from "../DataBlock/DataBlock"
import BurgerBuilder from "../../container/BurgerBuilder/BurgerBuilder"
import Toolbar from "./Toolbar/Toolbar"
import Sidedrawer from "../SideDrawer/Sidedrawer"
import Backdrop from "../Backdrop/Backdrop"

const layoutCss = {
    position: "fixed",
  height: "94vh",
  top: "6vh",
  width: "100vw"
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
                    <BurgerBuilder />
                </DataBlock>

            </div>
        )
    }

}

export default Layout;