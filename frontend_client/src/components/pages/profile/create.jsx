import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StepperControl from "../../StepperControl"
import Stepper from "../../Stepper";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import { CreateProfileValidation } from "../../../helper/Validation/profileValidation";
import {
    useStateProvider
} from '../../context/StateContext'
import { reducerCases } from "../../context/constants";
import {
    COMPLETE_PROFILE,
    SET_USER_IMAGE
} from "../../Common/utils/constants";
import { toast } from "react-toastify";
import LoadingIndicator from "../../loadingIndicator";


function Create({ user }) {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const [{ authData, userInfo }, dispatch] = useStateProvider();
    const [currentStep, setCurrentStep] = useState(1)
    const [imageHover, setImageHover] = useState(false);
    const [image, setImage] = useState(userInfo.users.imageName);
    const [data, setData] = useState({
        bio: "",
        cnic: "",
        street_no: 0,
        city: "",
        state: "",
        postal_code: "",
        country: "",
        location: ""
    });
    let [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleFile = (e) => {
        let file = e.target.files;
        const fileType = file[0]["type"];
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
            setImage(file[0]);
            uploadProfilePicture(file[0])
        }
        else {
toast.error("Not a valid file format")
            // alert("Not a valid file format")
        }
    };
    const uploadProfilePicture = async (img) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("profile_picture", img);
            console.log(img)
            const response = await axios.patch(SET_USER_IMAGE, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authData}`,
                },
            });
            setImage(response.data.data[0].profile_picture)
            setLoading(false)
            toast.success(response.data.message)
        }
        catch (err) {
            setLoading(false)
            toast.error("Error while uploading Profile Photo")
        }
    }
    const handleProfileCompletion = async () => {
        const errors = CreateProfileValidation(data)
        setErrors(errors)
        if (!errors.hasErrors) {
            try {
                
                const { bio, cnic, street_no, city, state, postal_code, country, location } = data;
                let address = {
                    street_no: parseInt(street_no),
                    city: city,
                    state: state,
                    postal_code: postal_code,
                    country: country,
                    location: location
                }
                setLoading(true)
                await axios
                    .patch(
                        COMPLETE_PROFILE,
                        {
                            bio: bio,
                            cnic: cnic,
                            address: address
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${authData}`,
                            },
                        }
                    )
                    .then((response) => {
                        setLoading(false)
                        toast.success("Profile Updated Successfully")
                    })
                    .catch((error) => {
                        setLoading(false)
                        toast.error(error.response.data.message)
                    });
            } catch (err) {
                console.log(err);
            }
        }
    };
    const steps = [
        "Step 1",
        "Step 2"
    ]

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <Step1 errors={errors} handleChange={handleChange} data={data} />
            case 2:
                return <Step2 errors={errors} handleChange={handleChange} data={data} />
            default:
        }
    }


    const handleClick = (direction) => {
        let newStep = currentStep;
        direction === "next" ? newStep++ : newStep--;
        if (newStep > steps.length) {
            handleProfileCompletion()
        }
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
    }
    return (
        <>
            {loading && <LoadingIndicator/>}
            <div className="flex min-h-screen justify-center">
                <div className="lg:w-[60%] w-[90%] my-6  lg:px-12 px-4  h-auto rounded-2xl flex flex-col justify-center p-4 md:p-14 bg-white border-2 border-gray-100">
                    <h3 className="lg:text-2xl text-wrap text-xl font-bold text-slate-700">
                        Complete your profile
                    </h3>
                    <span className=" text-gray-400 mb-6">
                        Please Fill form to get started!
                    </span>
                    <Stepper
                        steps={steps}
                        currentStep={currentStep}
                    />
                    <div className="mb-5 mx-auto bg-purple-500 h-20 w-20 flex items-center justify-center rounded-full relative"
                        onMouseEnter={() => setImageHover(true)}
                        onMouseLeave={() => setImageHover(false)}>
                        {image ? (
                            <img
                                src={image}
                                alt="profile"
                                className="h-20 w-20 rounded-full"
                            />
                        ) : (
                            <span className="text-3xl text-white">
                                {user.users.email[0].toUpperCase()}
                            </span>
                        )}
                        <div
                            className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center justify-center   transition-all duration-100  ${imageHover ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <span
                                className={` flex items-center justify-center  relative cursor-pointer`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-12 h-12 text-black absolute"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    type="file"
                                    onChange={handleFile}
                                    className="opacity-0"
                                    multiple={true}
                                    name="profileImage"
                                />
                            </span>
                        </div>
                    </div>
                    {displayStep(currentStep)}
                    <StepperControl
                        handleClick={handleClick}
                        currentStep={currentStep}
                        steps={steps}
                    />
                </div>
            </div>
        </>
    );
}

export default Create;
