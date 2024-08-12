import React from 'react'
import { Link } from 'react-router-dom'

const ServiceCard = ({ services }) => {
    return (
        <>
            { services.map((service, index) => (
                <Link to={`/service/${service.id}`} key={index}>
                    <div className="rounded overflow-hidden h-full shadow-lg flex flex-col bg-white">
                        <img
                            className="w-full h-[268px]"
                            src={service.cover_photo}
                            alt="Sunset in the mountains"
                        />
                        <div className="px-6 py-4 mb-auto">
                            <h3
                                className="font-medium text-md mb-2 overflow-hidden" >
                                {service.service_name.split(' ').slice(0, 10).join(' ')}
                            </h3>
                            <p className="text-gray-500 text-sm overflow-hidden">
                                {service.description.split(' ').slice(0, 15).join(' ')}
                            </p>
                        </div>
                        <div className="px-6 flex gap-4">
                            <div>
                                {service.profile_picture ? (
                                    <img
                                        src={service.profile_picture}
                                        alt="profile"
                                        // height={120}
                                        // width={120}
                                        className="h-10 w-10 flex items-center justify-center rounded-full"
                                    />
                                ) : (
                                    <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                                        <span className="text-xl text-white">
                                            {service.user.first_name[0].toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                            <h4 className="font-medium text-md w-full">
                                {service.user.first_name} {' '} {service.user.last_name}
                            </h4>
                            </div>
                        </div>
                        <div className="px-6 py-3 flex justify-between">
                            <p
                                className="py-1 text-md text-gray-900" >
                                <b>From PKR</b> {typeof service.price === 'string' ? parseFloat(service.price).toFixed(2) : 'Invalid Price'} </p>
                            <span
                                className="py-1 text-sm font-regular mr-1 flex flex-row items-center"
                            >
                                <svg
                                    height="13px"
                                    width="13px"
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 512 512"
                                    style={{ enableBackground: "new 0 0 512 512" }}
                                    xmlSpace="preserve"
                                >
                                    <g>
                                        <g>
                                            <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                                        </g>
                                    </g>
                                </svg>
                                <span className="ml-1">{service.start_time}-{service.end_time}</span>
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}

export default ServiceCard