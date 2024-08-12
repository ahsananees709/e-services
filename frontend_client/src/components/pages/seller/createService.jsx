import ImageUpload from "../../ImageUpload"
import { GET_ALL_CATEGORIES, CREATE_SERVICE_ROUTE, CREATE_SERVICE_COVER_PHOTO, GET_SERVICE_DATA_ROUTE, UPDATE_SERVICE_ROUTE } from "../../Common/utils/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    useStateProvider
} from '../../context/StateContext'
import { reducerCases } from "../../context/constants";
import { ServiceValidation } from "../../../helper/Validation/serviceValidation";
import { toast } from "react-toastify";
import LoadingIndicator from "../../loadingIndicator";

const CreateGig = ({ mode }) => {
    const [loading,setLoading] = useState(false)
    const { id } = useParams()
    const [{ authData, userInfo }, dispatch] = useStateProvider();
    const navigate = useNavigate();
    const [cover_photo, setCoverPhoto] = useState(null);
    const [categories, setCategories] = useState([]);
    let [errors, setErrors] = useState({});
    const [data, setData] = useState({
        service_name: "",
        category_id: "",
        description: "",
        price: 0,
        is_available: false,
        start_time: "",
        end_time: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const addService = async () => {
        const errors = ServiceValidation(data)
        setErrors(errors)
        if (!errors.hasErrors) {
            const { service_name, category_id, description, price, is_available, start_time, end_time } =
                data;
            const serviceData = {
                service_name,
                description,
                category_id,
                price: parseInt(price),
                is_available,
                start_time,
                end_time,
            };
            setLoading(true)
            try {
                const response = await axios.post(CREATE_SERVICE_ROUTE, serviceData, {
                    headers: {
                        Authorization: `Bearer ${authData}`,
                    },
                });
                if (response.data.success === true) {
                    const id = response.data.data.data[0].id;
                    if (cover_photo) {
                        const cover_photo_response = await uploadCoverPhoto(cover_photo, id);
                        if (cover_photo_response) {
                            toast.success("Service and cover photo uploaded successfully!")
                        }
                    }
                    else {
                        toast.success("Service created successfully")
                    }
                }
                setLoading(false)
                navigate("/myservices")
            } catch (error) {
                setLoading(false)
                if (error.response && error.response.status === 401) {
                    navigate("/login")
                }
                else {
                    setLoading(false)
                    toast.error(error.response.data.message)
                    // alert(error.response.data.message)
                }
            }
        }
    };

    const uploadCoverPhoto = async (img, id) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("cover_photo", img);
            const response = await axios.patch(`${CREATE_SERVICE_COVER_PHOTO}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authData}`,
                },
            });
            setLoading(false)
            return response;
        }
        catch (err) {
            setLoading(false)
            toast.error(err.response.data.message)
        }
    }

    const editService = async () => {
        const errors = ServiceValidation(data)
        setErrors(errors)
        if (!errors.hasErrors) {
            const { service_name, category_id, description, price, is_available, start_time, end_time } =
                data;
            const serviceData = {
                service_name,
                category_id,
                description,
                price: parseInt(price),
                is_available,
                start_time,
                end_time,
            };
            setLoading(true)
            try {
                const response = await axios.patch(`${UPDATE_SERVICE_ROUTE}/${id}`, serviceData, {
                    headers: {
                        Authorization: `Bearer ${authData}`,
                    },
                });
                  
                if (response.data.success === true) {
                    const id = response.data.data.updatedService[0].id
                    if (cover_photo) {
                        const cover_photo_response = await uploadCoverPhoto(cover_photo, id);
                    }
                }
                setLoading(false)
                toast.success(response.data.message)
                navigate("/myservices")
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
        }
    };
    useEffect(() => {
        const fetchGigData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${GET_SERVICE_DATA_ROUTE}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authData}`,
                    }
                });
                setLoading(false)
                let serviceInfo = response.data.data.specificService;
                setData(serviceInfo)
            } catch (err) {
                setLoading(false)
                if (err.response.data.message) {
                    navigate("/login")
                }
            }
        };
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const response = await axios.get(GET_ALL_CATEGORIES, {
                    headers: {
                        Authorization: `Bearer ${authData}`,
                    },
                });
                setLoading(false)
                setCategories(response.data.data);
            } catch (error) {
                setLoading(false)
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
        if (id && mode === 'edit') fetchGigData();
    }, []);
    return (
        <>
            {loading && <LoadingIndicator/>}
            <div className="flex min-h-screen justify-center">
                <div className="lg:w-[60%] w-[90%] my-6  lg:px-12 px-4 rounded-2xl  h-auto flex flex-col justify-center p-4 md:p-14 bg-white border-2 border-gray-100">
                    <h3 className="lg:text-2xl text-wrap text-xl font-bold text-slate-700">
                        {mode === "add" ? "Create a new Service" : "Edit your Service"}
                    </h3>
                    <span className=" text-gray-400 mb-6">
                        {mode === "add" ? "Enter the details to create the service" : "Edit the service details"}
                    </span>
                    <div className="lg:flex block justify-between gap-x-4 w-full">
                        <div className="w-full lg:w-1/2 py-2">
                            <span className="mb-2 text-md">Name</span>
                            <div className='flex flex-col'>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                    name="service_name"
                                    value={data.service_name}
                                    onChange={handleChange}
                                    id="service_name"
                                />
                                {errors.service_name && (
                                    <span className="text-sm text-red-600 font-semibold">{errors.service_name}</span>
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 py-2">
                            <span className="mb-2 text-md">Select a Category</span>
                            <div className='flex flex-col'>
                                <select
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                    name="category_id"
                                    onChange={handleChange}
                                >
                                    <option disabled={mode == 'edit' ? true : false} hidden={mode == 'edit' ? true : false}>Select a Category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                            selected={category.id === data.category_id}
                                        >
                                            {category.title}
                                        </option>
                                    ))}
                                </select>

                                {errors.category_id && (
                                    <span className="text-sm text-red-600 font-semibold">{errors.category_id}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="py-4">
                        <span className="mb-2 text-md">Description</span>
                        <div className='flex flex-col'>
                            <textarea
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                            />
                            {errors.description && (
                                <span className="text-sm text-red-600 font-semibold">{errors.description}</span>
                            )}
                        </div>
                    </div>
                    <div className="lg:flex block justify-between gap-x-4 w-full">
                        <div className="w-full lg:w-1/2 py-2">
                            <span className="mb-2 text-md">Cover Photo</span>
                            <ImageUpload cover_photo={cover_photo} setCoverPhoto={setCoverPhoto} />
                        </div>
                        <div className="w-full lg:w-1/2 py-2">
                            <span className="mb-2 text-md">Price</span>
                            <div className='flex flex-col'>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={data.price}
                                    onChange={handleChange}
                                />
                                {errors.price && (
                                    <span className="text-sm text-red-600 font-semibold">{errors.price}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="lg:flex block justify-between gap-x-4 w-full">
                        <div className="w-full lg:w-1/2 py-2">
                            <span className="mb-2 text-md">Start Time</span>
                            <div className='flex flex-col'>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                    name="start_time"
                                    value={data.start_time}
                                    onChange={handleChange}
                                />
                                {errors.start_time && (
                                    <span className="text-sm text-red-600 font-semibold">{errors.start_time}</span>
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 py-2">
                            <span className="mb-2 text-md">End Time</span>
                            <div className='flex flex-col'>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                    type="text"
                                    id="end_time"
                                    name="end_time"
                                    value={data.end_time}
                                    onChange={handleChange}
                                />
                                {errors.end_time && (
                                    <span className="text-sm text-red-600 font-semibold">{errors.end_time}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="py-4 font-semibold">
                        <input
                            type="checkbox"
                            className="mx-2 border text-sm border-gray-300 rounded-md "
                            checked={data.is_available}
                            onChange={(e) => setData({ ...data, is_available: e.target.checked })}

                        />
                        <span className="text-md">Available</span>
                    </div>
                    <button className="items-center border w-20 text-center border-[#1DBF73] bg-[#1DBF73] text-white p-2 rounded-lg"
                        onClick={mode === "add" ? addService : editService}
                    >
                        {mode === "add" ? "Create" : "Edit"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreateGig;
