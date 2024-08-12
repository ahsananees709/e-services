import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { Link, useNavigate, } from "react-router-dom";
import { LoginValidation } from "../../helper/Validation/loginValidation";
import {
  LOGIN_ROUTE, SIGNUP_ROUTE, SET_USER_INFO
} from "../Common/utils/constants";
import {
  useStateProvider
} from '../context/StateContext'
import { reducerCases } from "../context/constants";
import { toast } from "react-toastify";
import LoadingIndicator from "../loadingIndicator";

function Login() {
  const [loading,setLoading]  = useState(false)
  const navigate = useNavigate()
  const [{ userInfo, authData }, dispatch] = useStateProvider();
  let [account, setAccount] = useState({
    email: "",
    password: "",
  });
  let [errors, setErrors] = useState({});
  let handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    setLoading(true)
    const { email, password } = account
    var errors = LoginValidation(account);
    setErrors(errors);
    if (!errors.hasErrors) {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios
        .post(
          LOGIN_ROUTE,
          {
            email: email,
            password: password,
          },
          // { headers }
        )
        .then((response) => {
          setLoading(false)
          toast.success("Succesfully Loged In")
          console.log("Success ========>", response);
          dispatch({
            type: reducerCases.AUTH_SUCCESS,
            authData: response.data.data.token,
          })
          navigate("/")
        })
        .catch((error) => {
          setLoading(false)
          if (error.response.status == 401) {
            toast.error(error.response.data.message)
            // alert(error.response.data.message)
          }
          else if (error.response.status == 403) {
            toast.error(error.response.data.message)
            // alert(error.response.data.message)
          }
        });
    }
  };
  return (
    <>
      {loading && <LoadingIndicator/>}
      <div className="flex items-center justify-center min-h-screen ">
        <div className="relative flex flex-col m-6 space-y-6 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 border-2 border-gray-100">
          {/* left side */}
          <div className="relative">
            <img
              src="form-side.png"
              alt="img"
              className=" w-full sm:h-[550px] h-[400px] rounded-l-2xl md:block object-cover"
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
              Login to E-service Hub
            </h3>
            <span className=" text-gray-400 mb-6">
              Welcom back! Please enter your details
            </span>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <div className='flex flex-col'>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  id="email"
                  value={account.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="text-sm text-red-600 font-semibold">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="password"
                value={account.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
              <div className='flex flex-col'></div>
              {errors.password && (
                <span className="text-sm text-red-600 font-semibold">{errors.password}</span>
              )}
            </div>
            <div className="flex justify-between w-full py-2 mb-4">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">Remember for 30 days</span>
              </div>
              <span className="font-bold text-md">Forgot password</span>
            </div>
            <button className="w-full bg-black text-white p-2 rounded-lg mb-6"
              onClick={handleLogin}
            >
              Sign in
            </button>
            <div className="text-center text-gray-400"
            >
              Dont'have an account?
              <Link to="/register" className="ml-2 font-bold text-black">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
