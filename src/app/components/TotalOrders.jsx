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


const TotalOrders = () => {

    const [totalSales,setTotalSaless]=useState([]);
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
        let res=await fetch(`${URL}/api/totalSales`);
        res=await res.json();
        setTotalSaless(res.totalSales)
    }

    useLayoutEffect(()=>{
        getTotalusers();
    },[totalSales])

    
  return (
    <div className={quicksand1.className}>
        <h1 className={`font-bold text-2xl mb-3 text-[#8BB862] ${quicksand.className}`}>SEE ALL ORDERS </h1>
        <hr className='border-t-2 border-gray-300 mb-2 w-full'/>
        
            <div className='flex justify-between text-[#5D5D5D]'>
                <p style={{ width: '20px' }}>#</p>
                <p className='md:fixed md:ml-[70px]'>Seller</p>
                <p className='md:fixed md:ml-[300px]'>Date</p>
                <p className='md:fixed md:ml-[500px]'>Time</p>
                <p className='md:fixed md:ml-[700px]'>TotalPrice</p>
                <p className='md:fixed md:ml-[1080px]'>Details</p>
            </div>
            <hr className='border-t-2 border-gray-300 mb-2 w-full '/>
            {
                totalSales?.map((item, index) => {
                    return (
                        <div key={index}>
                            <div  className='flex justify-between items-center text-[#5D5D5D]'>
                                <p style={{ width: '20px' }}>{index+1}</p>
                                <p className='md:fixed md:ml-[70px]'>{item.forWho} {item.lastName}</p>
                                <p className='md:fixed md:ml-[300px]'>{item.date}</p>
                                <p className='md:fixed md:ml-[500px]'>{item.time}</p>
                                <p className='md:fixed md:ml-[700px]'>$20</p>
                                <p onClick={() => handleUserClick(item)} className='md:fixed md:ml-[1080px]'>
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

export default TotalOrders