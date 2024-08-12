import React from 'react'

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="flex justify-between w-full py-2 mb-2">
      <button
        onClick={() => handleClick()}
        className={`bg-white cursor-pointer text-black p-2 px-4 rounded-lg mb-4 border-2 border-black hover:border-slate-700 hover:text-white hover:bg-black transition duration-200 ease-in-out ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
        Back
      </button>
      <button
        onClick={() => handleClick("next")}
        className="px-4 bg-black text-white p-2 rounded-lg mb-4">
        {currentStep === steps.length - 1 ? "Next" : "Confirm"}
      </button>
    </div>
  )
}

export default StepperControl
