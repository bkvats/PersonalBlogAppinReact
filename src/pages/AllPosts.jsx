import React, { useEffect, useState } from "react";
import dbService from "../appwrite/database";
import authService from "../appwrite/auth";

export default function AllPosts() {
    const [imageUrl, setImageUrl] = useState("");
    useEffect(() => {
        authService.getCurrentUser().then((value) => {
            console.log(value);
        })
        authService.getFile("6667299c0009026e3078").then((value) => {
            console.log(value.href);
            setImageUrl(value.href);
        })
    }, [])
    return (
        <div>
            <img src={imageUrl} alt="image can't be displayed" />
        </div>
    )
}