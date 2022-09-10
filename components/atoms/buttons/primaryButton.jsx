import React from 'react';
import {overrideTailwindClasses} from "tailwind-override";

function PrimaryButton({name, cClass, bClass, onClick, disabled, isSubmitType, autoFocus = false}) {
    return (
        <div className={cClass}>
            <button
                autoFocus={autoFocus}
                type={isSubmitType ? "submit" : "button"}
                disabled={disabled}
                onClick={onClick}
                className={overrideTailwindClasses(`mx-2 my-2 bg-green-700 disabled:bg-gray-400 transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-6 py-2 text-sm ${bClass}`)}>{name}</button>
        </div>
    )
}

export default PrimaryButton;