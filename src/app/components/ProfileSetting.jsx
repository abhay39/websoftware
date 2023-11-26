import React, { useContext, useEffect, useState } from "react";
import { Authorization } from "../hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  display: "swap",
  subsets: ["latin"],
  weight: "700"
});
const quicksand1 = Quicksand({
  display: "swap",
  subsets: ["latin"],
  weight: "600"
});


const ProfileSetting = () => {
  const { URL, userDetails, setUserDetails } = useContext(Authorization);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const getUserDetails = async () => {
    const getToken = localStorage.getItem("token");

    try {
      let res = await fetch(`${URL}/api/getAdminDetails/${getToken}`);
      const status = res.status;
      res = await res.json();
      setUserDetails(res.admin);
    } catch (err) {
      //   console.log("Error: " + err.message)
    }
  };

  const handleChangePassword=async()=>{
    if(newPassword===confirmPassword){
        try{
            let res=await fetch(`${URL}/api/updatePassword`,{
                method: 'POST',
                headers:{
                'content-type': 'application/json',
                },
                body:JSON.stringify({
                    password:oldPassword,
                    newPassword:newPassword,
                    email:userDetails.email
                })
            })
            const status = res.status;
            res= await res.json();
            
            if(status==200){
                toast.success(res.message);
                setTimeout(()=>{
                    window.location.reload();
                },3000)
            }else{
                toast.error(res.message)
            }
            }catch(err){
            console.log("Error: " + err.message)
            }
    }else{
        alert("Please make sure you have entered the same password in new and confirm password")
    }
  }

  useEffect(
    () => {
      getUserDetails();
    },
    [userDetails]
  );

  return (
    <div className={`${quicksand1.className} text-[12px]`}>
      <h1 className={`font-bold text-2xl mb-3 text-[#8BB862] ${quicksand.className}`}>PROFILE SETTINGS </h1>
      <ToastContainer />

      <hr className="border-t-2 border-gray-300 mb-2 w-full" />

      <div className="flex">
        <div className="bg-slate-200 w-[100%] md:w-[50%]  p-3 rounded-md">
          <div>
            <label className="font-bold ">Your Name</label>
            <br />
            <label>
              {userDetails.firstName} {userDetails.lastName}
            </label>
          </div>

          <div className="mt-3">
            <label className="">Username</label>
            <br />
            <label>
              {userDetails.username}
            </label>
          </div>

          <div className="mt-3">
            <label className="font-bold ">E-mail</label>
            <br />
            <label>
              {userDetails.email}
            </label>
          </div>

          <div className="mt-3">
            <label className="font-bold ">Phone Number</label>
            <br />
            <label>
              {userDetails.phone}
            </label>
          </div>

          <div className="mt-3">
            <label className="font-bold ">Address</label>
            <br />
            <label>
              {userDetails.address}
            </label>
          </div>

          <div className="mt-3">
            <label className="font-bold ">Comissions</label>
            <br />
            <label>
              {userDetails.comissions}%
            </label>
          </div>
        </div>

        <div className="ml-2 w-[100%] md:w-[50%]">
          <div className="bg-slate-200  rounded-md p-1 mb-2">
            <div className="">
              <label htmlFor="">Old Password</label>
              <br />
              <input onChange={(e)=>setOldPassword(e.target.value)}
                className="p-2 w-[100%]  rounded-md"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your curent password"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="">New Password</label>
              <br />
              <input onChange={(e)=>setNewPassword(e.target.value)}
                className="p-2 w-[100%]  rounded-md"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your New password"
              />
            </div>
            <div className="mt-2 ">
              <label htmlFor="">Confirm New Password</label>
              <br />
              <input  onChange={(e)=>setConfirmPassword(e.target.value)}
                className="p-2 w-[100%]  rounded-md"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Confirm New password"
              />
            </div>

            <div className="mt-2 flex justify-between items-center mb-2">
              <div className="w-full ">
                <button onClick={handleChangePassword} className="bg-[#8BB862] text-white p-2 w-[93%] rounded">
                  Update Password
                </button>
              </div>
              <div className="w-full">
                <label
                  onClick={() => setShowPassword(!showPassword)}
                  htmlFor=""
                  className="
                            ml-6 text-red-700 cursor-pointer"
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </label>
              </div>
            </div>
          </div>

          <div className="bg-slate-200  w-[100%]  p-3 rounded-md ">
            <label className="font-bold ">Your Role</label>
            <br />
            <label>
              {userDetails.role}
            </label>
            <br />
            <label className="font-bold ">Comission Collected</label>
            <br />
            <label>
              {userDetails.comissions} $
            </label>
          </div>
          <div/>
        </div>
      </div>
      <div className="bg-slate-200 mt-2  w-[100%]  p-3 rounded-md ">
        <p className="ml-3">Version 1.1</p>
      </div>
    </div>
  );
};

export default ProfileSetting;
