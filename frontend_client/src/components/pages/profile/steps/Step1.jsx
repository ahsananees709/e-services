import React, { useState, useEffect } from 'react'
import {
  useStateProvider
} from '../../../context/StateContext'
import { reducerCases } from "../../../context/constants";
import {
  SET_USER_INFO,
} from "../../../Common/utils/constants";

const Step1 = ({errors, data, handleChange}) => {
  return (
    <>
      <div className="lg:flex block justify-between gap-x-4 w-full">
        <div className="w-full lg:w-1/2 py-2">
          <span className="mb-2 text-md">Cnic</span>
          <div className='flex flex-col'>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="cnic"
            id="cnic"
            value={data.cnic}
            onChange={handleChange}
          />
          {errors.cnic && (
            <span className="text-sm text-red-600 font-semibold">{errors.cnic}</span>
          )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-2">
          <span className="mb-2 text-md">Street no</span>
          <div className='flex flex-col'>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="street_no"
            id="street_no"
            value={data.street_no}
            onChange={handleChange}
          />
          {errors.street_no && (
            <span className="text-sm text-red-600 font-semibold">{errors.street_no}</span>
          )}
          </div>
        </div>
      </div>
      <div className="lg:flex block justify-between gap-x-4 w-full ">
        <div className="w-full lg:w-1/2 py-2 ">
          <span className="mb-2 text-md">City</span>
          <div className='flex flex-col'>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="city"
            id="city"
            value={data.city}
            onChange={handleChange}
          />
          {errors.city && (
            <span className="text-sm text-red-600 font-semibold">{errors.city}</span>
          )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-2 ">
          <span className="mb-2 text-md">State</span>
          <div className='flex flex-col'>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="state"
            id="state"
            value={data.state}
            onChange={handleChange}
          />
          {errors.state && (
            <span className="text-sm text-red-600 font-semibold">{errors.state}</span>
          )}
          </div>
        </div>
      </div>
    </>

  )
}

export default Step1