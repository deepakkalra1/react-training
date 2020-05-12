import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from "react-redux"
import {createStore,combineReducers,applyMiddleware,compose} from "redux"
import burgerBuilderReducer from "./store/BurgerBuilderReducer"
import {BrowserRouter} from "react-router-dom"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  burgerBuilder:burgerBuilderReducer
})

// const testMiddleware  =(store)=>{
//   return (next)=>{ 
//     return (action)=>{
//       console.log(store.getState())
//       next(action)
//     }
//    }

// }

const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancer( applyMiddleware(thunk)) )


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
  <App />

  </BrowserRouter>
   </Provider>,
  document.getElementById('root')
);
