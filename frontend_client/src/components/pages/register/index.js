import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StepperControl from "../../StepperControl"
import Stepper from "../../Stepper";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import { RegisterValidation } from "../../../helper/Validation/registerValidation";
import {
    useStateProvider
} from '../../context/StateContext'
import { reducerCases } from "../../context/constants";
import {
    LOGIN_ROUTE, SIGNUP_ROUTE, SET_USER_VERIFY_EMAIL
} from "../../Common/utils/constants";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import LoadingIndicator from "../../loadingIndicator";


function Register() {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1)
    const [{ verifyEmail }, dispatch] = useStateProvider();
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        repassword: "",
        gender: ""
    });
    let [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        
        const { first_name, last_name, email, phone, password, gender } = data
        console.log(data)
        const headers = {
            "Content-Type": "application/json",
        };
        setLoading(true)
        await axios
            .post(
                SIGNUP_ROUTE,
                {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    password: password,
                    gender: gender
                },
                // { headers }
            )
            .then((response) => {
                console.log("Success ========>", response.data.data);
                toast.success(response.data.message)
                setLoading(false)
                dispatch({ type: reducerCases.SET_USER_VERIFY_EMAIL, verifyEmail: data.email });
                navigate("/verify-account")
            })
            .catch((error) => {
                setLoading(false)
                toast.error("Something went wrong")
                // toast.error("Something went wrong", {
                //     position: "bottom-right",
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                // });
                if (error.response.status == 409) {
                    setLoading(false)
                    toast.error(error.response.data.message)
                    // alert(error.response.data.message)
                }
                else if (error.response.status == 400) {
                    setLoading(false)
                    toast.error(error.response.data.message)
                    // alert(error.response.data.message)
                }
                console.log("Error ========>", error);
            });
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
            const errors = RegisterValidation(data)
            setErrors(errors)
            if (!errors.hasErrors) {
                handleRegister()
            }
        }
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
    }

    return (
        <>
         {loading && <LoadingIndicator />}
            <div className="flex items-center justify-center min-h-screen">
                <div className="relative flex flex-col m-6 space-y-4 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 border-2 border-gray-100">
                    <div className="relative">
                        <img
                            src="form-side.png"
                            alt="img"
                            className="w-[400px] h-full hidden rounded-l-2xl md:block object-cover"
                        />
                        <div className="text-white absolute hidden top-[28%] right-6 p-8 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                            <span className="text-white text-xl">
                                We've been using Untitle to kick"
                                <br />
                                start every new project and can't <br />
                                imagine working without it."
                            </span>
                        </div>
                    </div>
                    <div className="rounded flex flex-col justify-center p-6  md:p-14">
                        <h3 className="text-2xl font-bold text-slate-700">
                            Create your account
                        </h3>
                        <span className=" text-gray-400 mb-6">
                            Welcom! Please enter your details
                        </span>
                        <Stepper
                            steps={steps}
                            currentStep={currentStep}
                        />
                        {displayStep(currentStep)}
                        <StepperControl
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                        />
                        <div className="text-gray-400 mb-2">
                            Already have an account?
                            <Link to="/login" className="ml-2 font-bold text-black">Sign up</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Register;
