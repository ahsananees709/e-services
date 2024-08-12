import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useStateProvider } from "./context/StateContext";
import { reducerCases } from "./context/constants";
import axios from "axios";
import Messenger from "./Chat/messenger/messenger";

const ChatModal = () => {
    const [{ showChatModal, authData }, dispatch] = useStateProvider();

    const handleCloseChatForm = () => {
        dispatch({
            type: reducerCases.CLOSE_CHAT_MODAL,
            showChatModal: false,
        });
    }
    return (
        <>
            {showChatModal && (
                <>
                    {/* Main modal */}
                    <div className="bg-black bg-opacity-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative p-2 w-full h-full max-w-5xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Chat
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={handleCloseChatForm}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <Messenger />
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default ChatModal