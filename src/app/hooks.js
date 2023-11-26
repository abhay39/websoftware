"use client"
import { createContext, useState } from "react";

const Authorization=createContext({});

const AuthorizationProvider=({children})=>{
    const [userState,setUserState]=useState(false);
    const [userDetails,setUserDetails]=useState("")
    const URL="https://upworksss.vercel.app"

    return(
        <Authorization.Provider value={{
            userState,
            setUserState,
            userDetails,
            setUserDetails,
            URL
        }}>
            {children}
        </Authorization.Provider>
    )
}

export {Authorization,AuthorizationProvider}