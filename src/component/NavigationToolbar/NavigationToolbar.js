import React from "react"
import {NavLink} from "react-router-dom"
import classes from "./NavigationToolbar.module.css";

class NavigationToolbar extends React.Component{
    render()
    {
        return(
            <div className={classes.NavOfToolbarContainer}>
                   <p> <NavLink  activeClassName={classes.ActiveNav} exact to="/">Build Burger</NavLink></p>
                   <p>    <NavLink  activeClassName={classes.ActiveNav} exact to="/my-orders">My Orders</NavLink></p>
            </div>
        )
    }
}
export default NavigationToolbar;