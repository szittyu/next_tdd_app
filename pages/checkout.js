import AddressForm from "../components/Form/AddressForm";
import Payment from "../components/Payment/Payment";
import commerce from "../lib/commerce";
import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

export default function Checkout({ cart, refreshCart }) {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState();
    const [shippingData, setShippingData] = useState();

    useEffect(() => {
        async function cartHandler() {
            if (cart) {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, {
                        type: "cart",
                    });
                    setCheckoutToken(token);
                } catch (error) {
                    console.log(error);
                }
            }

        }
        cartHandler()
    }, [cart]);

    const steps = [
        <AddressForm
            key="first"
            setShippingData={(data) => {
                setShippingData(data);
                nextStep();
            }}
            checkoutToken={checkoutToken}
        />,
        <Payment
            key="second"
            shippingData={shippingData}
            refreshCart={refreshCart}
            checkoutToken={checkoutToken}
        />,
    ];

    const nextStep = () => {
        setActiveStep((prev) => prev + 1);
    };

    return (

        <div className="">
            {checkoutToken ? (
                <Fade triggerOnce direction="left" duration={1500} className="flex flex-col justify-center items-center w-auto pt-20 mx-5 mb-10 md:mx-10">
                    {steps[activeStep]}
                </Fade>
            ) : (
                <div className="flex flex-row justify-center items-center w-full pt-20 h-36 font-bold text-2xl">
                    Loading...
                </div>
            )}
        </div>
    );
}