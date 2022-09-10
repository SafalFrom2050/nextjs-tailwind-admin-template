import React, {useEffect, useState} from 'react';
import {overrideTailwindClasses} from "tailwind-override";
import {upperFirst} from "lodash";

const Dropdown = ({
                      name,
                      id,
                      options,
                      selected,
                      onSelect,
                      label="Select",
                      cClass,
                      lClass,
                      error,
                      errorMsg,
                      separateLabel,
                      required,
                  }
) => {


    const [show, setShow] = useState(false);

    const [selectedOption, setSelectedOption] = useState(selected || separateLabel ? "Select" : label);

    function toggle() {
        setShow(!show)
    }

    function selectOption(key, value) {
        setSelectedOption(value)
        onSelect(key)
        toggle()
    }

    useEffect(() => {
        if (!selected || selected === "") return
        setSelectedOption(selected + "")

    }, [selected]);


    return (
        <div className="relative flex flex-col">
            {label && separateLabel &&
                <div className="flex flex-col">
                    <label htmlFor={label}
                           className={overrideTailwindClasses(`py-3 text-sm font-medium leading-none text-gray-800 ${lClass} ${error ? "text-red-600" : ""}`)}>
                        {upperFirst(label)}
                        <span className="text-red-500">{required ? "*" : ""}</span>
                    </label>
                </div>
            }

            <div
                className={overrideTailwindClasses(`relative w-full bg-gray-200 rounded outline-none dropdown-one ${cClass} ${error ? "bg-red-50 border border-red-400" : ""}`)}>
                <button onClick={toggle} className="relative flex items-center justify-between w-full px-5 pl-3 py-3"
                        type="button">
                      <span className="pr-4 text-sm leading-none font-normal text-gray-800"
                            id="drop-down-content-setter">
                        {String(selectedOption)}
                      </span>
                    <svg id="rotate" className="absolute z-10 cursor-pointer right-5" width={10} height={6}
                         viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 0.75L5 5.25L9.5 0.75" stroke="#4B5563" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>

                <div
                    className={`${show ? "" : "hidden"} absolute z-20 right-0 w-full px-1 py-2 top-8`}
                    id="drop-down-div">
                    <div className={"fixed top-0 left-0 h-screen w-full z-0"} onClick={toggle}></div>
                    <div
                        className={"w-full absolute flex flex-col z-30 bg-white border-t border-gray-200 rounded shadow"}>

                        {options.map((option, index) => {

                            return (
                                <a key={index} onClick={() => selectOption(String(option.key), String(option.value))}
                                   className="hover"><p
                                    className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded">
                                    {option.value}
                                </p></a>
                            );
                        })
                        }
                    </div>
                </div>
            </div>
            {errorMsg &&
                <p className="text-xs font-normal leading-normal text-red-600">
                    {errorMsg}
                </p>
            }
            {/* end */}
        </div>
    );
};

export default Dropdown;
