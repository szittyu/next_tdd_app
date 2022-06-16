import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

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

            <main>
                {cart.subtotal.raw > 0 ? (
                    <div>
                        <h3
                            className="text-xl font-bold my-10 underline"
                        >Cart total price: {cart.subtotal.formatted_with_code}</h3>

                        <h4
                            id="cart-items-heading"
                            className="text-lg font-bold"
                        >Cart items: </h4>
                        <ul aria-labelledby="cart-items-heading">
                            {cart.line_items.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium">Product name: {item.name}</p>
                                            <Image src={item.image.url} alt="product image" height="70" width="70" />
                                        </div>
                                        <p>
                                            {item.price.formatted_with_code} X {item.quantity} ={" "}
                                            {item.line_total.formatted_with_code}
                                        </p>

                                        <div>
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
                                                        <AiOutlinePlus
                                                            className="border-2 rounded-full w-7 h-7 hover:bg-black transition duration-300 hover:text-white"
                                                            onClick={() => {
                                                                handleUpdateQuantity(item.quantity + 1, item.id);
                                                            }}
                                                        />
                                                    </button>
                                                    <span className="mx-2">{item.quantity}</span>
                                                    <button>
                                                        <AiOutlineMinus
                                                            className="border-2 rounded-full w-7 h-7 hover:bg-black transition duration-300 hover:text-white"
                                                            onClick={() => {
                                                                handleUpdateQuantity(item.quantity - 1, item.id);
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="flex flex-row justify-between w-full mt-5">
                            <button
                                className="border-2 rounded-full w-24 hover:bg-black transition duration-300 hover:text-white"
                                onClick={emptyCart}>Empty Cart</button>
                            <button
                                className="border-2 rounded-full w-24 hover:bg-black transition duration-300 hover:text-white"
                            >
                                <Link href="/checkout">
                                    <a>Checkout</a>
                                </Link>
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Please Buy Something from our store</p>
                )}
            </main>
        </div>
    );
}