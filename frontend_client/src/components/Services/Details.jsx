import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useStateProvider } from "../context/StateContext";
import Reviews from "./Reviews";
import AddReview from "./AddReview";

const Details = () => {
    const [{ gigData, userInfo, authData, hasOrdered, showLoginModal }] = useStateProvider();
    const [currentImage, setCurrentImage] = useState("");
    useEffect(() => {
    }, [gigData]);
    return (
        <>
            {gigData && (
                <div className="col-span-2 flex flex-col gap-3">
                    <h2 className="text-2xl font-bold text-[#404145] mb-1">
                        {gigData.specificService.service_name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <div>
                            {gigData.imageName ? (
                                <img
                                    src={gigData.imageName}
                                    alt="profile"
                                    // height={30}
                                    // width={30}
                                    className="h-12 w-12 flex items-center justify-center rounded-full"
                                />
                            ) : (
                                <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                                    <span className="text-xl text-white">
                                        {gigData.specificService.user.email[0].toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 items-center">
                            <h4 className="text-[rgb(39,39,42)] font-bold">
                                {gigData.specificService.user.first_name}{" "}{gigData.specificService.user.last_name}
                            </h4>
                            <h6 className="text-[#74767e]">{gigData.specificService.user.email}</h6>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[#27272a]">(0)</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="max-h-[1000px] max-w-[1000px] overflow-hidden">
                            <img
                                src={gigData.cover_photo}
                                alt="service_cover_photo"
                                className="hover:scale-110 transition-all duration-500 h-[533px] w-[800px]"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl my-5 font-medium text-[#404145]">
                            About this gig
                        </h3>
                        <div>
                            <p>{gigData.specificService.description}</p>
                        </div>
                    </div>
                    {/* About the seller */}
                    <div className="">
                        <h3 className="text-2xl my-5 font-medium text-[#404145]">
                            About the Seller
                        </h3>
                        <div className="flex gap-4">
                            <div>
                                {gigData.imageName ? (
                                    <img
                                        src={gigData.imageName}
                                        alt="profile"
                                        // height={120}
                                        // width={120}
                                        className="h-12 w-12 flex items-center justify-center rounded-full"
                                    />
                                ) : (
                                    <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                                        <span className="text-xl text-white">
                                            {gigData.specificService.user.email[0].toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex  gap-2 items-center">
                                    <h4 className="font-medium text-lg">
                                        {gigData.specificService.user.first_name}
                                    </h4>
                                    <span className="text-[#74767e]">
                                        {gigData.specificService.user.email}
                                    </span>
                                </div>
                                <div>
                                    <p>{gigData.specificService.user.bio}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-[#74767e]">
                                        <b>Reviews:</b>(0)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Reviews />
                    {/* {hasOrdered && <AddReview />} */}
                    {authData && gigData.specificService.user.id !== userInfo.users.id && (<AddReview />)}
                </div>
            )}
        </>
    )
}

export default Details