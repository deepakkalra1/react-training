import React from "react"
import Adapter from "enzyme-adapter-react-16"
import {configure,shallow} from "enzyme"
import {Layout} from "./Layout"
import Sidedrawer from "../SideDrawer/Sidedrawer"
configure({adapter:new Adapter()})


describe("<Layout />",()=>{
    let wrapper;
    beforeEach(()=>{
            wrapper = shallow(<Layout />)
    })
    it("checks for menu visibility on hammburger clicked which update menuState",()=>{
        wrapper.setState({menuStatus:true})
        expect(wrapper.find(Sidedrawer)).toHaveLength(1)
    })
})