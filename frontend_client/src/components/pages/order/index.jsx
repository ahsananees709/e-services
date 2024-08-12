import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GET_MY_ORDERS, SERVICE_PROVIDER_ORDER_STATUS_CHANGE } from "../../Common/utils/constants"
import axios from "axios";
import { reducerCases } from "../../context/constants";
import {
    useStateProvider
} from '../../context/StateContext'
import { FaTrashAlt, FaEdit, FaEye, FaBan } from 'react-icons/fa';
import OrderDetailModalForm from '../../OrderDetailModalForm';
import { toast } from 'react-toastify';
import LoadingIndicator from '../../loadingIndicator';

const Order = () => {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [modalDetail, setModalDetail] = useState({
        modalHeader: "",
        modalContent: ""
    })
    const [orderData, setOrderData] = useState('')
    const [{ authData, userInfo, showOrderDetailModal }, dispatch] = useStateProvider();

    const handleOrderDetail = (data, modalHeader, modalContent) => {
        console.log("detail", data)
        setOrderData(data)
        setModalDetail({
            modalHeader: modalHeader,
            modalContent: modalContent
        })
        dispatch({
            type: reducerCases.TOGGLE_ORDER_DETAIL_MODAL,
            showOrderDetailModal: true,
        });
    }
    const handleServiceProviderOrderAction = async (order_id, order_status) => {
        try {
            setLoading(true)
            const response = await axios.patch(`${SERVICE_PROVIDER_ORDER_STATUS_CHANGE}/${order_id}`,
                {
                    order_status: order_status
                }, {
                headers: {
                    Authorization: `Bearer ${authData}`,
                },

            });
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error.response && error.response.status === 401) {
                navigate("/login")
            }
            else {
                toast.error(error.response.data.message)
            }
        }
    };


    useEffect(() => {
        const getOrders = async () => {
            try {
                setLoading(true)
                const response = await axios.get(GET_MY_ORDERS, {
                    headers: {
                        Authorization: `Bearer ${authData}`,
                    },

                });
                const res = response.data.data;
                const orderResponse = res.map((order, index) => {
                    const serverBaseUrl = "http://localhost:4000";
                    if (order.service.cover_photo) {
                        const fileCoverPath = order.service.cover_photo;
                        const relativeCoverPath = fileCoverPath.replace(/\\/g, "/").replace(/^public\//, "");
                        const coverPhotoUrl = `${serverBaseUrl}/${relativeCoverPath}`;
                        order.service = {
                            ...order.service,
                            cover_photo: coverPhotoUrl
                        };
                    }
                    return order;
                })
                setLoading(false)
                toast.success("Orders Fetched Successfully")
                setOrders(orderResponse.sort((a, b) => new Date(a.order_date) - new Date(b.order_date)))
            } catch (error) {
                setLoading(false)
                if (error.response && error.response.status === 401) {
                    navigate("/login")
                }
                else if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message)
                }
                else if (error.response && error.response.status === 403) {
                    toast.error(error.response.data.message)
                }
            }
        };
        getOrders();
    }, []);

    return (
        <>
            {loading && <LoadingIndicator/>}
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto px-4 py-5 sm:px-6 lg:px-8 lg:pb-24">
                    <div className="max-w-xl">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Check the status of recent orders, manage returns, and download invoices.
                        </p>
                    </div>
                    <div className="mt-16">
                        <h2 className="sr-only">Recent orders</h2>

                        <div>
                            {orders.length === 0 ? (
                                <p className="my-5 p-8 md:p-6 text-gray-500 text-center h-full">No order to display</p>
                            ) : (
                                <>
                                    {orders.map((order) => (
                                        <div key={order.id} className="shadow-sm rounded-lg bg-white mb-4 ">
                                            <div className="rounded-t-lg  border border-b shadow-t-md bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6">
                                                <div className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                                    <div className="flex justify-between sm:block">
                                                        <div className="font-medium text-gray-900">Order Date</div>
                                                        <div className="sm:mt-1">
                                                            <div dateTime={order.order_date}>{order.order_date}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                                        <div className="font-medium text-gray-900">Order ID</div>
                                                        <div className="sm:mt-1">{order.id}</div>
                                                    </div>
                                                    <div classNamte="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                                        <div className="font-medium text-gray-900">Order Status</div>
                                                        <div className={`font-medium sm:mt-1 ${order.order_status === 'pending' ? 'text-yellow-500' : order.order_status === 'processing' ? 'text-blue-500' : order.order_status === 'completed' ? 'text-green-500' : order.order_status === 'cancelled' ? 'text-red-500' : 'text-gray-500'}`}>
                                                            {order.order_status}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:w-auto"
                                                    onClick={() => handleOrderDetail(order, "View Details", "view_order_detail")}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                            <div className=" p-4  md:p-6">
                                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                    <img
                                                        className="h-20 w-20 dark:hidden"
                                                        // src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                                        src={order.service.cover_photo}
                                                        alt="imac image"
                                                    />
                                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                        <p className="text-base font-bold text-gray-900 dark:text-white">
                                                            {order.service.start_time} to {order.service.end_time}
                                                        </p>
                                                        <div className="text-end md:order-4 md:w-32">
                                                            <p className="text-base font-bold text-gray-900 dark:text-white">
                                                                ${order.order_price}.00
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                        <p className="text-base font-medium text-gray-900 ">{order.service.service_name}</p>
                                                        <p
                                                            className="text-base font-sm text-gray-900 " >
                                                            {order.service.description}
                                                        </p>
                                                        <div className="flex items-center gap-4">
                                                            {userInfo && userInfo.roles.title === 'customer' &&
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium  shadow-sm inline-flex items-center text-gray-500 hover:bg-gray-500 hover:text-white"
                                                                        onClick={() => handleOrderDetail(order, "Edit Order", "edit_order")}>

                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className={`${order.order_status === "cancelled" || order.order_status === "completed" ? "hidden opacity-0" : "opacity-1"} border border-gray-300 bg-white px-4 py-2 text-sm font-medium  shadow-sm hover:bg-red-600 inline-flex items-center text-red-600 hover:text-white dark:text-red-500`}
                                                                        onClick={() => handleOrderDetail(order.id, "Cance Order", "cancel_order")}>
                                                                        Cancel Order
                                                                    </button>
                                                                </>}

                                                            {userInfo && userInfo.roles.title === 'service_provider' &&
                                                                <>
                                                                    {order.order_status === "pending" && <>
                                                                        <button
                                                                            type="button"
                                                                            className="border border-[#1DBF73] bg-white px-4 py-2 text-sm font-medium  shadow-sm inline-flex items-center text-[#1DBF73] hover:bg-[#1DBF73] hover:text-white"
                                                                            onClick={() => handleServiceProviderOrderAction(order.id, "processing")}>

                                                                            Accept Order
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="border border-red-600 bg-white px-4 py-2 text-sm font-medium  shadow-sm hover:bg-red-600 inline-flex items-center text-red-600 hover:text-white dark:text-red-500"
                                                                            onClick={() => handleServiceProviderOrderAction(order.id, "cancelled")}>

                                                                            Reject Order
                                                                        </button>
                                                                    </>}
                                                                    {order.order_status === "processing" && <>
                                                                        <button
                                                                            type="button"
                                                                            className="border border-[#1DBF73] bg-white px-4 py-2 text-sm font-medium  shadow-sm inline-flex items-center text-[#1DBF73] hover:bg-[#1DBF73] hover:text-white"
                                                                            onClick={() => handleServiceProviderOrderAction(order.id, "completed")}>

                                                                            Complete Order
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="border border-red-600 bg-white px-4 py-2 text-sm font-medium  shadow-sm hover:bg-red-600 inline-flex items-center text-red-600 hover:text-white dark:text-red-500"
                                                                            onClick={() => handleServiceProviderOrderAction(order.id, "cancelled")}>

                                                                            Cancel Order
                                                                        </button>
                                                                    </>}
                                                                </>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <OrderDetailModalForm
                        orderData={orderData}
                        setOrderData={setOrderData}
                        modalDetail={modalDetail}
                        setOrders={setOrders}
                        setModalDetail={setModalDetail} />

                </div>
            </div>
        </>
    )
}
export default Order