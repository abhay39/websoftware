import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Authorization } from "../hooks";
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

const AddNewUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});

  const hanldeInputChange = e => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const { URL } = useContext(Authorization);

  const handleAddCreate = async () => {
    try {
      let res = await fetch(`${URL}/api/addUsers`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const status = res.status;
      res = await res.json();

      if (status == 200) {
        toast.success(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  return (
    <div className={`${quicksand1.className} text-[12px]`}>
      <h1
        className={`${quicksand.className} font-bold text-2xl mb-3 text-[#8BB862]`}
      >
        ADD A NEW USER
      </h1>
      <ToastContainer />
      <hr className="border-t-2 border-gray-300 mb-2 w-full" />

      <div className="bg-[#F3F4F6] p-3">
        <div className="md:flex items-center mt-2 text-[#5D5D5D]">
          <div className="w-full">
            <label htmlFor="">First Name</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="firstName"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type="text"
            />
          </div>
          <div className="">
            <label htmlFor="">Last Name</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="lastName"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type="text"
            />
          </div>
        </div>

        <div className="md:flex items-center mt-2 text-[#5D5D5D]">
          <div className="w-full">
            <label htmlFor="">Email</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="email"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type="email"
            />
          </div>
          <div className="">
            <label htmlFor="">Username</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="username"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type="text"
            />
          </div>
        </div>

        <div className="md:flex items-center mt-2 text-[#5D5D5D]">
          <div className="w-full">
            <label htmlFor="">Password</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="password"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type={showPassword ? "text" : "password"}
            />
          </div>
          <div className="">
            <label htmlFor="">Phone Number</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="phone"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type="number"
            />
          </div>
        </div>

        <div className="md:flex items-center mt-2 text-[#5D5D5D]">
          <div className="w-full">
            <label htmlFor="">Address</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="address"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type="text"
            />
          </div>
          <div className="">
            <label htmlFor="">Zip</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="zip"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type="number"
            />
          </div>
        </div>

        <div className="md:flex items-center mt-2 text-[#5D5D5D]">
          <div className="w-full">
            <label htmlFor="">City</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="city"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type="text"
            />
          </div>
          <div className="">
            <label htmlFor="">Country</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="country"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type="text"
            />
          </div>
        </div>

        <div className="md:flex items-center mt-2 text-[#5D5D5D]">
          <div className="w-full">
            <label htmlFor="">Comission</label>
            <br />
            <input
              onChange={hanldeInputChange}
              name="comissions"
              className="bg-[#FFFFFF] rounded-md p-2 w-[100%] md:w-[550px]"
              type="number"
            />
          </div>
          <div className="">
            <label htmlFor="">Role</label>
            <br />
            <select
              onChange={hanldeInputChange}
              name="role"
              className="bg-[#FFFFFF] p-2 w-[100%] md:w-[550px]"
              id=""
            >
              <option value="">Select the role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="md:flex items-center mt-2 text-[#5D5D5D]">
          <div className="w-full ">
            <button
              onClick={handleAddCreate}
              className="bg-[#8BB862] text-white p-2 w-[97%] rounded"
            >
              Add a New User
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
    </div>
  );
};

export default AddNewUser;
