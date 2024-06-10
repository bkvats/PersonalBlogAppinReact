import React from "react";

export default function PostCard({title, date, featuredImage = ""}) {
    return (
        <div className="my-4 flex flex-col md:flex-row-reverse px-4 py-6 w-2/3  rounded-3xl items-center justify-center bg-white">
            <div className="md:w-1/3 rounded-md overflow-hidden mx-3">
                <img src="src/components/images/template_image.jpg" alt={title} />
            </div>
            <div className="md:w-2/3">
                <p className="text-gray-500 mt-2 mb-6">{date}</p>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800">{title}</h1>
            </div>
        </div>
    )
}