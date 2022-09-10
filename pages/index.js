import React from "react";
import {UserCircleIcon} from "@heroicons/react/solid";
import Heading from "../components/molecules/heading";
import {useProfile} from "../contexts/profileContext";
import {format, parseISO} from "date-fns";
import {AdjustmentsIcon} from "@heroicons/react/outline";

function Index() {

    const profile = useProfile()

    return (
        <>
            <Heading title={"Dashboard"}/>

            <div className={'px-4 py-8'}>
                <div className="w-full mx-auto mb-4  shadow sm:px-10 px-4 py-6 bg-white rounded-md">
                    <p className="text-lg text-gray-800 font-semibold mb-4">Active Account</p>
                    <div className="flex bg-green-700 rounded-md relative md:w-1/3">
                        <div className="flex">
                            <div className="px-4 py-6 border-r border-green-600">
                                <UserCircleIcon className="text-white h-10 w-10">
                                </UserCircleIcon>
                            </div>
                            <div className="flex flex-col justify-center pl-3 py-2 sm:py-0">
                                <p className="text-sm font-bold text-white pb-1">{profile.first_name} {profile.last_name}</p>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                    <p className="text-xs text-white leading-5">{profile.is_staff ? 'Supervisor' : 'Employee'} &nbsp; - &nbsp;</p>
                                    <p className="text-xs text-white leading-5">Account created
                                        at {format(parseISO(profile.date_joined), 'MMM dd, yyyy')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {profile.is_staff &&
                    <div className="w-full mx-auto mb-4  shadow sm:px-10 px-4 py-6 bg-white rounded-md">
                        <p className="text-lg text-gray-800 font-semibold mb-4">Useful Links</p>
                        <div className="flex bg-white shadow rounded-md relative md:w-1/3">
                            <div className="flex items-center w-full">
                                <div className="px-4 py-6 border-r border-gray-200">
                                    <AdjustmentsIcon className="text-gray-700 h-10 w-10"/>
                                </div>
                                <div className="flex flex-col justify-center pl-3 py-2 sm:py-0">
                                    <p className="text-sm font-bold text-gray-700 pb-1">Super Admin</p>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                        <p className="text-xs text-gray-700 leading-5">Login to super admin
                                            dashboard</p>
                                    </div>
                                </div>


                                <a
                                    target={"_blank"} href={'https://api.sse.org.np/admin'} rel="noreferrer"
                                    aria-label={"admin dashboard link"}
                                    className="ml-auto mr-6 focus:ring-2 focus:outline-none hover:bg-gray-200 p-2.5 bg-gray-100 rounded-full shadow">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={2} stroke="#333333" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Index;