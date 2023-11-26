"use client"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { Authorization } from '../hooks';


const SignUp = () => {

    const route=useRouter();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {userState,URL,setUserState}=useContext(Authorization)

    const handleSignIn = async() => {
        try{
          let res=await fetch(`${URL}/api/login`,{
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
          if(status==202){
            toast.success(res.message)
            localStorage.setItem("token",res.token)
            setTimeout(()=>{
                setUserState(true);
                route.push("/")
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
        <h1 className='font-bold text-3xl '>Login</h1>
        <ToastContainer />

        <div className='bg-[#05313d] p-3 rounded-md mt-2'>


            <div>
                <label htmlFor="" className='font-bold text-white'>Email</label>
                <br />
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email id' className='bg-slate-300 p-3 rounded-md' />
            </div>

            <div>
                <label htmlFor="" className='font-bold text-white'>Password</label>
                <br />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password' className='bg-slate-300 p-3 rounded-md' />
            </div>


            <div className='mt-2'>
                <button onClick={handleSignIn} className='bg-green-800 p-3 w-full text-2xl font-bold text-white rounded-md'>Register</button>
            </div>

            <div className='mt-2 mb-2'>
                <label htmlFor="" className='font-bold text-white'>Already have an account?<Link href="/" className='text-red-400'>login</Link></label>
            </div>

        </div>

    </div>
  )
}

export default SignUp