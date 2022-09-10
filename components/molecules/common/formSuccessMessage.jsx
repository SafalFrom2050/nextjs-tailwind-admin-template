import React from "react";
import {CheckIcon} from "@heroicons/react/outline";

export function FormSuccessMessage({successMsg}) {
    return <div className="flex items-center gap-x-2 p-2 mb-2 text-xs text-green-600 border border-green-600 bg-green-50">
        <CheckIcon className="w-4 h-4"/>
        {successMsg}
    </div>;
}