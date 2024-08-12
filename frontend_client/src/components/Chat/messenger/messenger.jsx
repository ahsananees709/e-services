import axios from 'axios';
import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import Conversation from '../conversations/Conversation.jsx'
import Message from '../message/Message.jsx'
import { io } from 'socket.io-client';
import { useStateProvider } from "../../context/StateContext.jsx";
import { reducerCases } from "../../context/constants"

export default function Messenger() {
    const [{ userInfo, authData }, dispatch] = useStateProvider();
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const socket = useRef()
    const scrollRef = useRef()

    // Socket.io code
    useEffect(() => {
        socket.current = io("ws://localhost:8000")
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender_id: data.senderId,
                text: data.text,
                timestamp: Date.now()
            })
        })
    }, [])
    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender_id) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])
    useEffect(() => {
        socket?.current.emit("addUser", userInfo?.users.id)
        socket?.current.on("getUsers", users => {
            console.log(users)
        })
    }, [userInfo])

    const getConversations = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/conversation', {
                headers: {
                    Authorization: `Bearer ${authData}`
                }
            });
            const conversations = response.data.data;
            console.log("conversations", conversations);
            setConversations(conversations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
            if (conversations.length > 0) {
                setCurrentChat(conversations[0]);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getMessages = async (req, res) => {
        try {
            if (currentChat) {
                const response = await axios.get(`http://localhost:4000/api/message/${currentChat?.id}`, {
                    headers: {
                        Authorization: `Bearer ${authData}`
                    }
                });

                setMessages(response?.data?.data)
            }
            //   setConversations(response.data.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const message = {
                text: newMessage,
                conversation_id: currentChat?.id
            }
            const receiverId = currentChat.members.find(member => member !== userInfo.users.id)
            socket.current.emit("sendMessage", {
                senderId: userInfo.users.id,
                receiverId,
                text: newMessage
            })
            const response = await axios.post(`http://localhost:4000/api/message`,
                message, {
                headers: {
                    Authorization: `Bearer ${authData}`
                }
            });
            console.log(response?.data?.data[0])
            if (response) {
                setMessages([...messages, response?.data?.data[0]])
                setNewMessage("")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        // handleLogin()
        console.log("userInfo", userInfo)
        getConversations()

    }, [])
    useEffect(() => {
        getMessages()

    }, [currentChat])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    // console.log("Messages: ", messages)
    return (
        <>
            <div className="flex mx-auto h-[477px] antialiased text-gray-800">
                <div className="flex flex-row w-full overflow-x-hidden">
                    {/* SideBar */}
                    <div className="flex flex-col pl-6 pr-2 h-[477px] bg-white w-64 flex-shrink-0 shadow-r-medium">
                        <div className="flex flex-col mt-8">
                            {/* Active Conversation */}
                            <div className="flex flex-row items-center justify-between text-xs">
                                <span className="font-bold">Active Conversations</span>
                                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                                    {conversations.length}
                                </span>
                            </div>
                            {/* All Conversations */}
                            {conversations.map((c, i) => (
                                <div className="flex flex-col space-y-1 mt-4 px-auto h-full overflow-y-auto"
                                    key={i}
                                    onClick={() => {
                                        setCurrentChat(c);
                                    }}>
                                    <Conversation conversation={c} currentUser={userInfo} backgrounColor={c === currentChat ? "bg-gray-100" : ""} />
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="flex flex-col flex-auto p-6">
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-200 h-full p-4">
                            {/* Messages */}
                            <div className="flex flex-col h-full overflow-x-auto mb-4">
                                <div className="flex flex-col h-full">
                                    <div className="grid grid-cols-12 gap-y-2">
                                        {messages?.map((m, i) => (
                                            <Message key={i} currentUser={userInfo} message={m} own={m?.sender_id === userInfo?.users.id} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* :
                                <div className='flex justify-center items-center  text-center w-full'>Open Your Chat</div>
                            } */}
                            {/* Form */}
                            <div className="flex flex-row items-center h-10">
                                <input
                                    type="text"
                                    placeholder="write something..."
                                    onChange={(e) => { setNewMessage(e.target.value) }}
                                    value={newMessage}
                                    className="bg-white w-full flex rounded-l-xl  focus:outline-none  pl-4 h-12"
                                />
                                <button className="h-12 flex items-center justify-center bg-[#1DBF73] rounded-r-xl text-white px-4 py-1 flex-shrink-0" onClick={handleSubmit}>
                                    <span>Send</span>
                                    <span className="ml-2">
                                        <svg
                                            className="w-4 h-4 transform rotate-45 -mt-px"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
