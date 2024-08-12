import React from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants"
import OrderModalForm from "../OrderModalForm";
import axios from "axios"
import { toast } from "react-toastify";

const Pricing = () => {
    const navigate = useNavigate()
    const [{ gigData, userInfo, authData, showOrderModal }, dispatch] = useStateProvider();
    const handleOrderForm = () => {
        if (authData) {
            dispatch({
                type: reducerCases.TOGGLE_ORDER_MODAL,
                showOrderModal: true,
            });
        }
        else {
            navigate("/login")
        }
    }
    const handleChat = async () => {
        if (authData) {
            try {
                const response = await axios.post("http://localhost:4000/api/conversation", {
                    "receiver_id": gigData?.specificService.user.id
                }, {
                    headers: {
                        Authorization: `Bearer ${authData}`,
                    },
                });
                if (response.data.success == true) {
                    navigate("/chat")
                }
                console.log(response)
            } catch (error) {
                toast.error(error.response.data.message)
                // alert(error.response.data.message)
            }
        }
        else {
            navigate("/login")
        }
    }
    return (
        <>
            {gigData && (
                <div className="sticky top-32 mb-10 h-max w-full">
                    <div className="border p-10 flex flex-col gap-5">
                        <div className="flex flex-col justify-between">
                            <h4 className="text-md ">
                                <b>Category:</b> {" "}
                                <span className="font-normal text-[#74767e]">{gigData.specificService.category.title}</span>
                            </h4>
                            <h4 className="text-md ">
                                <b>Description:</b> {" "}
                                <span className="font-normal text-[#74767e]">{gigData.specificService.category.description}</span>
                            </h4>
                            <h6 className="font-medium text-lg">Price: {" "}${gigData.specificService.price}</h6>
                        </div>
                        <div>
                            <div className="text-[#62646a] font-semibold text-sm block lg:flex gap-6">
                                <div className="w-full flex items-center gap-2">
                                    <FiClock className="text-xl" />
                                    <span>Start from {gigData.specificService.start_time} to end {gigData.specificService.end_time} </span>
                                </div>
                            </div>
                        </div>
                        {authData && gigData.specificService.user.id === userInfo.users.id ? (
                            <button
                                className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded"
                                onClick={() => navigate(`/seller/services/edit/${gigData.specificService.id}`)}
                            >
                                <span>Edit</span>
                                <BiRightArrowAlt className="text-2xl absolute right-4" />
                            </button>
                        ) : (
                            <button
                                className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded"
                                onClick={handleOrderForm}
                            >
                                <span>Continue</span>
                                <BiRightArrowAlt className="text-2xl absolute right-4" />
                            </button>
                        )}
                    </div>
                    {authData && gigData.specificService.user.id !== userInfo.users.id && (
                        <div className="flex items-center justify-center mt-5">
                            <button className=" w-5/6 hover:bg-[#74767e] py-1 border border-[#74767e] px-5 text-[#6c6d75] hover:text-white transition-all duration-300 text-lg rounded font-bold"
                                onClick={handleChat}>
                                Contact Me
                            </button>
                        </div>
                    )}
                </div>
            )}
            <OrderModalForm />
        </>
    )
}

export default Pricing