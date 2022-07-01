import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import FormInput from "./FormInput";

const addressparams = [
    { name: "firstname", type: "text" },
    { name: "lastname", type: "text" },
    { name: "address1", type: "text" },
    { name: "email", type: "email" },
    { name: "city", type: "text" },
    { name: "zip", type: "number" },
];

export default function AddressForm({ checkoutToken, setShippingData }) {
    const { handleSubmit, register, setValue } = useForm();
    const [disabled, setDisabled] = useState(true);

    const submitData = (data) => {
        setShippingData(data);
    };
    return (

        <form onSubmit={handleSubmit(submitData)} className="flex flex-col items-center justify-center w-full rounded-[60px] bg-gray-100">
            <h1 className="flex justify-center items-center text-3xl font-bold my-10">Fill the address fields</h1>

            {addressparams.map((param) => {
                return <FormInput key={param.name} param={param} register={register} />;
            })}

            <CountrySelect
                setDisabled={setDisabled}
                setValue={setValue}
                checkoutToken={checkoutToken}
                register={register}
            />

            <button
                className={disabled === true ?
                    "border border-white text-white bg-gray-200 rounded-full w-20 h-10 my-10"
                    :
                    "border-2 border-black rounded-full w-20 h-10 my-10 hover:bg-black transition duration-300 hover:text-white"}
                disabled={disabled}
                type="submit"
            >
                Next
            </button>
        </form>

    );
}