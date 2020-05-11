import React, { Component } from 'react';
import classes from './App.module.css';
import Layout from "./component/Layout/Layout"
import {BrowserRouter} from "react-router-dom"


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className={classes.App}>

      <Layout />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
