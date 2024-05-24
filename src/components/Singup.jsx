import React, { useState } from "react";
import { Input } from "../components/Input";
import {Button} from ".";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
export default function Singup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    async function handleSignup(event) {
        event.preventDefault();
        setError("");
        try {
            const session = authService.signUp(email, password, name);
            if (session) {
                const userData = authService.getCurrentUser();
                if (userData) {
                    useDispatch()(login(userData));
                }
            }
        }
        catch (error) {
            setError(error.message);
        }
    }
    return (
        <form className=" max-w-[50%] flex flex-col items-center justify-center my-20 shadow rounded-lg p-8 bg-white" onSubmit={handleSignup}>
            
            {error && <p className="text-red-500 self-start">{error}</p>}
            <Input 
            type = "text"
            placeholder = "Enter Name.."
            value = {name}
            setValue = {setName}
            />
            <Input 
            type = "text"
            placeholder = "Enter Email.."
            value = {email}
            setValue = {setEmail}
            />
            <Input
            type = "password"
            placeholder = "Enter Password.."
            value = {password}
            setValue = {setPassword}
            />
            <Button
            type = "submit"
            title = "Sign up"
            />
        </form>
    )
}