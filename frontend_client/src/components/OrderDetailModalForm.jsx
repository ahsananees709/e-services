import React, { useState, useEffect } from "react";
import { useStateProvider } from "./context/StateContext";
import { reducerCases } from "./context/constants";
import axios from "axios";
import { CANCEL_ORDER_ROUTE, EDIT_ORDER_ROUTE } from "./Common/utils/constants";
import { UpdateOrderValidation } from "../helper/Validation/createOrderValidation"
import { toast } from "react-toastify";
import LoadingIndicator from "./loadingIndicator";

const OrderDetailModalForm = ({ orderData, setOrderData, modalDetail, setModalDetail, setOrders }) => {
    const [loading,setLoading] = useState(false)
    const [data, setData] = useState({
        order_id: orderData.id || "",
        order_date: orderData.order_date || "",
        additional_notes: orderData.additional_notes || ""
    });
    const [errors, setErrors] = useState({});
    const [{ showOrderDetailModal, userInfo, authData }, dispatch] = useStateProvider();
    const handleCloseOrderDetail = () => {
        dispatch({
            type: reducerCases.CLOSE_ORDER_DETAIL_MODAL,
            showOrderDetailModal: false,
        });
        setOrderData('')
        setModalDetail({
            modalHeader: "",
            modalContent: ""
        })
    };
    const [cancellation_reason, setCancellationReasons] = useState("")
    const [cancellationErrors, setCancellationErrors] = useState("");
    const handleChange = (e) => {
        const { value } = e.target;
        setCancellationReasons(value);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };
    const handleCancelOrder = async (e) => {
        e.preventDefault()
        try {
            if (cancellation_reason === '') {
                setCancellationErrors('Cancellation reasons are required')
            }
            else {
                setLoading(true)
                await axios
                    .patch(
                        `${CANCEL_ORDER_ROUTE}/${orderData}`,
                        {
                            cancellation_reason: cancellation_reason
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${authData}`,
                            },
                        }
                    )
                    .then((response) => {
                        setLoading(false)
                        toast.success("Order cancelled successfully")
                        // alert("Order cancelled successfully")
                        dispatch({
                            type: reducerCases.CLOSE_ORDER_DETAIL_MODAL,
                            showOrderDetailModal: false,
                        });
                        setOrderData('')
                        setModalDetail({
                            modalHeader: "",
                            modalContent: ""
                        })
                        setOrders([])
                        console.log("Cancel Order Success ========>", response);
                    })
                    .catch((error) => {
                        setLoading(false)
                        toast.error(error.response.data.message)
                    });
            }
        } catch (err) {
            setLoading(false)
            console.log(err);
        }
    };
    const handleEditOrder = async (e) => {
        e.preventDefault()
        try {
            const errors = UpdateOrderValidation(data);
            setErrors(errors);
            if (!errors.hasErrors) {
                setLoading(true)
                await axios
                    .patch(
                        `${EDIT_ORDER_ROUTE}/${orderData.id}`,
                        {
                            order_date: data.order_date,
                            additional_notes: data.additional_notes
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${authData}`,
                            },
                        }
                    )
                    .then((response) => {
                        setLoading(false)
                        toast.success("Order updated successfully")
                        // alert("Order updated successfully")
                        dispatch({
                            type: reducerCases.CLOSE_ORDER_DETAIL_MODAL,
                            showOrderDetailModal: false,
                        });
                        setOrderData('')
                        setModalDetail({
                            modalHeader: "",
                            modalContent: ""
                        })
                        setData("")
                        setOrderData("")
                        console.log("Edit Order Success ========>", response);
                    })
                    .catch((error) => {
                        setLoading(false)
                        toast.error(error.response.data.message)
                        // alert(error.response.data.message)
                        console.log(error)
                    });
            }
        } catch (err) {
            setLoading(false)
            console.log(err);
        }
    };
    const header = <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
        <h3 className="text-lg font-semibold ">
            {modalDetail.modalHeader}
        </h3>
        <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleCloseOrderDetail}
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
    const modalContent = () => {
        switch (modalDetail.modalContent) {
            case "view_order_detail":
                return (
                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm font-medium">{userInfo && userInfo.roles.title === 'customer' ? 'Service Provider' : 'Customer'}</p>
                                {orderData.customer && <p className="text-gray-900 text-sm font-sm">{orderData.customer.first_name} {orderData.customer.last_name}</p>}
                                {orderData.serviceProvider && <p className="text-gray-900 text-sm font-sm">{orderData.serviceProvider.first_name} {orderData.serviceProvider.last_name}</p>}
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm font-medium">City</p>
                                {orderData.customer && <p className="text-gray-900 text-sm font-sm">{orderData.customer.address.city}</p>}
                                {orderData.serviceProvider && <p className="text-gray-900 text-sm font-sm">{orderData.serviceProvider.address.city}</p>}
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm font-medium">State</p>
                                {orderData.customer && <p className="text-gray-900 text-sm font-sm">{orderData.customer.address.state}</p>}
                                {orderData.serviceProvider && <p className="text-gray-900 text-sm font-sm">{orderData.serviceProvider.address.state}</p>}
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm font-medium">Country</p>
                                {orderData.customer && <p className="text-gray-900 text-sm font-sm">{orderData.customer.address.country}</p>}
                                {orderData.serviceProvider && <p className="text-gray-900 text-sm font-sm">{orderData.serviceProvider.address.country}</p>}
                            </div>
                            <hr />
                            <hr />
                            <div className="mb-4 mt-4">
                                <p className="text-gray-700 text-sm font-medium">Category</p>
                                <p className="text-gray-900 text-sm font-sm">{orderData.service.category_id
                                }</p>
                            </div>
                            <div className="mb-4 mt-4">
                                <p className="text-gray-700 text-sm font-medium">Payment Method</p>
                                <p className="text-gray-900 text-sm font-sm">{orderData.payment_method}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm font-medium">Payment Status</p>
                                <p className={`text-sm font-sm ${orderData.payment_status === 'pending' ? 'text-yellow-500' : orderData.payment_status === 'processing' ? 'text-blue-500' : orderData.payment_status === 'completed' ? 'text-green-500' : orderData.payment_status === 'cancelled' ? 'text-red-500' : 'text-gray-500'}`}>{orderData.payment_status}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm font-medium">Order Completion Date</p>
                                <p className={`${orderData.order_completion_date === null ? 'text-red-700' : 'text-gray-500'} text-sm font-sm`}>{orderData.order_completion_date === null ? 'N/A' : orderData.order_completion_date
                                }</p>
                            </div>
                            <hr />
                            <hr />
                        </div>
                        {/* Additional Notes */}
                        <div className="mb-4 mt-4">
                            <p className="text-gray-700 text-sm font-medium">Additional Notes</p>
                            <p className="text-gray-900 text-sm font-sm">{orderData.additional_notes}</p>
                        </div>
                        {/* Cancellation Reason */}
                        <div className="mb-4">
                            <p className="text-gray-700 text-sm font-medium">Cancellation Reason</p>
                            <p className={`${orderData.cancellation_reason === null ? 'text-red-700' : 'text-gray-500'} text-sm font-sm`}>{orderData.cancellation_reason === null ? 'N/A' : orderData.cancellation_reason}</p>
                        </div>
                    </div>
                )
            case "cancel_order":
                return (
                    <form className="p-4 md:p-5" onSubmit={(e) => handleCancelOrder(e)}>
                        <div className="grid gap-4 mb-4">
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Order ID
                                </label>
                                <input
                                    type="text"
                                    name="order_id"
                                    id="order_id"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter order_id"
                                    value={orderData}
                                    disabled={true}
                                />
                                <div>
                                    <label
                                        className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Cancellation Reasons
                                    </label>
                                    <textarea
                                        id="cancellation_reason"
                                        name="cancellation_reason"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write you cancellation reasons here"
                                        value={cancellation_reason}
                                        onChange={handleChange}
                                    />
                                    {cancellationErrors && <span className="text-sm text-red-500">{cancellationErrors}</span>}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="lg:w-[30%] sm:w-auto text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Cancel Order
                            </button>
                        </div>
                    </form>
                )
            case "edit_order":
                return (
                    <form className="p-4 md:p-5" onSubmit={(e) => handleEditOrder(e)}>
                        <div className="grid gap-4 mb-4">
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Order ID
                                </label>
                                <input
                                    type="text"
                                    name="order_id"
                                    id="order_id"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter Order ID"
                                    value={data?.order_id || orderData.id}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Order Date
                                </label>
                                <input
                                    type="date"
                                    name="order_date"
                                    id="order_date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required=""
                                    value={data?.order_date || orderData.order_date}
                                    onChange={handleEditChange}
                                />
                                {errors.order_date && <span className="text-sm text-red-500">{errors.order_date}</span>}
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Additional Notes
                                </label>
                                <textarea
                                    id="additional_notes"
                                    name="additional_notes"
                                    rows={4}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write additional notes here"
                                    value={data?.additional_notes || orderData.additional_notes}
                                    onChange={handleEditChange}
                                />
                                {errors.additional_notes && <span className="text-sm text-red-500">{errors.additional_notes}</span>}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-white inline-flex items-center bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Edit Order
                        </button>
                    </form>
                )
            default:
        }

    }
    return (
        <>
            {loading && <LoadingIndicator/>}
            {showOrderDetailModal && (
                <div className="bg-black bg-opacity-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
                        {/* Modal Header */}
                        {header}
                        {/* Modal Content */}
                        {modalContent()}
                    </div>
                </div>
            )}

        </>
    );
};

export default OrderDetailModalForm;




