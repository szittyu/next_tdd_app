import React from "react";

export default function FormSelect({ title, array, register, callback }) {
    return (
        <div className="flex flex-row justify-between items-center my-2">
            <label htmlFor={title}>{title}:</label>
            <select
                id={title}
                {...register(title, { required: true })}
                onChange={(e) => {
                    e.preventDefault();
                    callback(e.target.value);
                }}
                className="w-40 rounded-[60px]"
            >
                {array.map((obj) => {
                    return (
                        <option key={obj.code} value={obj.code}>
                            {obj.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}