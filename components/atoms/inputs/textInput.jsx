import React from 'react'
import {upperFirst} from 'lodash'
import {overrideTailwindClasses} from "tailwind-override"

function TextInput({
                       type,
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
                       rightLabel,
                       autocomplete
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
                <input
                    name={name}
                    id={id && ""}
                    aria-labelledby={label || ""}
                    type={type}
                    className={overrideTailwindClasses(`bg-gray-200 border rounded text-xs font-normal leading-none placeholder-gray-400 placeholder:text-sm text-gray-800 py-2 w-full pl-3 ${iClass} ${error ? "bg-red-50 border-red-400" : ""}`)}
                    placeholder={placeholder || ""}
                    onChange={onChange}
                    value={value}
                    autoComplete={autocomplete}
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

export default TextInput;