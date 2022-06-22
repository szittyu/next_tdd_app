import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, addToCart }) {

    return (
        <div className="flex flex-col justify-center items-center w-full border rounded-xl drop-shadow-md">
            <div className="flex flex-col justify-center bg-gray-100 rounded-xl items-center hover:bg-gray-300 mx-auto w-full transition duration-300">
                <Image src={product.image.url} width="320" height="340" alt="image" />
            </div>
            <div className="w-full mt-5">
                <div className="font-medium">
                    <h5>{product.name}</h5>
                    <p>{product.price.formatted_with_code}</p>
                </div>
                <div className="flex flex-row justify-between mt-5">
                    <Link href={"/products/" + product.permalink}>
                        <button
                            className="border-2 bg-gray-200 rounded-full w-28 h-10 hover:cursor-pointer hover:bg-black transition duration-300 hover:text-white"
                        >
                            See product
                        </button>
                    </Link>
                    <button
                        className="border-2 bg-gray-200 rounded-full w-28 h-10 hover:bg-black transition duration-300 hover:text-white"
                        onClick={addToCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}