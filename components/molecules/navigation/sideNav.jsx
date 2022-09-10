import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {LogoutIcon} from "@heroicons/react/solid";
import {AUTH_ACTION_TYPE, useAuth} from "../../../contexts/authContext";
import {UserCircleIcon} from "@heroicons/react/outline";
import {useRouter} from "next/router";

function SideNav({navItems}) {
    const [show, setShow] = useState(true)
    const [selectedNavItemLink, setSelectedNavItemLink] = useState(navItems[0].link)

    const {authState, authDispatch} = useAuth()
    const {route} = useRouter()

    function logout() {
        authDispatch({type: AUTH_ACTION_TYPE.logout})
    }

    useEffect(() => {
        setSelectedNavItemLink(route)
    }, [route]);


    return (
        <>
            <div
                className="bg-white z-20 xl:hidden flex text-gray-800  hover:text-black focus:outline-none focus:text-black justify-between w-full p-6 items-center ">
                <button className="flex justify-between  items-center space-x-3">
                    <div className={"relative h-20 w-32"}>
                        <Image alt={"organization logo"} objectFit={'contain'} src={"/logo.webp"} layout={'fill'}/>
                    </div>
                </button>
                <div aria-label="toggler" className="flex justify-center items-center">
                    <button id="open" onClick={() => setShow(!show)} aria-label="open"
                            className={`${show ? "" : "hidden"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}>
                        <svg className="text-gray-800" width={24} height={24} viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button id="close" onClick={() => setShow(!show)} aria-label="close"
                            className={`${show ? "hidden" : ""} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}>
                        <svg className="text-gray-800" width={24} height={24} viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div onClick={() => setShow(true)}
                 className={`${show ? "hidden" : ""} z-10 fixed top-0 bottom-0 right-0 left-0 bg-green-800/30 blur-xl`}/>
            <div id="Main"
                 className={`${show ? "-translate-x-full" : "translate-x-0"} z-30 bg-white transform  xl:translate-x-0 ease-in-out transition duration-500 fixed top-32 pb-32 xl:pb-0 xl:top-0 xl:relative flex justify-start items-start w-full sm:w-72 flex-col h-screen`}>
                <button
                    className="hidden xl:flex text-gray-800 hover:text-black focus:outline-none focus:text-black justify-start px-6 pt-6 items-center space-x-3 w-full">
                    <div className={"relative h-20 w-full"}>
                        <Image alt={"organization logo"} objectFit={'contain'} src={"/logo.png"} layout={'fill'}/>
                    </div>
                </button>
                <div className="xl:mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">
                    {navItems.map((navItem, i) => (
                        <Link key={i} href={navItem.link}>
                            <button
                                className={`flex justify-start items-center space-x-6 ${selectedNavItemLink === navItem.link ? 'text-white bg-green-700' : 'text-gray-600'} focus:outline-none transition-all hover:bg-green-700 hover:text-white rounded py-3 pl-4  w-full `}>
                                {navItem.icon}
                                <p className="text-base leading-4">{navItem.name}</p>
                            </button>
                        </Link>
                    ))}

                    <hr className={'rounded w-full h-1 mt-auto'}/>
                    <Link href={'/account'}>
                        <button
                            className={`flex justify-start items-center space-x-6 ${selectedNavItemLink === '/account' ? ' outline-none text-white bg-green-700' : 'text-gray-600'} hover:text-white hover:bg-green-700 rounded py-3 pl-4  w-full `}>
                            <UserCircleIcon className={'w-5 h-5'}/>
                            <p className="text-base leading-4">{"Manage Account"}</p>
                        </button>
                    </Link>

                </div>


                <div
                    className="mt-auto flex  bg-green-700 justify-center space-x-2 items-center max-h-32 py-4 px-6 w-full">

                    <div className="flex flex-col justify-start items-start space-y-2">

                        <p className="cursor-pointer text-base leading-4 text-white">{authState.currentUser.first_name} {authState.currentUser.last_name}</p>
                        <p className="cursor-pointer text-xs leading-3 text-gray-200 min-w-[10rem]">@{authState.currentUser.username}</p>
                    </div>
                    <button
                        onClick={logout}
                        aria-label="logout"
                        className=" focus:ring-2 focus:outline-none hover:bg-green-800 p-2.5 bg-green-600 rounded-full">
                        <LogoutIcon className={'text-white w-5 h-5'}/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default SideNav;