import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_ALL_CATEGORIES, GET_FILTER_SERVICE_ROUTE } from '../Common/utils/constants';
import ServiceCard from "../ServiceCard";
import { useStateProvider } from "../context/StateContext";

function Search() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const [{ authData, userInfo, isSeller }, dispatch] = useStateProvider();
    const [filteredServices, setFilteredServices] = useState([])
    const [message, setMessage] = useState(null)

    const filterServices = async (searchedCategoryId) => {
        try {
            const response = await axios.get(GET_FILTER_SERVICE_ROUTE, {
                params: {
                    category_id: searchedCategoryId,
                },
            });
            const res = response.data.data;
            const serverBaseUrl = "http://localhost:4000";
            const updatedResponse = res.map((service, index) => {
                if (service.cover_photo) {
                    const fileCoverPath = service.cover_photo;
                    const relativeCoverPath = fileCoverPath.replace(/\\/g, "/").replace(/^public\//, "");
                    const coverPhotoUrl = `${serverBaseUrl}/${relativeCoverPath}`;
                    service = {
                        ...service,
                        cover_photo: coverPhotoUrl
                    };
                }
                if (service.user && service.user.profile_picture) {
                    const fileProfilePath = service.user.profile_picture;
                    const relativeProfilePath = fileProfilePath.replace(/\\/g, "/").replace(/^public\//, "");
                    const profilePhotoUrl = `${serverBaseUrl}/${relativeProfilePath}`;
                    service = {
                        ...service,
                        profile_picture: profilePhotoUrl // Add profile_photo property
                    };
                }
                return service;
            })
            console.log("FilteredCategoryServiceResponse", updatedResponse);
            setFilteredServices(updatedResponse);
        } catch (error) {
            console.error("Error filtering services:", error);
        }
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(GET_ALL_CATEGORIES
                    , {
                        headers: {
                            Authorization: `Bearer ${authData}`,
                        },
                    }
                );
                console.log("categories", response.data.data)
                const searchedCategory = response.data.data.find(c => c.title === category);
                console.log(searchedCategory)
                if (searchedCategory) {
                    const searchedCategoryId = searchedCategory.id;
                    console.log("searched category ID:", searchedCategoryId);
                    filterServices(searchedCategoryId)
                    setMessage(null)
                } else {
                    setMessage("No Such Category Found")
                    console.log(`${category} category not found`);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, [category]);

    return (
        <>
            <h1 className="text-xl font-semibold py-4 px-8  tracking-tight text-gray-900 sm:text-2xl">Search Results for {category}</h1>
            {message === null ?
                <>
                    {filteredServices.length === 0 ?
                        <div className="max-w-screen-xl mx-auto p-5">
                            <p className="h-full flex justify-center my-5 py-22 md:p-6 text-gray-500 text-center text-2xl">No Service Found for {category}</p>
                        </div>
                        :
                        <>
                            <div className="max-w-screen-xl mx-auto p-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                    <ServiceCard services={filteredServices} />
                                </div>
                            </div>
                        </>
                    }
                </>
                :
                <div className="max-w-screen-xl mx-auto p-5">
                    <p className="h-full flex justify-center my-5 py-22 md:p-6 text-gray-500 text-center text-2xl">{message}</p>
                </div>
            }
        </>
    );
}

export default Search;
