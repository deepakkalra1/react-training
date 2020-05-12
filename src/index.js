import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from "react-redux"
import {createStore,combineReducers,applyMiddleware,compose} from "redux"
import burgerBuilderReducer from "./store/BurgerBuilderReducer"
import {BrowserRouter} from "react-router-dom"


// const rootReducer = combineReducers({
//   burgerBuilder:burgerBuilderReducer
// })

const testMiddleware  =(store)=>{
  return (next)=>{ 
    return (action)=>{
      console.log(store.getState())
    }
   }

}

const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(burgerBuilderReducer,composeEnhancer( applyMiddleware(testMiddleware)) )


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
  <App />

  </BrowserRouter>
   </Provider>,
  document.getElementById('root')
);
