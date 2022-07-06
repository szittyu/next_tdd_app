import commerce from "../../lib/commerce";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../Form/FormInput";
import Link from "next/link";

export default function Payment({ shippingData, checkoutToken, refreshCart }) {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState();
    const [error, setError] = useState();

    const { handleSubmit, register } = useForm();

    //

    const shippingcharges = checkoutToken.shipping_methods.find(
        (obj) => obj.id === shippingData["shipping-options"]
    );

    async function payNow(carddata) {
        setLoading(true);
        setError();

        const orderDetails = {
            line_items: checkoutToken.live.line_items,
            customer: {
                email: shippingData.email,
                firstname: shippingData.firstname,
                lastname: shippingData.lastname,
            },
            shipping: {
                name: "Primary",
                street: shippingData.address1,
                town_city: shippingData.city,
                country_state: shippingData.subdivision,
                postal_zip_code: shippingData.zip,
                country: shippingData.country,
            },
            fulfillment: {
                shipping_method: shippingData["shipping-options"],
            },
        };

        await commerce.checkout
            .capture(checkoutToken.id, {
                ...orderDetails,
                payment: {
                    gateway: "test_gateway",
                    card: {
                        number: carddata.Number,
                        expiry_month: carddata.Expiry_Month,
                        expiry_year: carddata.Expiry_Year,
                        cvc: carddata.CVC,
                        postal_zip_code: carddata.Postal_ZIP_Code,
                    },
                },
            })
            .then((res) => {
                setOrder(res);
                setLoading(false);
                refreshCart();
            })
            .catch(({ data }) => {
                setError(data.error.message);
                setLoading(false);
            });
    }

    return (
        <div className="flex flex-col items-center justify-center w-full rounded-[60px] bg-gray-100">
            {order ? (
                <>
                    <h3 className="my-10 text-center text-xl">
                        Thanks for ordering! <br></br>
                        <span className="font-medium">
                            {order.customer.firstname} {order.customer.lastname}&nbsp;
                        </span>
                        <br></br>
                        <span className="text-base">Your order reference:
                            <br></br>
                            <span className="font-medium"> {order.customer_reference}</span>
                        </span>
                    </h3>

                    <h4> Total payment:
                        <span className="font-medium"> {order.order.total.formatted_with_code}</span>
                    </h4>
                    <Link href="/">
                        <a className="flex justify-center items-center text-xs border border-black text-black rounded-full w-44 h-10 my-10 hover:bg-black transition duration-300 hover:text-white md:text-base md:w-60
                        ">Go back to the Homepage</a>
                    </Link>
                </>
            ) : (
                <>
                    <h1 className="flex justify-center items-center text-2xl font-bold my-10 md:text-3xl">Give your card details!</h1>
                    <div className="flex flex-col justify-center items-start font-bold w-4/5 md:w-4/5 lg:w-3/5">
                        <p>Full name: <span className="font-medium">{shippingData.firstname} {shippingData.lastname}</span></p>
                        <p>Address: <span className="font-medium">{shippingData.address1}</span></p>
                        <p>Email: <span className="font-medium">{shippingData.email}</span></p>
                        <p> City: <span className="font-medium">{shippingData.city}</span></p>
                        <p> Postal Zip: <span className="font-medium">{shippingData.zip}</span></p>
                        <p> Country Code: <span className="font-medium">{shippingData.country}</span></p>
                        <p> Subdivision Code: <span className="font-medium">{shippingData.subdivisions}</span></p>
                    </div>
                    <h4 className="text-lg font-bold my-5 md:text-xl">Items you are buying:</h4>
                    <div className="w-4/5 font-medium text-sm md:text-base md:w-4/5 lg:w-3/5">
                        <ul>
                            {checkoutToken.live.line_items.map((item) => {
                                return (
                                    <p key={item.product_name}>
                                        {item.product_name} - {item.line_total.formatted_with_code}{" "}<br></br>
                                        (Quantity: {item.quantity} )
                                    </p>
                                );
                            })}
                        </ul>
                        <p className="my-5 font-bold text-sm w-full md:text-base md:w-4/5">
                            Total: {checkoutToken.live.total.formatted_with_code} + {shippingcharges.price.formatted_with_code} <br></br>(Shipping Charges)


                        </p>
                    </div>

                    {error && <h3>Error : {error}</h3>}
                    {loading ? (
                        <p className="text-center w-full h-36 font-bold text-xl mt-10 md:text-2xl">Wait while we process your data...</p>
                    ) : (
                        <form
                            onSubmit={handleSubmit(payNow)}
                            className="flex flex-col justify-between items-center text-sm font-medium w-full my-2 lg:w-5/6 md:text-base"
                        >
                            <FormInput
                                param={{
                                    name: "Number",
                                    type: "number",
                                }}
                                register={register}
                            />
                            <FormInput
                                param={{
                                    name: "Expiry_Month",
                                    type: "number",
                                }}
                                register={register}
                            />
                            <FormInput
                                param={{
                                    name: "Expiry_Year",
                                    type: "number",
                                }}
                                register={register}
                            />
                            <FormInput
                                param={{
                                    name: "CVC",
                                    type: "number",
                                }}
                                register={register}
                            />
                            <FormInput
                                param={{
                                    name: "Postal_ZIP_Code",
                                    type: "number",
                                }}
                                register={register}
                            />
                            <button
                                className="border-2 border-black rounded-full text-xs w-20 h-10 my-10 hover:bg-black transition duration-300 hover:text-white md:w-24 md:text-base"
                                type="submit"
                            >
                                Pay Now
                            </button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
}