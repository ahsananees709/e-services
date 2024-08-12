import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useStateProvider } from "../../context/StateContext.jsx";
import { reducerCases } from "../../context/constants"

export default function Conversation({ conversation, currentUser, currentChat, backgrounColor }) {
  const [user, setUser] = useState(null)
  const [{ authData }, dispatch] = useStateProvider();
  const getFriendData = async (friendId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/auth/getfriend/${friendId}`, {
        headers: {
          Authorization: `Bearer ${authData}`
        }
      });
      console.log(response.data.data)
      setUser(response?.data?.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (currentUser?.users.id) {
      const friendId = conversation.members.find((m) => (m !== currentUser?.users.id))
      getFriendData(friendId)
    }

  }, [currentUser, conversation])

  return (
    <div className={`flex flex-row items-center hover:bg-gray-100 rounded-xl px-2 py-2 cursor-pointer ${backgrounColor}`}>
      <img className='flex items-center justify-center h-8 w-8 rounded-full'
        src={user?.profile_picture ? `http://localhost:4000/${user?.profile_picture.replace(/\\/g, '/').replace('public/', '')}` : "./noAvatar.png"}
        alt='' />
      <div className="ml-2 text-sm font-semibold">{user?.first_name} {user?.last_name}</div>
      {/* <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
        2
      </div> */}
    </div>
  );
}
