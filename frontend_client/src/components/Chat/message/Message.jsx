import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import moment from 'moment'
import { useStateProvider } from "../../context/StateContext.jsx";
import { reducerCases } from "../../context/constants"

export default function Message({ currentUser, message, own }) {
  const [{ userInfo, authData }, dispatch] = useStateProvider();
  const [profilePicture, setProfilePicture] = useState(null)


  const handleProfilePicture = async () => {
    try {
      if (currentUser?.id === message?.sender_id)
        setProfilePicture(currentUser?.profile_picture)
      else {
        const response = await axios.get(`http://localhost:4000/api/auth/getfriend/${message?.sender_id}`, {
          headers: {
            Authorization: `Bearer ${authData}`
          }
        });

        setProfilePicture(response?.data?.data?.profile_picture)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    handleProfilePicture()
    console.log(message?.timestamp)
  }, [message])


  return (
    <div className={`mt-4 ${own ? "col-start-6 col-end-13" : "col-start-1 col-end-8"}`}>
      <div className={`flex items-center ${own ? "justify-start flex-row-reverse" : "flex-row"}`}>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          <img src={profilePicture ? `http://localhost:4000/${profilePicture.replace(/\\/g, '/').replace('public/', '')}` : "./noAvatar.png"} alt=''
            className=' h-10 w-10 rounded-full '
          />
        </div>
        <div className={`relative px-10 mb-2 text-sm py-2 shadow rounded-xl ${own ? "mr-3 bg-indigo-100" : "ml-3 bg-white"}`}>
          <div>
            {message?.text}
          </div>
          <div className=" absolute text-xs bottom-0 top-auto right-2 -mb-5 mr-2 text-gray-500">
            {format(message?.timestamp)}
          </div>
        </div>
      </div>
    </div>
  )
}
