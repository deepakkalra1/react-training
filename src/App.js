import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Item from "./Item/Item";
import './App.css';

class App extends Component {
    count=0;

  onSubmitClick=(e)=>{
  
    this.count++;
    let str=document.getElementById("data").value;
    let [name,quantity]=str.split("-");
    document.getElementById("here").insertAdjacentHTML("beforeend",`<div id="item_${this.count}"></div>`)
    ReactDOM.render(<Item countNo={this.count} name={name} quantity={quantity}/>,document.getElementById(`item_${this.count}`))

  }

  onPressEnter = (e)=>{
    if(e.key=="Enter"){
    this.onSubmitClick();
  }
  }

  render() {
    return (
      <div className="App" id="appid">
        <input onKeyDown={this.onPressEnter} id="data" type="text" placeholder="name-quantity"/>
        <button className="btn btn-primary" onClick={this.onSubmitClick} type="button" >Submit</button>
        <div id="here">
        
        </div>
      </div>
      
    );
  }
}

export default App;
