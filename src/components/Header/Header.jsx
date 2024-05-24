import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../Logout";
export default function Header() {
    const authStatus = useSelector(state => state.status);
    // const authStatus = true;
    // const navigate = useNavigate();
    const navItems = [
        {
            title: "Home",
            path: "/",
            active: true
        },
        {
            title: "Sing Up",
            path: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            path: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            path: "/add-post",
            active: authStatus
        }
    ]
    return (
        <header className="flex h-10 justify-between items-center px-6 md:px-24 shadow-md py-6 sticky top-0 w-full bg-white">
            <div className="text-xl">
                {/* <Link to = "">🖋</Link>
                 */}
                 🖋
            </div>
            <nav>
                <ul className="flex gap-4 items-center">
                {
                    navItems.map((i) => (
                        i.active ? (
                            <li key={i.title}>
                                <button
                                // onClick={() => navigate(i.path)}
                                className="font-medium text-gray-800 hover:underline"
                                >{i.title}</button>
                            </li>
                        ) : null
                    ))
                }
                {authStatus && <Logout />}
                </ul>
            </nav>
        </header>
    )
}