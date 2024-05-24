import React from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import {logout} from "../store/authSlice"
export default function Logout() {
    function handleLogout() {
        authService.logOut().then(() => useDispatch()(logout())).catch((error) => console.log("error in logout", error));
    }
    return (
        <button
        onClick={handleLogout}
        className="bg-gray-800 text-white px-3 py-1 rounded-md font-light">Log out</button>
    )
}