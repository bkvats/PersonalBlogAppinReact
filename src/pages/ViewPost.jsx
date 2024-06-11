import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import dbService from "../appwrite/database";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function ViewPost() {
    let { slug } = useParams();
    const [postData, setPostData] = useState({});
    const blogs = useSelector(state => state.blog.blogs);
    useEffect(() => {
        dbService.getPost(slug).then((value) => {
            setPostData(value);
        })
    }, []);
    return (
        postData.title &&
        <div className="flex flex-col gap-4 items-center w-9/12 min-h-[88vh]">
            <p className="self-end mt-2 font-light">{postData.date}</p>
            <h1 className="text-2xl md:text-5xl font-bold my-2 text-center shadow-lg p-4 rounded-md">{postData.title}</h1>
            <div className="w-[250px] h-[141px] md:w-[600px] md:h-[338px] rounded-md overflow-hidden mb-4">
                <img
                    className="w-[250px] h-[141px] md:w-[600px] md:h-[338px] object-center object-cover"
                    src={postData.imgUrl} alt={postData.title} />
            </div>
            <div>
                <span className="text-4xl">{postData.content[0]}</span>
                <span className="font-light text-xl text-justify">{parse(postData.content.slice(1, postData.content.length))}</span>
            </div>
            <hr className="border-2 border-gray-800 w-full" />
            <div className="my-14 w-full">
                <p className="underline text-xl">Read More Blogs & Articles</p>
                <div className="flex gap-2">
                    {
                        blogs.map(i => i.$id != slug && (
                            <Link to = {`/${i.$id}`} className="my-4 flex flex-col px-4 py-6 w-full  rounded-3xl items-center justify-center bg-white hover:shadow-lg" key={i.$id}>
                                <div className="w-[250px] h-[141px] rounded-md overflow-hidden">
                                    <img
                                        className="w-[250px] h-[141px] object-center object-cover"
                                        src={`${i.imgUrl}`} alt={i.title} />
                                </div>
                                <div>
                                    <p className="text-gray-500 mt-2 mb-6">{i.date}</p>
                                    <h1 className="text-2xl font-bold text-gray-800">{i.title}</h1>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}