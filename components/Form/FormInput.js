import React from "react";

export default function FormInput({ param, register }) {
    return (
        <div className="form-elem">
            <label htmlFor={param.name}>{param.name}:</label>
            <input
                className="border-2 rounded-lg my-2"
                id={param.name}
                type={param.type}
                {...register(param.name, { required: true })}
            />
        </div>
    );
}