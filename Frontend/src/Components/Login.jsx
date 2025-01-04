import React, { useState } from 'react';
import Logo from '../Assets/Logo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const [user2, setUser2] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser2({ ...user2, [e.target.name]: e.target.value });
  };

  const handlesubmit = () => {
    const { name, password } = user2;

    if (name && password) {
      axios
        .post("http://localhost:7001/login", user2, { withCredentials: true })
        .then((res) => {
          console.log("Response:", res.data);
          if (res.data.success) {
            toast.success(res.data.message || 'Login successful!', {
              position: "top-center",
              autoClose: 600,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setUser2({ name: "", password: "" });
            setTimeout(() => {
              navigate("/home");
            }, 1250);
          } else {
            toast.error(res.data.message || "Login failed", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          toast.error("Incorrect login", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.warning("Please fill in all fields.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className='m-auto gap-[50px] w-[380px] border-gray-300 mt-[100px] rounded-lg h-[550px] flex flex-col justify-center items-center border-[1px]'>
        <div><img className='w-28' src={Logo} alt="" /></div>
        <div className='flex flex-col gap-2'>
          <input onChange={(e) => handleChange(e)} className='border-[1px] p-2 outline-none rounded w-[280px]' type="text" value={user2.name} name="name" id="" placeholder='Enter Username' />
          <input onChange={(e) => handleChange(e)} className='border-[1px] p-2 outline-none rounded w-[280px]' type="password" value={user2.password} name="password" id="" placeholder='Enter Password' />
          <button onClick={() => handlesubmit()} className='flex justify-center items-center bg-red-500 text-white font-semibold px-6 py-[9px] rounded'>Login</button>
        </div>
        <div className='flex flex-col gap-2 justify-center items-center'>
          <p className='font-medium '>Don't Have Any Account <span className='text-red-500'>?</span></p>
          <Link to='/signup' className='bg-red-500 text-white font-semibold px-6 py-[9px] rounded'>Signup</Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
