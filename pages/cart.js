import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'

export default function CartDetail({ cart, updateQuantity, emptyCart }) {
    const [loading, setLoading] = useState();
    const handleUpdateQuantity = async (quantity, productID) => {
        setLoading(productID);
        await updateQuantity(quantity, productID);
        setLoading();
    };

    if (!cart) return <span>Loading ...</span>;
    return (
        <div className="flex flex-col justify-center items-center">
            <Head>
                <title>TDD App | CART</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                {cart.subtotal.raw > 0 ? (
                    <div>
                        <h3
                            className="text-xl font-bold my-10 underline"
                        >Cart total price : {cart.subtotal.formatted_with_symbol}</h3>

                        <h4
                            id="cart-items-heading"
                            className="text-lg font-bold"
                        >Cart items :</h4>
                        <ul aria-labelledby="cart-items-heading">
                            {cart.line_items.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium">Product name: {item.name}</p>
                                            <Image src={item.image.url} alt="product image" height="70" width="70" />
                                        </div>
                                        <small>
                                            {item.price.formatted_with_symbol} X {item.quantity} ={" "}
                                            {item.line_total.formatted_with_symbol}
                                        </small>

                                        <div>
                                            {loading === item.id ? (
                                                "updating"
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            handleUpdateQuantity(item.quantity + 1, item.id);
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        onClick={() => {
                                                            handleUpdateQuantity(item.quantity - 1, item.id);
                                                        }}
                                                    >
                                                        {" "}
                                                        -{" "}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div>
                            <button onClick={emptyCart}>Empty Cart</button>
                            <button>
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