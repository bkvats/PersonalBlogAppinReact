import React, { useRef, useState } from "react";
import { Button, Input } from "../components"
import dbService from "../appwrite/database";
import { ID } from "appwrite";
export default function AddPost() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [uploadHidden, setUploadHidden] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    let imageId = "";
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
                                setSlug(getSlug(value));
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
                <div className="w-[300px] h-[169px] md:w-[400px] md:h-[225px] border-2 border-gray-800 border-dashed rounded-md p-2 flex
                items-center justify-center flex-col md:mx-4 hover:bg-white hover:cursor-pointer"
                    onClick={() => {
                        imageRef.current.click();
                    }}
                >
                    <div hidden={uploadHidden}>
                        <p className="font-light text-xl">Choose an Image</p>
                        <form>
                            <input
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                                ref={imageRef}
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    console.log(file);
                                    if (!file.type.startsWith("image/")) {
                                        alert("Kindly upload an image file");
                                        imageRef.current.value = "";
                                    }
                                    else {
                                        imageId = ID.unique();
                                        console.log("intialising image upload..", imageId);
                                        dbService.uploadFile(file, imageId).then((value) => {
                                            console.log("upload succesfull....");
                                            console.log(value);
                                            let ans = dbService.getFilePreview(imageId);
                                            console.log(ans);
                                            setImgUrl(ans);
                                        })
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
                            {/* <button
                            type="reset"
                            className="text-white rounded-full font-light p-1 bg-opacity-30 my-3 hover:bg-opacity-30 hover:bg-gray-800">
                            ✖
                            </button> */}
                        </form>
                    </div>

                </div>
            </div>
            <div className="w-5/6">
                <textarea placeholder="You can use html tags like <i>, <u> and <b> for formatting the content..." className="w-full my-2 text-2xl p-2 rounded-md outline-none font-light shadow resize-none" rows={10} value={content} onChange={(event) => setContent(event.target.value)}>
                </textarea>
                <Button title={"Post"} className="self-start mb-12" />
            </div>
            <div>
                <img src={imgUrl} alt="image can't be shown" />
            </div>
        </div >
    )
}