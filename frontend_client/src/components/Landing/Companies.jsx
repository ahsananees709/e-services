import React from 'react'

const Companies = () => {
  return (
    <div className="bg-gray-400  flex items-center justify-center text-gray-400 text-2xl font-bold min-h-[11vh] ">
    <ul className="flex justify-between gap-10 ml-10">
      {[1, 2, 3, 4, 5].map((num) => (
        <li key={num} className="py-2">
          <img src={`/trusted${num}.png`} alt="trusted brands" fill />
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Companies