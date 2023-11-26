"use client"
import React, { useContext, useEffect } from 'react'
import { Authorization } from './hooks'
import LoginScreen from "./login/page"
import Dashboard from './components/page'

const page = () => {
    const {userState,setUserState}=useContext(Authorization)

    const getState=()=>{
        const s=localStorage.getItem("userState");
        if(s){
            setUserState(true)
        }
    }

    useEffect(()=>{
        getState()
    },[])
    
  return (
    <>
        {userState?(<Dashboard />):(<LoginScreen />)}
    </>
  )
}

export default page