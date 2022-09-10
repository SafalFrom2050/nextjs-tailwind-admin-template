import React from 'react';
import {overrideTailwindClasses} from "tailwind-override";
import {upperFirst} from "lodash";

function ToggleCheckbox(
    {
        name,
        id,
        defaultChecked,
        onChange,
        error,
        errorMsg,
        label,
        lClass,
        cClass
    }
) {

    return (
        <div className={overrideTailwindClasses(`flex flex-col items-start gap-4 py-3 ` + cClass)}>
            {/* Code block starts */}

            {label &&
                <label htmlFor={name}
                       className={overrideTailwindClasses(`text-sm font-medium leading-none text-gray-800 ${lClass} ${error ? "text-red-600" : ""}`)}>
                    {upperFirst(label)}
                </label>
            }

            <div className="w-12 h-6 cursor-pointer rounded-full relative shadow-sm">
                <input defaultChecked={defaultChecked} onChange={onChange} type="checkbox" name={name}
                       id={id || name}
                       className="focus:outline-none checkbox w-4 h-4 rounded-full bg-white absolute m-1 shadow-sm appearance-none cursor-pointer"/>

                <label htmlFor={id || name}
                       className="toggle-label bg-gray-200 block w-12 h-6 overflow-hidden rounded-full bg-gray-300 cursor-pointer"/>
            </div>
            {/* Code block ends */}


            {errorMsg &&
                <p className="text-xs font-normal leading-normal text-red-600">
                    {errorMsg}
                </p>
            }

            <style>
                {`.checkbox:checked {
                        /* Apply class right-0*/
                        right: 0;
                    }
                    .checkbox:checked + .toggle-label {
                        /* Apply class bg-green-700 */
                        background-color: #15803D;
                    }`}
            </style>
        </div>
    );
}

export default ToggleCheckbox;