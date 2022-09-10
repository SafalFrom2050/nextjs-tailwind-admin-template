import React from 'react'
import {upperFirst} from 'lodash'
import {overrideTailwindClasses} from "tailwind-override"

function TextArea({
    name,
    placeholder,
    label,
    id,
    iClass,
    cClass,
    lClass,
    children,
    onChange,
    value,
    error,
    errorMsg,
    required,
    leftLabel,
    rightLabel
}) {

    return (
        <div className={"flex flex-col"}>
            {label &&
                <label htmlFor={name}
                       className={overrideTailwindClasses(`py-3 font-medium leading-none text-gray-800 ${lClass} ${error ? "text-red-600" : ""}`)}>
                    {upperFirst(label)}

                    <span className="text-red-500">{required ? "*" : ""}</span>
                </label>
            }
            <div className={`flex items-end gap-2 ${cClass}`}>
                {leftLabel &&
                    <label htmlFor={name}
                           className={overrideTailwindClasses(`my-2 font-medium leading-none text-sm text-gray-800 ${lClass} ${error ? "text-red-600" : ""}`)}>
                        {upperFirst(leftLabel)}

                        <span className="text-red-500">{required ? "*" : ""}</span>
                    </label>
                }

                <textarea
                    className={overrideTailwindClasses(`bg-gray-200 h-[170px] border rounded text-sm font-normal placeholder-gray-400 placeholder:text-sm text-gray-800 py-2 w-full pl-3 ${iClass} ${error? "bg-red-50 border-red-400" : ""}`)}
                    // className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600 border border-1 rounded"
                    placeholder={placeholder || " "}
                    defaultValue={value}
                    onChange={onChange}
                />


                {rightLabel &&
                    <label htmlFor={name}
                           className={overrideTailwindClasses(`my-2 font-medium leading-none text-sm text-gray-800 ${lClass} ${error ? "text-red-600" : ""}`)}>
                        {upperFirst(rightLabel)}

                        <span className="text-red-500">{required ? "*" : ""}</span>
                    </label>
                }
                {children}
            </div>

            {errorMsg &&
                <p className="text-xs font-normal leading-normal text-red-600">
                    {errorMsg}
                </p>
            }
        </div>
    );
}

export default TextArea;