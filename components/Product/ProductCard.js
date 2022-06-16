import React from "react";
import Image from "next/image";

export default function ProductCard({ product, addToCart }) {
    function createMarkup(c) {
        return { __html: c };
    }
    console.log(product)
    return (
        <div className="flex flex-col justify-center items-center w-full border rounded-xl drop-shadow-md hover:cursor-pointer">
            <div className="flex flex-col justify-center bg-gray-100 rounded-xl items-center hover:bg-gray-300 mx-auto w-full transition duration-300">
                <Image src={product.image.url} width="320" height="340" alt="image" />
            </div>
            <div className="w-full mt-5">
                <div>
                    <h5 className="">{product.name}</h5>
                    <div dangerouslySetInnerHTML={createMarkup(product.description)}></div>
                    <p>{product.price.formatted_with_code}</p>
                </div>
                <div className="flex flex-row justify-end">
                    <button
                        className="border-2 rounded-full w-28 h-10 hover:bg-black transition duration-300 hover:text-white"
                        onClick={addToCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}