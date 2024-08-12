import React, { useEffect, useState } from 'react'
import {
  useStateProvider
} from '../../../context/StateContext'
import { reducerCases } from "../../../context/constants";
import {
  SET_USER_INFO,
} from "../../../Common/utils/constants";

const Step2 = ({ errors, data, handleChange }) => {
  return (
    <>
      <div className="lg:flex block justify-between gap-x-4 w-full">
        <div className="w-full lg:w-1/2 py-2">
          <span className="mb-2 text-md">Password</span>
          <div className='flex flex-col'>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="password"
              id="phone"
              value={data.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-sm text-red-600 font-semibold">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-2">
          <span className="mb-2 text-md">Re Password</span>
          <div className='flex flex-col'>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="repassword"
              id="repassword"
              value={data.repassword}
              onChange={handleChange}
            />
            {errors.repassword && (
              <span className="text-sm text-red-600 font-semibold">{errors.repassword}</span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full py-2">
        <span className="mb-2 text-md">Gender</span>
        <div className='flex flex-col'>
          <div className="flex space-x-8 w-full py-2 mb-2">
            <div className="mr-2">
              <input type="radio" id="male"
                onChange={handleChange}
                checked={data.gender === 'male' ? true : false}
                value='male'
                name="gender" className="mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
              <label className=" text-gray-700">Male</label>
            </div>
            <div>
              <input type="radio" id="female"
                checked={data.gender === 'female' ? true : false}
                value='female'
                onChange={handleChange}
                name="gender" className="mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
              <label className=" text-gray-700">Female</label>
            </div>
          </div>
          {errors.gender && (
            <span className="text-sm text-red-600 font-semibold">{errors.gender}</span>
          )}
        </div>
      </div>
    </>
  )
}

export default Step2