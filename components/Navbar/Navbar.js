import React, { useState } from "react";
import Link from "next/link";
import { Slide } from "react-awesome-reveal";
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Navbar({ cart, products, searchTerm, setSearchTerm, searchbarState, setSearchbarState }) {

    const [tempCartItems, setTempCartItems] = useState(0)
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)

    const handleSearchBar = () => {
        setSearchbarState(!searchbarState)
    }
    const handleHamburgerMenu = () => {
        setHamburgerMenuOpen(!hamburgerMenuOpen)
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
                        <div className="md:hidden flex flex-row justify-start w-full">
                            {hamburgerMenuOpen ?
                                <Slide direction="down" triggerOnce duration={1000}>
                                    <div className="flex flex-col pt-44 pb-5 pl-10 bg-gray-100 w-screen drop-shadow-md">
                                        <div className="flex flex-row justify-end w-full">
                                            <AiOutlineClose
                                                className="h-6 w-6 mr-10 text-gray-600 hover:cursor-pointer"
                                                onClick={() => handleHamburgerMenu()}
                                            />
                                        </div>
                                        <div
                                            className="flex flex-col justify-between items-start h-40"
                                            onClick={() => setHamburgerMenuOpen(false)}
                                        >
                                            <Link href="/"><a>Home</a ></Link >
                                            <Link href="/all"><a>All</a></Link>
                                            <Link href="/categories/kitchen"><a>Kitchen</a></Link>
                                            <Link href="/categories/tech"><a>Tech</a></Link>
                                            <Link href="/categories/work"><a>Work</a></Link>
                                        </div>
                                    </div>
                                </Slide>

                                :
                                <GiHamburgerMenu
                                    className="ml-10 hover:cursor-pointer"
                                    onClick={() => handleHamburgerMenu()}
                                />
                            }
                        </div>
                        <div className="hidden md:flex md:flex-row md:justify-start md:w-full ">
                            <div className="ml-10">
                                <Link href="/"><a>Home</a ></Link >
                            </div>
                            <div className="flex flex-row justify-between mx-40 w-4/5 ">
                                <Link href="/all"><a>All</a></Link>
                                <Link href="/categories/kitchen"><a>Kitchen</a></Link>
                                <Link href="/categories/tech"><a>Tech</a></Link>
                                <Link href="/categories/work"><a>Work</a></Link>
                            </div>
                        </div>
                        <div className="mr-5 md:mr-10 flex flex-row justify-between items-center w-32 md:w-20">
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