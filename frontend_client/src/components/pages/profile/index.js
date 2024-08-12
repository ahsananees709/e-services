import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    useStateProvider
} from '../../context/StateContext'
import Create from "./create";
import { GET_USER_INFO } from "../../Common/utils/constants"
import axios from "axios";
import { reducerCases } from "../../context/constants";


function Profile() {
    const navigate = useNavigate()
    const [{ userInfo }, dispatch] = useStateProvider();
    return (
        <>
        {userInfo ? 
        <Create user={userInfo}/>
        : null }
        </>
    );
}

export default Profile;
