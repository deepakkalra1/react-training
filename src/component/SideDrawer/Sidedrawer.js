import React from "react"
import classes from "./Sidedrawer.module.css"
import Logo from "../Logo/Logo"
import Navigation from "../NavigationToolbar/NavigationToolbar"

class Sidedrawer extends React.Component{
    render(){
        return(
            <div  className={classes.SidedrawerContainer }>
                
                <div className={classes.SidedrawerContent}>
                <Logo />
                <p className={classes.Heading}>Burger'O'Builder</p>
                <Navigation />
            </div>
            </div>
        )
    }
}
export default Sidedrawer;