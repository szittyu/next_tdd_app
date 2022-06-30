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
            <Fade triggerOnce direction="left" duration={1500} className="bg-gray-200 w-full rounded-[60px]">
                <main>
                    {cart.subtotal.raw > 0 ? (
                        <div className="flex flex-col justify-center">
                            <h1 className="flex justify-center items-center text-3xl font-bold my-10">
                                <FaShoppingCart />&nbsp;
                                Your Cart
                            </h1>
                            <div className="flex flex-row font-bold justify-around w-auto mx-20 text-lg">
                                <span className="flex justify-center w-1/4">Products</span>
                                <span className="flex justify-center w-1/4">Price</span>
                                <span className="flex justify-center w-1/4">Quantity</span>
                                <span className="flex justify-center w-1/4">Total</span>
                            </div>
                            <ul
                                aria-labelledby="cart-items-heading"
                                className="flex flex-col w-auto mx-20"
                            >
                                {cart.line_items.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <div className="flex flex-row justify-around items-center font-semibold my-5">
                                                <div className="flex flex-row justify-center items-center w-1/4">
                                                    <Image src={item.image.url} alt="product image" height="90" width="90" />&nbsp;
                                                    <p className="">{item.name}</p>
                                                </div>
                                                <p className="flex justify-center w-1/4">{item.price.formatted_with_code}</p>
                                                <div className="flex justify-center w-1/4">
                                                    {loading === item.id ? (
                                                        <div
                                                            className="flex flex-row justify-center items-center"
                                                        >
                                                            <p>updating quantity...</p>
                                                        </div>

                                                    ) : (
                                                        <div
                                                            className="flex flex-row justify-center items-center"
                                                        >
                                                            <button>
                                                                <AiOutlineMinus
                                                                    className=" rounded-full w-7 h-7 hover:bg-black transition duration-300 hover:text-white"
                                                                    onClick={() => {
                                                                        handleUpdateQuantity(item.quantity - 1, item.id);
                                                                    }}
                                                                />
                                                            </button>
                                                            <span className="mx-2">{item.quantity}</span>
                                                            <button>
                                                                <AiOutlinePlus
                                                                    className=" rounded-full w-7 h-7 hover:bg-black transition duration-300 hover:text-white"
                                                                    onClick={() => {
                                                                        handleUpdateQuantity(item.quantity + 1, item.id);
                                                                    }}
                                                                />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="flex justify-center w-1/4">{item.line_total.formatted_with_code}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <h3
                                className="flex justify-end text-xl font-bold mr-10 my-10"
                            >Cart total price: {cart.subtotal.formatted_with_code}</h3>

                            <div className="flex flex-row justify-between w-auto my-10 mx-20">
                                <button
                                    className="border border-white text-white bg-black rounded-full w-40 h-10 hover:bg-white hover:text-black transition duration-300">
                                    <Link href="/all">
                                        <a>Back to shopping</a>
                                    </Link>
                                </button>
                                <button
                                    className="border border-white text-white bg-black rounded-full w-28 h-10 hover:bg-white hover:text-black transition duration-300"
                                    onClick={emptyCart}>
                                    Empty Cart
                                </button>
                                <button
                                    className="border border-white text-white bg-black rounded-full w-24 h-10 hover:bg-white hover:text-black transition duration-300"
                                >
                                    <Link href="/checkout">
                                        <a>Checkout</a>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="flex flex-row justify-center items-center h-36 font-bold text-2xl">Your Cart is empty, please buy something from our store</p>
                    )}
                </main>
            </Fade>
        </div>
    );
}