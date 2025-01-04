import React, { useState } from 'react';
import Logo from '../Assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlesubmit = () => {
    const { name, password } = user;
    if (name && password) {
      axios.post("http://localhost:7001/signup", user)
        .then((res) => {
          console.log("Response:", res.data);
          
          toast.success("User registered successfully!", {
            position: "top-center",
            autoClose: 600,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setUser({ name: "", password: "" });
          setTimeout(() => {
            navigate("/login");
          }, 1250);
        })
          
        .catch((err) => {
          console.error("Error:", err.response?.data?.message || err.message);
          toast.error(err.response?.data?.message || "Failed to register", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    } else {
      toast.warning("Please fill in all fields.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className='m-auto gap-[50px] w-[380px] border-gray-300 mt-[100px] rounded-lg h-[550px] flex flex-col justify-center items-center border-[1px]'>
        <div><img className='w-28' src={Logo} alt="" /></div>
        <div className='flex flex-col gap-2'>
          <input onChange={(e) => handleChange(e)} className='border-[1px] p-2 outline-none rounded w-[280px]' type="text" value={user.name} name="name" placeholder='Enter Username' />
          <input onChange={(e) => handleChange(e)} className='border-[1px] p-2 outline-none rounded w-[280px]' type="password" value={user.password} name="password" placeholder='Enter Password' />
          <button onClick={() => handlesubmit()} className='flex justify-center items-center bg-red-500 text-white font-semibold px-6 py-[9px] rounded'>Register</button>
        </div>
        <div className='flex flex-col gap-2 justify-center items-center'>
          <p className='font-medium'>Already Have An Account <span className='text-red-500'>?</span></p>
          <Link to='/' className='bg-red-500 text-white font-semibold px-6 py-[9px] rounded'>Login</Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
