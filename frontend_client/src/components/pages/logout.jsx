import { LOGOUT } from "../Common/utils/constants";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingIndicator from "../loadingIndicator";
import { toast } from "react-toastify";

function Logout() {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const [{ authData, userInfo }, dispatch] = useStateProvider();

    useEffect(() => {
        const userLogout = async () => {
            setLoading(true)
            await axios.post(
                LOGOUT,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${authData}`,
                    },
                }
            )
                .then((response) => {
                    setLoading(false)
                    toast.success("Logged Out")
                    dispatch({ type: reducerCases.SET_USER, userInfo: undefined });
                    dispatch({ type: reducerCases.LOGOUT_SUCCESS, authData: null });
                    navigate("/")
                })
                .catch((error) => {
                    setLoading(false)
                    if (error.response.status == 401) {
                        localStorage.removeItem("token")
                    }
                })

        };
        userLogout();
    }, [authData, userInfo]);
    return (
        <>
            {loading && <LoadingIndicator/>}
        <div className="h-[80vh] flex items-center px-20 pt-20 flex-col">
            <h1 className="text-4xl text-center">
                Logout successful. You are being redirected to the main page.
            </h1>
            </div>
            </>
    );
}

export default Logout;
