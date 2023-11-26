import React, { useContext, useLayoutEffect, useState } from 'react'
import { Authorization } from '../hooks';
import { FaEye } from "react-icons/fa";
import Modal from './ModalScreen';
import { Quicksand } from 'next/font/google';

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


const TotalUsers = () => {

    const [totalUser,setTotalUsers]=useState([]);
    const {URL}=useContext(Authorization);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
      };

    const getTotalusers=async()=>{
        let res=await fetch(`${URL}/api/totalUsers`);
        res=await res.json();
        setTotalUsers(res.totalUsers)
    }

    useLayoutEffect(()=>{
        getTotalusers();
    },[totalUser])

    
  return (
    <div className={quicksand1.className}>
        <h1 className={`font-bold text-2xl mb-3 text-[#8BB862] ${quicksand.className}`}>SEE ALL USERS </h1>
        <hr className='border-t-2 border-gray-300 mb-2 w-full'/>
        
            <div className='flex justify-between text-[#5D5D5D]'>
                <p style={{ width: '20px' }}>#</p>
                <p className='fixed ml-[70px]'>Full Name</p>
                <p className='fixed ml-[300px]'>Email</p>
                <p className='fixed ml-[500px]'>Role</p>
                <p className='fixed ml-[700px]'>Commissions</p>
                <p className='fixed  ml-[850px]'>Commissions Collected</p>
                <p className='fixed ml-[1080px]'>Details</p>
            </div>
            <hr className='border-t-2 border-gray-300 mb-2 w-full '/>
            {
                totalUser.map((item, index) => {
                    return (
                        <div key={index}>
                            <div  className='flex items-center text-[#5D5D5D]'>
                                <p style={{ width: '20px' }}>{index+1}</p>
                                <p className='fixed ml-[70px]'>{item.firstName} {item.lastName}</p>
                                <p className='fixed ml-[300px]'>{item.email}</p>
                                <p className='fixed ml-[500px]'>{item.role}</p>
                                <p className='fixed ml-[700px]'>{item.comissions}</p>
                                <p className='fixed  ml-[850px]'>{item.comissions}</p>
                                <p onClick={() => handleUserClick(item)} className='fixed ml-[1080px]'>
                                    <FaEye  color="white" size={25} className='bg-[#8BB862] cursor-pointer p-1 rounded-md'/>
                                </p>
                            </div>
                            <hr className='border-t-2 mt-2 border-gray-300 mb-2 w-full'/>
                        </div>
                    )
                })
            }
            <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(!isModalOpen)} user={selectedUser}/>
    </div>
  )
}

export default TotalUsers