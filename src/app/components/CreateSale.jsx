import React, { useContext, useEffect, useState } from 'react'
import { GoPlusCircle  } from "react-icons/go";
import { Authorization } from '../hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const CreateSale = () => {
    const [data,setData]=useState({
        
    })
    const [token,setToken] = useState("")
    const {URL,userDetails,setUserDetails}=useContext(Authorization);

    const getUserDetails=async()=>{
        const getToken=localStorage.getItem("token");

        try{
          let res=await fetch(`${URL}/api/getAdminDetails/${getToken}`)
          const status = res.status;
          res= await res.json();
          setUserDetails(res.admin);
        }catch(err){
        //   console.log("Error: " + err.message)
        }
    }

    useEffect(()=>{
        getUserDetails();
    },[userDetails])

    const hanldeInputChange=(e)=>{
        e.preventDefault();
        setData({
          ...data,
            [e.target.name]:e.target.value
        })
    }

    const handleAddCreate=async()=>{
        setData({
            ...data,
            addedBy:userDetails?.email
          })
        try{
            let res=await fetch(`${URL}/api/createSales`,{
              method: 'POST',
              headers:{
                'content-type': 'application/json',
              },
              body:JSON.stringify(data)
            })
            const status = res.status;
            res= await res.json();
            
            if(status==200){
              toast.success(res.message);
            //   setData("")
              setTimeout(()=>{
                  window.location.reload();
              },3000)
            }else{
              toast.error(res.message)
            }
          }catch(err){
            console.log("Error: " + err.message)
          }
    }

  return (
    <div className={`${quicksand1.className} text-[12px]`}>
        <h1 className={`${quicksand.className} font-bold text-[32px] mb-3 text-[#8BB862]`}>Create a sale</h1>
        <ToastContainer />
        <hr className='border-t-2 border-gray-300 mb-2 w-full'/>

        <div className='md:flex items-center text-[#5D5D5D] text-[12px]'>
            <div className='w-full'>
                <label htmlFor="">Date</label>
                <br />
                <input onChange={hanldeInputChange} name='date' className='bg-[#EBEBEB] rounded-md p-2 w-[100%] md:w-[550px]' type="date" />
            </div>
            <div className=''>
                <label htmlFor="">Time</label>
                <br />
                <input onChange={hanldeInputChange} name='time' className='bg-[#EBEBEB] rounded-md p-2 w-[50%] md:w-[550px]' type="time" />
            </div>
        </div>

        <div className='md:flex items-center mt-3 text-[#5D5D5D]'>
            <div className='w-full'>
                <label htmlFor="">Place</label>
                <br />
                <input onChange={hanldeInputChange} name='place' placeholder='Enter name of place' className='bg-[#EBEBEB] rounded-md p-2 w-[100%] md:w-[550px]' type="text" />
            </div>
            <div className=''>
                <label htmlFor="">Room Number</label>
                <br />
                <input onChange={hanldeInputChange} name='roomNumber' className='bg-[#EBEBEB] rounded-md p-2 w-[100%] md:w-[550px]' type="number" />
            </div>
        </div>

        <div className='md:flex items-center mt-3 text-[#5D5D5D]'>
            <div className='w-[100%]'>
                <label htmlFor="">For who</label>
                <br />
                <input onChange={hanldeInputChange} name='forWho' placeholder='Name of the receiver'  className='bg-[#EBEBEB] w-[100%] rounded-md p-2 ' type="text" />
            </div>
        </div>

        <div className='md:flex items-center mt-3 text-[#5D5D5D]'>
            <div className='w-full'>
                <label htmlFor="">Type of Box</label>
                <br />
                <select onChange={hanldeInputChange} name="boxType"  className='bg-[#EBEBEB] p-2 w-[100%] md:w-[550px]'  id="">
                    <option value="">Select the type</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <div className='text-[#5D5D5D]'>
                <label htmlFor="">Select Size 1</label>
                <br />
                <select onChange={hanldeInputChange} name="size1" className='bg-[#EBEBEB] p-2 w-[100%] md:w-[550px]'  id="">
                    <option value="">Select the Size</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </div>

        <div className='md:flex items-center mt-3 text-[#5D5D5D]'>
            <div className='w-full'>
                <label htmlFor="">Do you want a ribbon for box 1?</label>
                <br />
                <div className='flex bg-[#EBEBEB] rounded-md p-2 w-[100%] md:w-[550px]'>
                <input onChange={hanldeInputChange} name='wantRibbon' value="yes" className='' type="radio"  /> 
                <p className='ml-3'>Yes</p>
                </div>
            </div>
            <div className=''>
                <label htmlFor=""></label>
                <br />
                <div className='flex bg-[#EBEBEB] rounded-md p-2 w-[100%] md:w-[550px]'>
                <input onChange={hanldeInputChange} name='wantRibbon' value="no" className='' type="radio"  /> 
                <p className='ml-3'>No</p>
                </div>
            </div>
        </div>

        <div className='md:flex items-center mt-3 text-[#5D5D5D]'>
            <div className='w-full'>
                <label htmlFor="">Ribbon Type</label>
                <br />
                <select onChange={hanldeInputChange} name="ribbonType" className='bg-[#EBEBEB] p-3  w-[100%]'  id="">
                    <option value="">Select the type</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </div>

        <div className='flex items-center mt-3 text-[#5D5D5D]'>
            <div className='w-[100%]'>
                <label htmlFor="">Ribbon Text 1</label>
                <br />
                <input onChange={hanldeInputChange} name='ribbonText1' placeholder='Enter ribbon text 1'  className='bg-[#EBEBEB] w-[100%] rounded-md p-3 ' type="text" />
            </div>
        </div>

        <div className='flex items-center mt-3 text-[#5D5D5D]'>
            <div className='w-[100%]'>
                <label htmlFor="">Ribbon Text 2</label>
                <br />
                <input onChange={hanldeInputChange} name='ribbonText2' placeholder='Enter ribbon text 2'  className='bg-[#EBEBEB] w-[100%] rounded-md p-3 ' type="text" />
            </div>
        </div>

        <div>
            <button className='bg-[#8BB862] flex items-center p-2 rounded-md text-white mt-3' onClick={handleAddCreate}>
                <GoPlusCircle  size={18}  className='mr-1'/>
                Create a sale
            </button>
        </div>

    </div>
  )
}

export default CreateSale