import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dbService from "../appwrite/database";
import { updateBlogs } from "../store/blogSlice";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
export default function Home() {
    console.log("in the home component..");
    const dispatcher = useDispatch();
    const blogs = useSelector(state => state.blog.blogs);
    useEffect(() => {
        dbService.getPosts().then(value => {
            dispatcher(updateBlogs(value.documents.reverse()));
        }).catch(error => {
            console.log(error)
        });
    }, []);
    return blogs ? <div className="w-full min-h-[88vh]">
        {
            blogs.map(i => (
                <Link to = {`/${i.$id}`} className="flex justify-center m-auto w-8/12 overflow-clip" key={i.$id}><PostCard title={i.title} date={i.date} featuredImage={i.imgUrl} /></Link>
            ))
        }
    </div> : null;
}