import React from "react";

export default function FormInput({ param, register }) {
    return (
        <div className="flex flex-row justify-between items-center font-medium w-5/6 my-2 md:w-3/6 lg:w-2/6"
        >
            <label htmlFor={param.name}>{param.name}:</label>
            <input
                className="border-2 border-gray-300 rounded-lg"
                id={param.name}
                type={param.type}
                {...register(param.name, { required: true })}
                placeholder={param.name}
            />
        </div>
    );
}