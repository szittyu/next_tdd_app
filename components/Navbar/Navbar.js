import React, { useState } from "react";
import Link from "next/link";
import { Slide } from "react-awesome-reveal";
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

export default function Navbar({ cart, products, searchTerm, setSearchTerm, searchbarState, setSearchbarState }) {

    const [tempCartItems, setTempCartItems] = useState(0)

    const handleSearchBar = () => {
        setSearchbarState(!searchbarState)
    }

    return (
        <>
            {searchbarState === true ?
                (<Slide direction="right" triggerOnce duration={500}>
                    <nav className="flex flex-row w-full h-16 bg-gray-100 justify-between items-center fixed z-20 drop-shadow-md">
                        <div className="flex flex-row w-full justify-center">
                            <BsSearch
                                className="h-6 w-6 ml-10 text-gray-400"
                                value={searchTerm}
                                onClick={() => handleSearchBar()}
                                role="searchbox"
                                type="text"
                                title="Search"
                                placeholder="Search products"
                            />
                            <input
                                className="w-full mx-2 outline-none bg-gray-100"
                                placeholder={`Search`}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                }}
                            />
                            <AiOutlineClose
                                className="h-6 w-6 mr-10 text-gray-600 hover:cursor-pointer"
                                onClick={() => { handleSearchBar(), setSearchTerm("") }}
                            />
                        </div>

                    </nav>
                </Slide>)
                :
                (
                    <nav className="flex flex-row w-full h-16 bg-white justify-between items-center fixed z-20">
                        <div className="ml-5 md:ml-10">
                            <Link href="/"><a>Home</a ></Link >
                        </div >
                        <div className="flex flex-row justify-between w-3/6">
                            <Link href="/all"><a>All</a></Link>
                            <Link href="/categories/kitchen"><a>Kitchen</a></Link>
                            <Link href="/categories/tech"><a>Tech</a></Link>
                            <Link href="/categories/work"><a>Work</a></Link>
                        </div>
                        <div className="mr-5 md:mr-10 flex flex-row justify-between items-center w-20">
                            <div className="flex flex-row justify-between items-center w-10 hover:cursor-pointer">
                                <Link href="/cart"><a>Cart</a></Link>
                                <p>{cart ? cart.total_items : tempCartItems}</p>
                            </div>
                            <BsSearch
                                className="h-6 w-6 hover:cursor-pointer"
                                value={searchTerm}
                                onClick={() => handleSearchBar()}
                                role="searchbox"
                                type="text"
                                title="Search"
                                placeholder="Search products"
                            />
                        </div>
                    </nav >
                )
            }

        </>
    );
}