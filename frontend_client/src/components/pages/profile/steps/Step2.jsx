import React, { useEffect, useState } from 'react'
import {
  useStateProvider
} from '../../../context/StateContext'
import { reducerCases } from "../../../context/constants";
import {
  SET_USER_INFO,
} from "../../../Common/utils/constants";

const Step2 = ({ errors, data, handleChange }) => {
  // const [{ userInfo }, dispatch] = useStateProvider();
  // const [data, setData] = useState({
  //   password: "",
  //   repassword: "",
  //   gender: ""
  // });
  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  //   dispatch({
  //     type: reducerCases.SET_USER,
  //     userInfo: {
  //       ...userInfo,
  //       [e.target.name]: e.target.value,

  //     },
  //   });
  // };
  // useEffect(() => {
  //   const handleData = { ...data };
  //   if (userInfo) {
  //     if (userInfo?.password) handleData.password = userInfo?.password;
  //     if (userInfo?.repassword) handleData.repassword = userInfo?.repassword;
  //     if (userInfo?.gender) handleData.gender = userInfo?.gender;
  //     setData(handleData);
  //   }
  // }, [data]);
  return (
    <>
      <div className="lg:flex block justify-between gap-x-4 w-full">
        <div className="w-full lg:w-1/2 py-2">
          <span className="mb-2 text-md">Postal_code</span>
          <div className='flex flex-col'>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="postal_code"
              id="postal_code"
              value={data.postal_code}
              onChange={handleChange}
            />
            {errors.postal_code && (
              <span className="text-sm text-red-600 font-semibold">{errors.postal_code}</span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-2">
          <span className="mb-2 text-md">Country</span>
          <div className='flex flex-col'>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="country"
              id="country"
              value={data.country}
              onChange={handleChange}
            />
            {errors.country && (
              <span className="text-sm text-red-600 font-semibold">{errors.country}</span>
            )}
          </div>
        </div>
      </div>
      <div className="lg:flex block justify-between gap-x-4 w-full">
      <div className="w-full lg:w-1/2 py-2">
          <span className="mb-2 text-md">Bio</span>
          <div className='flex flex-col'>
            <textarea
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="bio"
              id="bio"
              value={data.bio}
              onChange={handleChange}
            />
            {errors.bio && (
              <span className="text-sm text-red-600 font-semibold">{errors.bio}</span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-2">
          <span className="mb-2 text-md">Location</span>
          <div className='flex flex-col'>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="location"
              id="location"
              value={data.location}
              onChange={handleChange}
            />
            {errors.location && (
              <span className="text-sm text-red-600 font-semibold">{errors.location}</span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Step2