
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterSection from "../../filterAllServices";
import {
    useStateProvider
} from '../../context/StateContext'
import { reducerCases } from "../../context/constants";
import { GET_MY_SERVICE_DATA_ROUTE, SWITCH_ROLE } from "../../Common/utils/constants";
import ServiceCard from "../../ServiceCard";
import FilterMyServices from "../../filterMyServices";
import LoadingIndicator from "../../loadingIndicator";

function MyService() {
    const [loading,setLoading] = useState(false)
    const [myServices, setMyServices] = useState([]);
    const [message, setMessage] = useState(null)
    const [{ authData, userInfo, isSeller }, dispatch] = useStateProvider();
    useEffect(() => {
        const getMyServices = async () => {
            setLoading(true)
            try {
                const response = await axios.get(GET_MY_SERVICE_DATA_ROUTE, {
                    headers: {
                        Authorization: `Bearer ${authData}`,
                    }
                });
                
                const res = response.data.data;
                const serverBaseUrl = "http://localhost:4000";
                const updatedMyService = res.map((service, index) => {
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
                setLoading(false)
                setMyServices(updatedMyService);
                setMessage(null)
            } catch (err) {
                setLoading(false)
                setMessage("Please Switch your role to service_provider to view your services")
            }
        };
        getMyServices()
    }, [isSeller]);

    return (
        <>
            {loading && <LoadingIndicator/>}
            {message === null ?
                <>
                    <FilterMyServices setMyServices={setMyServices} />
                    {myServices.length === 0 ?
                        <div className="max-w-screen-xl mx-auto p-5">
                            <p className="h-full flex justify-center my-5 py-22 md:p-6 text-gray-500 text-center text-2xl">No Service Found</p>
                        </div>
                        :
                        <>
                            <div className="max-w-screen-xl mx-auto p-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                    <ServiceCard services={myServices} />
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

export default MyService;
