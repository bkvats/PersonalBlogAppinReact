import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dbService from "../appwrite/database";
import { updateBlogs } from "../store/blogSlice";
import PostCard from "../components/PostCard";
import authService from "../appwrite/auth";
export default function Home() {
    const dispatcher = useDispatch();
    const blogs = useSelector(state => state.blog.blogs);
    useEffect(() => {
        dbService.getPosts().then(value => {
            dispatcher(updateBlogs(value.documents));
        }).catch(error => console.log(error));
    }, []);
    return blogs ? <ul>
        {
            blogs.map(i => (
                <li className="flex justify-center" key={i.$id}><PostCard title={i.title} date={i.date} /></li>
            ))
        }
    </ul>: null;
}