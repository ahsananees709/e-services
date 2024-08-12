import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  useStateProvider
} from '../context/StateContext'
import { reducerCases } from "../context/constants";
import {
  LOGIN_ROUTE, VERIFY_ROUTE, SET_USER_INFO
} from "../Common/utils/constants";
import { toast } from "react-toastify";
import LoadingIndicator from "../loadingIndicator";

function VerifyAcount() {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const [{ verifyEmail }, dispatch] = useStateProvider();
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    if (/^\d{6,7}$/.test(value)) {
      setOtp(value);
      setError('');
    } else {
      setError('Only 6 to 7 digits are allowed');
      setOtp(value);
    }
  };
  const handleVerify = async () => {
    setLoading(true)
    try {
      if (otp === '') {
        setError('Otp is required')
      }
      else {
        await axios
          .post(
            VERIFY_ROUTE,
            {

              email: verifyEmail,
              otp: otp
            },
            // { headers }
          )
          .then((response) => {
            console.log("Success ========>", response);
            setLoading(false)
            toast.success(response.data.message)
            navigate("/login")
          })
          .catch((error) => {
            setLoading(false)
            toast.error(error.response.data.message)
            console.log("Error ========>", error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };


  const resendOtp = async () => {
    setLoading(true)
    try {
        await axios
          .get(
            `http://localhost:4000/api/auth/get-otp/${verifyEmail}`
          )
          .then((response) => {
            setLoading(false)
            toast.success(response.data.message)
          })
          .catch((error) => {
            setLoading(false)
            toast.error(error.response.data.message)
          });
      
    } catch (err) {
      console.log(err);
    }
}

  return (
    <>
       {loading && <LoadingIndicator />}
      <div className="flex items-center justify-center min-h-screen b
    g-gray-100">
        <div className="relative flex flex-col m-6 space-y-6 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* left side */}
          <div className="relative">
            <img
              src="form-side.png"
              alt="img"
              className=" w-[400px] h-[550px] hidden rounded-l-2xl md:block object-cover"
            />
            <div className="text-white absolute hidden top-[28%] right-6 p-8 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
              <span className="text-white text-xl">
                We've been using Untitle to kick"
                <br />
                start every new project and can't <br />
                imagine working without it."
              </span>
            </div>
          </div>
          {/* right side */}
          <div className="rounded flex flex-col justify-center p-4 md:p-14">
            <h3 className="text-2xl font-bold text-slate-700">
              Verify your account
            </h3>
            <span className=" text-gray-400 mb-6">
              Welcom back! Please enter your otp
            </span>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                value={verifyEmail}
                disabled
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">OTP</span>
              <div className='flex flex-col'>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                />
                {error && <span className="text-sm text-red-600 font-semibold">{error}</span>}
              </div>
            </div>
            <button className="w-full bg-black text-white p-2 rounded-lg mb-6" onClick={handleVerify}>
              Verify
            </button>
            <button className="w-full bg-[#1DBF73] text-white p-2 rounded-lg mb-6" onClick={resendOtp}>
              Resend Otp
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyAcount;
