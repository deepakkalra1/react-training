import React from "react"
import Adapter from "enzyme-adapter-react-16"
import {configure,shallow} from "enzyme"
import authReducer from "./Auth"
configure({adapter:new Adapter()})


describe("auth Reducer",()=>{

    it("checks auth reducer setting auth details",()=>{
        
        expect(authReducer(
            {
                authenticated:false,
            authToken:null,
            refreshToken:null,
            username:null,
            userId:null
            }
            ,{type:"SET_USER_AUTH",value:{
                authToken:"abc",
                username:"deepak",
                refreshToken:"abc",
                userId:"1"
            }})).toEqual({
            authenticated:true,
            authToken:"abc",
            refreshToken:"abc",
            username:"deepak",
            userId:"1"
        })
    })
})
