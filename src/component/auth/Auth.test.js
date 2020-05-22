import React from "react"
import Adapter from "enzyme-adapter-react-16"
import {configure,shallow} from "enzyme"
import Auth from "./Auth"
import Signin from "./signin/Signin"
import Signup from "./signup/Signup"

configure({adapter:new Adapter()})

describe("<Auth />",()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<Auth />)
    })

    it("checks whether signin or signup comes on true or false",()=>{
        wrapper.setState({authToggle:true})
        expect(wrapper.find(Signin)).toHaveLength(1)
    })

it("checks whether signin or signup comes on true or false",()=>{
    wrapper.setState({authToggle:false})
    expect(wrapper.find(Signup)).toHaveLength(1)
})
})