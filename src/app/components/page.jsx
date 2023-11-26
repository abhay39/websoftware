"use client"
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { GoPlusCircle  } from "react-icons/go";
import logo from "../logo.png";
import { PiFlowerTulip } from "react-icons/pi";
import { PiUsersThree,PiUserSwitchLight } from "react-icons/pi";
import CreateSale from './CreateSale';
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Authorization } from '../hooks';
import AddNewUser from './AddNewUser';
import TotalUsers from './TotalUsers';
import ProfileSetting from './ProfileSetting';
import { Quicksand } from 'next/font/google';
import TotalOrders from './TotalOrders';

const quicksand=Quicksand({
    display:'swap',
    subsets:['latin'],
    weight: '700',
})
const quicksand1=Quicksand({
    display:'swap',
    subsets:['latin'],
    weight: '600',
})



const Dashboard = () => {

  const [isActive,setIsActive]=useState("create");
  const {userState,URL,setUserState}=useContext(Authorization)

  useEffect(()=>{
    localStorage.setItem("userState",JSON.stringify(userState));
  },[userState])

  return (
    <div className='bg-white md:flex  p-3 text-[11px]'>
      <div className={`${quicksand1.className} md:w-1/5`}>
        
        <div className='flex items-center justify-center'>
          <Image src={logo} height={300} width={300} alt="logo" className='w-32 h-16' />
        </div>

        {/* all list  */}
        <div className='mt-3'>
          <h1 className={`font-bold text-2xl mb-3 text-[#8BB862] ${quicksand.className}`}>SALES</h1>
          <hr className='border-t-2 border-gray-400 mb-2'/>


          <div className={`${isActive ==="create"?"bg-[#8BB862]":"bg-white"} ${isActive ==="create"?"text-white":"text-black"} p-2 rounded-md flex items-center cursor-pointer mb-3`} onClick={()=>setIsActive("create")}>
            <GoPlusCircle  size={18}  />
            <h3 className='ml-3'>Create a sale</h3>
          </div>

          <div className={`${isActive ==="orders"?"bg-[#8BB862]":"bg-white"} ${isActive ==="orders"?"text-white":"text-black"} p-2 rounded-md flex items-center cursor-pointer mb-3`} onClick={()=>setIsActive("orders")}>
          <PiFlowerTulip  size={18}  />
            <h3 className='ml-3'>See all orders</h3>
          </div>

          <h1 className={`font-bold text-2xl mb-3 text-[#8BB862] ${quicksand.className}`}>ADMIN PANNEL</h1>
          <hr className='border-t-2 border-gray-400 mb-2'/>


          <div className={`${isActive ==="user"?"bg-[#8BB862]":"bg-white"} ${isActive ==="user"?"text-white":"text-black"} p-2 rounded-md flex items-center cursor-pointer mb-3`} onClick={()=>setIsActive("user")}>
            <PiUserSwitchLight  size={18}  />
            <h3 className='ml-3'>Add a user</h3>
          </div>

          <div className={`${isActive ==="usersAll"?"bg-[#8BB862]":"bg-white"} ${isActive ==="usersAll"?"text-white":"text-black"} p-2 rounded-md flex items-center cursor-pointer mb-3`} onClick={()=>setIsActive("usersAll")}>
            <PiUsersThree  size={18}  />
            <h3 className='ml-3'>See all users</h3>
          </div>
        </div>

        <div className='md:absolute bottom-2 md:w-1/5'>
          <div className={`${isActive ==="profile"?"bg-[#8BB862]":"bg-white"} ${isActive ==="profile"?"text-white":"text-black"} p-2 rounded-md flex items-center cursor-pointer mb-3`} onClick={()=>setIsActive("profile")}>
            <FaRegUser  size={18}  />
            <h3 className='ml-3'>Profile Setting</h3>
          </div>
          <div  className={`bg-red-500 text-white p-2 rounded-md flex items-center cursor-pointer mb-3`} onClick={()=>{localStorage.clear() 
            setUserState(false)}
          }>
            <CiLogout   size={18}  />
            <h3 className='ml-3'>LOG OUT</h3>
          </div>
        </div>

      </div>

      {/* right side */}
      <div className='p-3 ml-4 w-4/5'>
        {isActive==="create"?(<CreateSale />):(null)}
        {isActive==="orders"?(<TotalOrders />):(null)}
        {isActive==="user"?(<AddNewUser />):(null)}
        {isActive==="usersAll"?(<TotalUsers />):(null)}
        {isActive==="profile"?(<ProfileSetting />):(null)}
      </div>
    </div>
  )
}

export default Dashboard