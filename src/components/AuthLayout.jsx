import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setProgress} from "../store/authSlice";
export default function AuthLayout({children, authentication = false}) {
    const loading = useSelector(state => state.auth.loading);
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    // let getInfo = localStorage.getItem("cookieFallback");
    // const dispatcher = useDispatch();
    // if (getInfo) {
    //     getInfo = JSON.parse(getInfo);
    //     if (getInfo.a_session_664cc0bf00260dacc8ff) dispatcher(activeStatus());
    // }
    useEffect(() => {
        if (!loading) {
            if (authentication && authStatus === false) {
                navigate("/login");
            }
            else if (!authentication && authStatus === true) {
                navigate("/");
            }
        }
    }, [authStatus, navigate]);
    return loading ? null : <>{children}</>
}