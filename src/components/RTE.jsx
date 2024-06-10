import React from "react";

export default function RTE() {
    return (
        <div>
            <input type="text"
            placeholder="enter text here.."
            className="w-96 h-96"
            value={`<b>initial value</b>`}
            />
        </div>
    )
}