import React, { useState, useEffect } from 'react'
import {
  useStateProvider
} from '../../../context/StateContext'
import { reducerCases } from "../../../context/constants";
import {
  SET_USER_INFO,
} from "../../../Common/utils/constants";

const Step1 = ({ errors, data, handleChange }) => {
  return (
    <>
      <div className="lg:flex block justify-between gap-x-4 w-full">
        <div className="w-full lg:w-1/2 py-2">
          <span className="mb-2 text-md">First name</span>
          <div className='flex flex-col'>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="first_name"
              id="first_name"
              value={data.first_name}
              onChange={handleChange}
            />
            {errors.first_name && (
              <span className="text-sm text-red-600 font-semibold">{errors.first_name}</span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-2">
          <span className="mb-2 text-md">Last name</span>
          <div className='flex flex-col'>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="last_name"
              id="last_name"
              value={data.last_name}
              onChange={handleChange}
            />
            {errors.last_name && (
              <span className="text-sm text-red-600 font-semibold">{errors.last_name}</span>
            )}
          </div>
        </div>
      </div>
      <div className="lg:flex block justify-between gap-x-4 w-full ">
        <div className="w-full lg:w-1/2 py-2 ">
          <span className="mb-2 text-md">Email</span>
          <div className='flex flex-col'>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-sm text-red-600 font-semibold">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-2 ">
          <span className="mb-2 text-md">Phone number</span>
          <div className='flex flex-col'>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className="text-sm text-red-600 font-semibold">{errors.phone}</span>
            )}
          </div>
        </div>
      </div>
    </>

  )
}

export default Step1