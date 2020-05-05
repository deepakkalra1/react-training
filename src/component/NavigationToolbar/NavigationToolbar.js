import React from "react"
import classes from "./NavigationToolbar.module.css";

class NavigationToolbar extends React.Component{
    render()
    {
        return(
            <div className={classes.NavOfToolbarContainer}>
                    <p>Build Burger</p>
                    <p>Checkout</p>
            </div>
        )
    }
}
export default NavigationToolbar;