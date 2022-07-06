import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import { FaShoppingCart } from 'react-icons/fa'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { Fade } from "react-awesome-reveal";

export default function CartDetail({ cart, updateQuantity, emptyCart }) {
    const [loading, setLoading] = useState();
    const handleUpdateQuantity = async (quantity, productID) => {
        setLoading(productID);
        await updateQuantity(quantity, productID);
        setLoading();
    };
    console.log(cart)
    if (!cart) return <span>Loading ...</span>;
    return (
        <div className="flex flex-col justify-center items-center pt-16">
            <Head>
                <title>TDD App | CART</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="w-full">
                <Fade triggerOnce direction="left" duration={1500}>
                    {cart.subtotal.raw > 0 ? (
                        <div className="flex flex-col justify-center w-auto md:mx-20">
                            <div className="bg-gray-100 rounded-[60px]">
                                <h1 className="flex justify-center items-center text-3xl font-bold my-10">
                                    <FaShoppingCart />&nbsp;
                                    Your Cart
                                </h1>
                                <div className="flex flex-row font-bold justify-around w-auto text-lg md:mx-20">
                                    <span className="text-center w-1/6 md:w-1/4">Products</span>
                                    <span className="text-center w-1/6 md:w-1/4">Price</span>
                                    <span className="text-center w-1/6 md:w-1/4">Quantity</span>
                                    <span className="text-center w-1/6 md:w-1/4">Total</span>
                                </div>
                                <ul
                                    aria-labelledby="cart-items-heading"
                                    className="flex flex-col w-auto md:mx-20"
                                >
                                    {cart.line_items.map((item) => {
                                        return (
                                            <li key={item.id}>
                                                <div className="flex flex-row justify-around items-center font-semibold my-5">
                                                    <div className="flex flex-col justify-center items-center w-1/6 md:w-1/4">
                                                        <Image src={item.image.url} alt="product image" height="90" width="90" />&nbsp;
                                                        <p className="text-center text-sm md:text-base">{item.name}</p>
                                                    </div>
                                                    <p className="text-center text-sm w-1/6 md:w-1/4 md:text-base">{item.price.formatted_with_code}</p>
                                                    <div className="flex justify-center w-1/6 md:w-1/4 md:text-base">
                                                        {loading === item.id ? (
                                                            <div
                                                                className="text-center text-sm md:text-base"
                                                            >
                                                                <p>updating quantity...</p>
                                                            </div>

                                                        ) : (
                                                            <div
                                                                className="flex flex-row justify-center items-center"
                                                            >
                                                                <button>
                                                                    <AiOutlineMinus
                                                                        className=" rounded-full w-5 h-5 hover:bg-black transition duration-300 hover:text-white md:w-7 md:h-7"
                                                                        onClick={() => {
                                                                            handleUpdateQuantity(item.quantity - 1, item.id);
                                                                        }}
                                                                    />
                                                                </button>
                                                                <span className="mx-2">{item.quantity}</span>
                                                                <button>
                                                                    <AiOutlinePlus
                                                                        className=" rounded-full w-5 h-5 hover:bg-black transition duration-300 hover:text-white md:w-7 md:h-7"
                                                                        onClick={() => {
                                                                            handleUpdateQuantity(item.quantity + 1, item.id);
                                                                        }}
                                                                    />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-center text-sm w-1/6 md:w-1/4 md:text-base">{item.line_total.formatted_with_code}</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <h3
                                    className="flex justify-center text-lg font-bold my-10 md:text-xl md:mr-10 md:justify-end"
                                >Cart total price: {cart.subtotal.formatted_with_code}</h3>
                            </div>
                            <div className="bg-white mx-10 md:mx-0">
                                <div className="flex flex-row justify-between w-auto my-10 mx-auto md:mx-20">
                                    <button
                                        className="border-2 border-black rounded-full text-xs w-28 h-10 hover:bg-black transition duration-300 hover:text-white
                                        md:w-40 md:text-base">
                                        <Link href="/all">
                                            <a>Back to shopping</a>
                                        </Link>
                                    </button>
                                    <button
                                        className="border-2 border-black rounded-full text-xs w-20 h-10 hover:bg-black transition duration-300 hover:text-white
                                        md:w-28 md:text-base"
                                        onClick={emptyCart}>
                                        Empty Cart
                                    </button>
                                    <button
                                        className="border-2 border-black rounded-full text-xs w-20 h-10 hover:bg-black transition duration-300 hover:text-white
                                        md:w-24 md:text-base"
                                    >
                                        <Link href="/checkout">
                                            <a>Checkout</a>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row justify-center text-center items-center h-36 font-bold text-2xl">Your Cart is empty, please buy something from our store</div>
                    )}
                </Fade>
            </main>
        </div>
    );
}