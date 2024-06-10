import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../Logout";
export default function Header() {
    const authStatus = useSelector(state => state.auth.status);
    // const authStatus = true;
    const navigate = useNavigate();
    const loading = useSelector(state => state.auth.loading);
    const userData = useSelector(state => state.auth.userData);
    // const navItems = [
    //     {
    //         title: "Home",
    //         path: "/",
    //         active: true
    //     },
    //     {
    //         title: "Sing Up",
    //         path: "/signup",
    //         active: !authStatus
    //     },
    //     {
    //         title: "All Posts",
    //         path: "/all-posts",
    //         active: authStatus
    //     },
    //     {
    //         title: "Add Post",
    //         path: "/add-post",
    //         active: authStatus
    //     }
    // ]
    return (
        <header className="flex h-10 justify-between items-center px-6 md:px-24 shadow-md py-6 sticky top-0 w-full bg-white">
            <div className="text-xl">
                <Link to="/">🖋</Link>
            </div>
            {loading ? null :
                (authStatus ?
                    (
                        <div>
                            {userData.$id === "6658c8f80019dd21d8d0" && <Link
                                className="underline hover:no-underline mx-4"
                                to="/addpost">Add Post</Link>}
                            <Logout />
                        </div>
                    ) : (<div>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-gray-800 text-white px-3 py-1 rounded-md font-light mx-4 hover:bg-opacity-85">
                            Log in
                        </button>
                        <Link
                            className="underline hover:no-underline"
                            to="/signup">Sign Up</Link>
                    </div>))}
        </header>
    );
}