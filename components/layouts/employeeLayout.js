import React from "react";
import {FlagIcon, HomeIcon} from "@heroicons/react/outline";
import SideNav from "../molecules/navigation/sideNav";

const navItems = [
    {
        name: "Dashboard",
        icon: <HomeIcon className={"w-5 h-5"}/>,
        link: "/"
    },

    {
        name: "Submit Reports",
        icon: <FlagIcon className={"w-5 h-5"}/>,
        link: "/reports/new"
    },

    {
        name: "My Reports",
        icon: <FlagIcon className={"w-5 h-5"}/>,
        link: "/reports"
    },
]

export default function EmployeeLayout({children}) {

    return (
        <div className="bg-gray-50 flex flex-col xl:flex-row xl:h-full">
            <SideNav navItems={navItems} />
            <div className={'w-full h-full'}>
                {children}
            </div>
        </div>
    );
}
