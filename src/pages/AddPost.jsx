import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "../components"
import dbService from "../appwrite/database";
import { ID } from "appwrite";
import { useDispatch } from "react-redux";
import { setProgress, stopLoading } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
export default function AddPost() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [uploadHidden, setUploadHidden] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [file, setFile] = useState(null);
    const dispatcher = useDispatch();
    const navigate = useNavigate();
    const imageRef = useRef(null);
    function getSlug(s) {
        let ans = "";
        for (const i of s) {
            if (i == " ") {
                ans += "-";
            }
            else if (/^[a-zA-Z]+$/.test(i)) {
                ans += i.toLowerCase();
            }
            else if (/^[0-9]/.test(i)) {
                ans += i;
            }
        }
        return ans;
    }
    return (
        <div className="w-full flex flex-col items-center md:my-8">
            <div className="flex flex-col w-5/6 justify-around items-center md:flex-row flex-wrap">
                <div>
                    <input
                        placeholder="Enter title.."
                        className="my-2 w-full text-2xl p-2 rounded-md outline-none font-light shadow"
                        value={title}
                        onChange={(event) => {
                            let value = event.target.value;
                            if (value.length <= 60) {
                                setTitle(value);
                                let tempSlug = getSlug(value);
                                if (tempSlug.length < 36) {
                                    setSlug(tempSlug);
                                }
                            }
                        }}
                        required={true}
                        id="title"
                    />
                    <p className={`font-light text-lg ${title.length == 60 ? "text-red-700 font-normal" : ""}`}>{title.length}/60</p>
                    <Input
                        placeholder="Slug.."
                        setValue={setSlug}
                        value={slug}
                        required={true}
                        readOnly={true}
                    />
                </div>
                <div className="w-[300px] h-[169px] md:w-[400px] md:h-[225px] border-2 border-gray-800 border-dashed rounded-md flex
                items-center justify-center flex-col md:mx-4 hover:bg-white hover:cursor-pointer overflow-hidden"
                >
                    <div className={`${uploadHidden ? "hidden" : "flex flex-col items-center"}`}>
                        <p className="font-light text-xl">Choose an Image</p>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                                ref={imageRef}
                                onChange={(event) => {
                                    let file = event.target.files[0];
                                    setFile(file);
                                    if (!file.type.startsWith("image/")) {
                                        alert("Kindly upload an image file");
                                        imageRef.current.value = "";
                                    }
                                    else {
                                        // imageId = ID.unique();
                                        // console.log("intialising image upload..", imageId);
                                        // dbService.uploadFile(file, imageId).then((value) => {
                                        //     console.log("upload succesfull....");
                                        //     console.log(value);
                                        //     dbService.getFile(imageId).then((value) => {
                                        //         console.log(value);
                                        //         console.log(value.href);
                                        //         setImgUrl(value.href);
                                        //         setUploadHidden(true);
                                        //     });
                                        // })
                                        setImgUrl(URL.createObjectURL(file));
                                        setUploadHidden(true);
                                    }
                                }}
                                hidden
                            />
                            <button
                                className="text-xl font-semibold hover:bg-opacity-30 hover:bg-gray-800 rounded-full p-2"
                                onClick={(event) => {
                                    event.preventDefault();
                                    imageRef.current.click();
                                }}
                            >➕</button>
                        </div>
                    </div>
                    <div className={`${uploadHidden ? "grid" : "hidden"}`}>
                        <img src={imgUrl} className="w-[300px] h-[169px] md:w-[400px] md:h-[225px] object-cover object-center row-start-1 col-start-1" alt="can't display the image"/>
                        <div className="deleteDiv w-[300px] h-[169px] md:w-[400px] md:h-[225px] row-start-1 col-start-1 hover:bg-black hover:bg-opacity-50 flex justify-end items-start">
                            <button
                            className="row-start-1 col-start-1 m-1 hover:bg-white rounded-full p-2"
                            onClick={() => {
                                setImgUrl("");
                                setUploadHidden(false);
                                imageRef.current.value = "";
                            }}
                            ><img src="src/pages/images/delete-icon.svg" alt="delete" width={20}/></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-5/6">
                <textarea placeholder="You can use html tags like <i>, <u>, <b> and <br> for formatting the content..." className="w-full my-2 text-2xl p-2 rounded-md outline-none font-light shadow resize-none" rows={10} value={content} onChange={(event) => setContent(event.target.value)}>
                </textarea>
                <button
                className="bg-gray-800 text-white text-2xl px-4 py-2 rounded-lg font-light hover:bg-opacity-85 my-2 mb-14"
                onClick={() => {
                    console.log("in post..");
                    dispatcher(setProgress(10));
                    dbService.uploadFile(file, ID.unique()).then((value) => {
                        dispatcher(setProgress(30));
                        dbService.getFile(value.$id).then((value) => {
                            dispatcher(setProgress(70));
                            dbService.createPost(title, slug, content, "active", "6658c8f80019dd21d8d0", new Date().toLocaleDateString("en-GB"), value.href).then((value) => {
                                dispatcher(stopLoading());
                                console.log(value);
                                navigate("/");
                            })
                        })
                    })
                }}
                >Post</button>
            </div>
        </div >
    )
}