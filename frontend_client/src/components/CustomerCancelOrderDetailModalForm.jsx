import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useStateProvider } from "./context/StateContext";
import { reducerCases } from "./context/constants";
import { CreateOrderValidation } from "../helper/Validation/createOrderValidation"
import axios from "axios";
import { CREATE_ORDER_ROUTE } from "./Common/utils/constants"
import { toast } from "react-toastify";

const CustomerCancelOrderModalForm = () => {
    let { id } = useParams();
    const [{ showCustomerCancelOrderModal, authData }, dispatch] = useStateProvider();
    const [data, setData] = useState({
        service_id: id || "",
        order_date: "",
        payment_method: "",
        additional_notes: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleCloseOrderForm = () => {
        dispatch({
            type: reducerCases.CLOSE_ORDER_MODAL,
            showCustomerCancelOrderModal: false,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = CreateOrderValidation(data);
        setErrors(errors);
        if (!errors.hasErrors) {
            const orderData = {
                service_id: data.service_id,
                order_date: data.order_date,
                payment_method: data.payment_method,
                additional_notes: data.additional_notes
            };
            try {
                const response = await axios.post(CREATE_ORDER_ROUTE, orderData, {
                    headers: {
                        Authorization: `Bearer ${authData}`,
                    },
                });
                toast.success(response.data.message)
                // alert(response.data.message)
                dispatch({
                    type: reducerCases.CLOSE_ORDER_MODAL,
                    showOrderModal: false,
                });
                setData({
                    service_id: id || "",
                    order_date: "",
                    payment_method: "",
                    additional_notes: ""
                })
            } catch (error) {
                toast.error(error.response.data.message)
                // alert(error.response.data.message)
                console.log(error)
            }
        }
    };

    return (
        <>
            {showCustomerCancelOrderModal && (
                <>
                    {/* Main modal */}
                    <div className="bg-black bg-opacity-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative p-2 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Book Your Order
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={handleCloseOrderForm}
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
                                {/* Modal body */}
                                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                    <div className="grid gap-4 mb-4">
                                        <div>
                                            <label
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Service ID
                                            </label>
                                            <input
                                                type="text"
                                                name="service_id"
                                                id="service_id"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Enter Service ID"
                                                value={data.service_id}
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
                                                value={data.order_date}
                                                onChange={handleChange}
                                            />
                                            {errors.order_date && <span className="text-sm text-red-500">{errors.order_date}</span>}
                                        </div>
                                        <div>
                                            <label
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Payment Method
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="payment_method"
                                                        value="jazzcash"
                                                        className="text-primary-600 form-radio focus:ring-primary-500 dark:focus:ring-primary-500 dark:text-primary-600"
                                                        onChange={handleChange}
                                                    />
                                                    <span className="ml-2">Jazzcash</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="payment_method"
                                                        value="easypaisa"
                                                        className="text-primary-600 form-radio focus:ring-primary-500 dark:focus:ring-primary-500 dark:text-primary-600"
                                                        onChange={handleChange}
                                                    />
                                                    <span className="ml-2">Easypaisa</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="payment_method"
                                                        value="cod"
                                                        className="text-primary-600 form-radio focus:ring-primary-500 dark:focus:ring-primary-500 dark:text-primary-600"
                                                        onChange={handleChange}
                                                    />
                                                    <span className="ml-2">COD</span>
                                                </div>
                                            </div>
                                            {errors.payment_method && <span className="text-sm text-red-500">{errors.payment_method}</span>}
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
                                                value={data.additional_notes}
                                                onChange={handleChange}
                                            />
                                            {errors.additional_notes && <span className="text-sm text-red-500">{errors.additional_notes}</span>}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="text-white inline-flex items-center bg-[#1DBF73] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        <svg
                                            className="me-1 -ms-1 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Order Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}



        </>
    )
}

export default CustomerCancelOrderModalForm;
