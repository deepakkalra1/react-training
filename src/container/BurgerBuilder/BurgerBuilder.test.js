import React from "react"
import Adapter from "enzyme-adapter-react-16"
import {configure,shallow} from "enzyme"
import {BurgerBuilder} from "./BurgerBuilder"
import Alert from "../../component/alert/Alert"
import Spinner from "../../component/spinner/Spinner"
import OrderSummary from "../../component/OrderSummary/OrderSummary"
import BurgerPrice from "../../component/BurgerPrice/BurgerPrice" 
import IngredientsController from "../../component/IngredientController/IngredientController"
configure({adapter:new Adapter()})


describe("<Burger Builder />",()=>{
let wrapper;

beforeEach(()=>{
    wrapper = shallow(<BurgerBuilder setInitialIngredients={()=> " " } />)
})

it("checks for alert component existence on alert state being true",()=>{
    wrapper.setState({alert:true})
    expect(wrapper.find(Alert)).toHaveLength(1)

})

it("checks for alert on order successfuly placed",()=>{
    wrapper.setState({orderInPlace:2})
    expect(wrapper.find(Alert)).toHaveLength(1)
})

it("checks for order summary pop up on order now button clicked",()=>{
    wrapper.setState({orderNowClickedStatus:true})
    expect(wrapper.find(OrderSummary)).toHaveLength(1)
})


it("checks that burger price component exist",()=>{

    expect(wrapper.find(BurgerPrice)).toHaveLength(1)
})



it("checks that burger ingredients controller only can be seen when it has prop of ingredients",()=>{
    wrapper.setProps({ingredients:{}})
    expect(wrapper.find(IngredientsController)).toHaveLength(1)
})


})