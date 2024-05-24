import React, { useState } from "react";
import { Input, Button } from ".";
import authService from "../appwrite/auth"
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    async function handleLogin() {
        setError("");
        try {
            const session = await authService.logIn(email, password);
            if (session) {
                const userData = await authService.getCurrentUser();
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
        <form className="max-w-[50%] flex flex-col items-center justify-center my-20 shadow rounded-lg p-8 bg-white" onSubmit={handleLogin}>
            
            {error && <p className="text-red-500 self-start">{error}</p>}
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
            title = "Login"
            />
        </form>
    )
}