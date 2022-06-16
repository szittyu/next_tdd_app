import commerce from "../../lib/commerce";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../Form/FormInput";

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
        <div>
            {order ? (
                <>
                    <h3>
                        {" "}
                        Thanks for ordering&nbsp;
                        <span className="font-medium">
                            {order.customer.firstname} {order.customer.lastname}&nbsp;
                        </span>
                        <span>your order reference:
                            <span className="font-medium"> {order.customer_reference}</span>
                        </span>
                    </h3>

                    <h4> Total payment:
                        <span className="font-medium"> {order.order.total.formatted_with_symbol}</span>
                    </h4>
                </>
            ) : (
                <>
                    <h3>
                        Full name: {shippingData.firstname} {shippingData.lastname}
                    </h3>

                    <p>Address: {shippingData.address1}</p>
                    <p>Email: {shippingData.email}</p>
                    <p> City: {shippingData.city}</p>
                    <p> Postal Zip: {shippingData.zip}</p>
                    <p> Country Code: {shippingData.country}</p>
                    <p> Subdivision Code: {shippingData.subdivisions}</p>
                    <h4 className="my-5">Items you are buying:</h4>
                    <ul>
                        {checkoutToken.live.line_items.map((item) => {
                            return (
                                <p key={item.product_name}>
                                    {item.product_name} - {item.line_total.formatted_with_code}{" "}
                                    (Quantity: {item.quantity} )
                                </p>
                            );
                        })}
                    </ul>
                    <p className="mb-5">
                        Total : {checkoutToken.live.total.formatted_with_code} +
                        {shippingcharges.price.formatted_with_code}(Shipping Charges)
                    </p>

                    {error && <h3>Error : {error}</h3>}
                    {loading ? (
                        <p>Wait while we process your data</p>
                    ) : (
                        <form onSubmit={handleSubmit(payNow)}>
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
                                className="border-2 rounded-lg w-24 mt-2 hover:bg-gray-200"
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