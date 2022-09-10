import React from "react";
import {InformationCircleIcon} from "@heroicons/react/outline";

export function FormErrorMessage( { errorMsg }) {
    return <div className="flex items-center gap-x-2 p-2 mb-2 text-xs text-red-600 border border-red-600 bg-red-50">
        <InformationCircleIcon className="w-4 h-4"/>
        {errorMsg}
    </div>;
}