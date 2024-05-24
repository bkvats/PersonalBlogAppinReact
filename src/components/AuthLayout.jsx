import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function AuthLayout({children}) {
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.status);
    const navigate = useNavigate();
    useEffect(() => {
        if(!authStatus){
            navigate("/login")
        }
        setLoader(false);
    }, [authStatus, navigate])
    return loader ? <h1>Loading....</h1> : <>{children}</>
}