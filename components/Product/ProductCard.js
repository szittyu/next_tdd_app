import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from 'react-icons/bs';

export default function ProductCard({ product, addToCart }) {
    const [isHovering, setIsHovered] = useState(true);
    const onMouseEnter = () => setIsHovered(false);
    const onMouseLeave = () => setIsHovered(true);

    return (
        <Link href={"/products/" + product.permalink}>
            <div className="flex flex-col justify-center items-center w-full rounded-xl drop-shadow-md hover:cursor-pointer"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                <div className={isHovering ?
                    "flex flex-col justify-center bg-gray-100 rounded-xl h-[350px] items-center mx-auto w-full transition duration-300" :
                    "flex flex-col justify-center bg-gray-300 rounded-xl h-[350px] items-center mx-auto w-full transition duration-300"}>
                    <div className="h-4/5">
                        <Image src={product.image.url} width="300" height="300" alt="image" />
                    </div>
                    <div className="flex flex-col justify-end items-end h-1/5 w-full pr-2 pb-2">
                        <button
                            hidden={true}
                            className={isHovering ?
                                "bg-white text-gray-500 rounded-full w-20 h-8 transition duration-300" :
                                "flex flex-row justify-center items-center border-2 bg-white text-gray-500 rounded-full w-20 h-8 transition duration-300"}
                        >
                            more&nbsp; <BsArrowUpRight className="h-3 w-3" />
                        </button>

                    </div>
                </div>
                <div className="w-full mt-5">
                    <h5>{product.name}</h5>
                    <p>{product.price.formatted_with_code}</p>
                </div>
            </div>
        </Link>
    );
}