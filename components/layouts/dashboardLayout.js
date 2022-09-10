import React, { useState } from "react";
import Image from "next/image";
import {UsersIcon} from "@heroicons/react/outline";
import {LogoutIcon} from "@heroicons/react/solid";

export default function DashboardLayout({children}) {
    const [show, setShow] = useState(false);

    return (
        <div className="bg-gray-50 flex flex-col xl:flex-row">
            <div className="bg-white xl:hidden flex text-gray-800  hover:text-black focus:outline-none focus:text-black justify-between w-full p-6 items-center ">
                <button className="flex justify-between  items-center space-x-3">
                    <div className={"relative h-20 w-full"}>
                        <Image alt={"organization logo"} objectFit={'contain'} src={"/logo.png"} layout={'fill'} />
                    </div>
                </button>
                <div aria-label="toggler" className="flex justify-center items-center">
                    <button id="open" onClick={() => setShow(!show)} aria-label="open" className={`${show ? "" : "hidden"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}>
                        <svg className="text-gray-800" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button id="close" onClick={() => setShow(!show)} aria-label="close" className={`${show ? "hidden" : ""} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}>
                        <svg className="text-gray-800" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="Main" className={`${show ? "-translate-x-full" : "translate-x-0"} bg-white transform  xl:translate-x-0 ease-in-out transition duration-500 absolute top-32 xl:top-0 xl:relative flex justify-start items-start w-full sm:w-72 flex-col h-full`}>
                <button className="hidden xl:flex text-gray-800 hover:text-black focus:outline-none focus:text-black justify-start px-6 pt-6 items-center space-x-3 w-full">
                    <div className={"relative h-20 w-full"}>
                        <Image alt={"organization logo"} objectFit={'contain'} src={"/logo.png"} layout={'fill'} />
                    </div>
                </button>
                <div className="xl:mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">

                    <button className="focus:outline-none flex jusitfy-start hover:text-white focus:bg-green-700 focus:text-white hover:bg-green-700 text-gray-600 rounded py-3 pl-4 items-center space-x-6 w-full ">
                        <svg className="fill-stroke " width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-base leading-4 ">Dashboard</p>
                    </button>


                    <button className="flex justify-start items-center space-x-6 hover:text-white focus:outline-none focus:bg-green-700 focus:text-white hover:bg-green-700 text-gray-600 rounded py-3 pl-4  w-full ">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 21H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 21V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 4L19 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-base leading-4  ">Reports</p>
                        <div className="ml-28 p-1 bg-green-700 rounded-full"></div>
                    </button>
                </div>
                <div className="w-full px-4">
                    <hr className=" border-gray-100 w-full" />
                </div>
                <div className="mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">

                    <button className="focus:outline-none flex justify-start items-center space-x-6 hover:text-white focus:bg-green-700 focus:text-white hover:bg-green-700 text-gray-600 rounded  py-3 pl-4  w-full ">
                        <UsersIcon className={"w-6 h-6"} />
                        <p className="text-base leading-4  ">Manage Users</p>
                    </button>

                    <button className="focus:outline-none flex justify-start items-center space-x-6 hover:text-white focus:bg-green-700 focus:text-white hover:bg-green-700 text-gray-600 rounded  py-3 pl-4  w-full ">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 8C15.1046 8 16 7.10457 16 6C16 4.89543 15.1046 4 14 4C12.8954 4 12 4.89543 12 6C12 7.10457 12.8954 8 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 6H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-base leading-4  ">Settings</p>
                    </button>
                </div>
                <div className="w-full px-4">
                    <hr className=" border-gray-100 w-full" />
                </div>
                <div className="mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">
                    <button className="focus:outline-none flex justify-start items-center space-x-6 hover:text-white focus:bg-green-700 focus:text-white hover:bg-green-700 text-gray-600 rounded  py-3 pl-4  w-full ">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34315 18.6569 4 17 4C15.3431 4 14 5.34315 14 7C14 8.65685 15.3431 10 17 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-base leading-4  ">Notifications</p>
                    </button>
                </div>
                <div className="mt-36 flex  bg-green-700 justify-center space-x-2 items-center h-full max-h-32 py-4 px-6    w-full  ">

                    <div className="flex flex-col justify-start items-start space-y-2">
                        <p className="cursor-pointer text-xs leading-3 text-gray-200">(Supervisor)</p>

                        <p className="cursor-pointer text-base leading-4 text-white">Safal Sharma</p>
                        <p className="cursor-pointer text-xs leading-3 text-gray-200">safalFrom2050@gmail.com</p>
                    </div>
                    <button aria-label="visit" className=" focus:ring-2 focus:outline-none hover:bg-green-800 p-2.5 bg-green-600 rounded-full">
                        <LogoutIcon className={'text-white w-5 h-5'} />
                    </button>
                </div>
            </div>
            <div className={'p-4 w-full'}>
                {children}
            </div>
        </div>
    );
}
