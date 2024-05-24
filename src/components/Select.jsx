import React from "react";
import { useId } from "react";
import { forwardRef } from "react";

export const Select = forwardRef(function({
    label,
    options = [],
    className = "",
    ...props
}, ref) {
    const id = useId();
    <div>
        {label && <label htmlFor={id}>{label}</label>}
        <select {...props} ref={ref} id={id} className={`${className}`}>
            {
                options?.map(i => (
                    <options key={i} value={i}>i</options>
                ))
            }
        </select>
    </div>
})