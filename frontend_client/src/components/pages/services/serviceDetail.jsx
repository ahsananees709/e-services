import React, { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {
    useStateProvider
} from '../../context/StateContext'
import { reducerCases } from "../../context/constants";
import { GET_SERVICE_DATA_ROUTE } from "../../Common/utils/constants";
import axios from "axios";
import Details from '../../Services/Details';
import Pricing from '../../Services/Pricing';
import LoadingIndicator from '../../loadingIndicator';

const ServiceDetail = () => {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    let { id } = useParams();
    const [{ gigData, userInfo, authData }, dispatch] = useStateProvider();

    useEffect(() => {
        dispatch({ type: reducerCases.SET_GIG_DATA, gigData: undefined });
    }, [dispatch]);
    useEffect(() => {
        const fetchGigData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${GET_SERVICE_DATA_ROUTE}/${id}`, {
                    // headers: {
                    //     Authorization: `Bearer ${authData}`,
                    // }
                });
                setLoading(false)
                let serviceInfo = response.data.data;
                if (serviceInfo.specificService.cover_photo) {
                    const filePath = serviceInfo.specificService.cover_photo;
                    const serverBaseUrl = "http://localhost:4000"; // Update with your server's base URL
                    const relativePath = filePath.replace(/\\/g, "/").replace(/^public\//, "");
                    const imageUrl = `${serverBaseUrl}/${relativePath}`;
                    serviceInfo = {
                        ...serviceInfo,
                        cover_photo: imageUrl

                    };
                }
                if (serviceInfo.specificService.user.profile_picture) {
                    const filePath = serviceInfo.specificService.user.profile_picture;
                    const serverBaseUrl = "http://localhost:4000"; // Update with your server's base URL
                    const relativePath = filePath.replace(/\\/g, "/").replace(/^public\//, "");
                    const imageUrl = `${serverBaseUrl}/${relativePath}`;
                    serviceInfo = {
                        ...serviceInfo,
                        imageName: imageUrl,
                    };
                }
                delete serviceInfo.specificService.cover_photo
                delete serviceInfo.specificService.user.profile_picture;
                dispatch({
                    type: reducerCases.SET_GIG_DATA, gigData: serviceInfo,
                });
            } catch (err) {
                setLoading(false)
                if (err.response.data.message) {
                    navigate("/login")
                }
            }
        };
        if (id) fetchGigData();
    }, []);
    return (
        <>
            {loading && <LoadingIndicator/>}
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-5">
            <div className="grid grid-cols-1 gap-20 lg:gap-20 md:gap-5 md:grid-cols-3 lg:grid-cols-3">
                <Details />
                <Pricing />
            </div>
            </div>
            </>
    )
}

export default ServiceDetail
