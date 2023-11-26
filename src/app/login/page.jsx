"use client"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { Authorization } from '../hooks';


const LoginScreen = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {userState,URL,setUserState}=useContext(Authorization)

    const handleSignIn = async() => {
        try{
          let res=await fetch(`${URL}/api/checkAdminLogin`,{
            method: 'POST',
            headers:{
              'content-type': 'application/json',
            },
            body:JSON.stringify({
              email:email,
              password:password,
            })
          })
          const status = res.status;
          res= await res.json();
          console.log(res)
          if(status==200){
            localStorage.setItem("token",res.token)
            setTimeout(()=>{
                setUserState(true);
            },3000)
          }else{
            toast.error(res.message)
          }
        }catch(err){
          console.log("Error: " + err.message)
        }
    }

  return (
    <div  className='flex dark:text-black flex-col items-center justify-center h-[100vh] p-6'>
        <h1 className='font-semibold text-3xl text-[#8BB862]'>Login</h1>

        <div className=' p-3 rounded-md mt-2 text-[12px]'>
            <div>
                <label htmlFor="" className='font-bold text-[#5D5D5D]'>Email</label>
                <br />
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email id' className='bg-[#EBEBEB] p-3 rounded-md md:w-[230px]' />
            </div>

            <div>
                <label htmlFor="" className='font-bold text-[#5D5D5D]'>Password</label>
                <br />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password' className='bg-[#EBEBEB] md:w-[230px] p-3 rounded-md' />
            </div>

            <div>
                <label htmlFor="" className='font-bold text-[#5D5D5D]'>Forgot Password?</label>
            </div>

            <div className='mt-2'>
                <button onClick={handleSignIn} className='bg-[#8BB862] p-3 w-full text-xl font-bold text-white rounded-md'>Login</button>
            </div>
        </div>

    </div>
  )
}

export default LoginScreen