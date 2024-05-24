import {React, forwardRef, useId} from "react";

export const Input = forwardRef(function Input({
    label,
    type = "text",
    setValue,
    className = "",
    readOnly = false,
    required = false,
    ...props
}, ref) {
    const id = useId();
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <input
            id={id}
            type={type}
            onChange={(event) => setValue(event.target.value)}
            className={`my-2 text-2xl p-2 rounded-md outline-none font-light shadow ${className}`}
            ref={ref}
            readOnly={readOnly}
            required={required}
            {...props} />
        </>
    )
})