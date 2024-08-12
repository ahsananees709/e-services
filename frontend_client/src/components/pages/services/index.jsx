
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterSection from "../../filterAllServices";
import {
    useStateProvider
} from '../../context/StateContext'
import { reducerCases } from "../../context/constants";
import { GET_SERVICE_ROUTE } from "../../Common/utils/constants";
import ServiceCard from "../../ServiceCard";
import FilterAllServices from "../../filterAllServices";
import { toast } from "react-toastify";
import LoadingIndicator from "../../loadingIndicator";

function Service() {
    const [loading,setLoading] = useState(false)
    const [allServices, setAllServices] = useState([]);
    const [{ authData, userInfo }, dispatch] = useStateProvider();
    useEffect(() => {
        const getServices = async () => {
            try {
                setLoading(true)
                const response = await axios.get(GET_SERVICE_ROUTE);
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
                setLoading(false)
                toast.success("Services Fetched Successfuly")
                setAllServices(updatedResponse);
            } catch (err) {
                setLoading(false)
                toast.error(err.response.data.message)
            }
        };
        getServices();
    }, []);

    return (
        <>
            {loading && <LoadingIndicator/>}
            <FilterAllServices setServices={setAllServices} />
            {allServices.length === 0 ? <div className="max-w-screen-xl mx-auto p-5">
                <p className="h-full flex justify-center my-5 py-22 md:p-6 text-gray-500 text-center text-2xl">No Service Found</p>
            </div>
                :
                <>
                    <div className="max-w-screen-xl mx-auto p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            <ServiceCard services={allServices} />
                        </div>
                    </div>
                </>
            }
        </>

    );
}

export default Service;
