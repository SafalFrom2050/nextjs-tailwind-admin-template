import React, {useState} from 'react';
import {overrideTailwindClasses} from "tailwind-override";

function FileInputWithDragDrop(
    {
        name,
        id,
        message,
        cClass,
        accept,
        file = undefined,
        onFileChanged = () => {
        }
    }
) {

    const [isDropping, setIsDropping] = useState(false)


    function onFileChange(file) {
        onFileChanged(file)
    }

    return (
        <div
            onDrop={(ev) => {
                ev.preventDefault();
                setIsDropping(false)

                onFileChange(ev.dataTransfer.files[0]);
            }}

            onDragOver={(ev) => {
                ev.preventDefault();
            }}
            onDragOverCapture={(ev) => {
                ev.preventDefault();
                setIsDropping(true)
            }}

            onDragLeave={(ev) => {
                ev.preventDefault();
                setIsDropping(false)
            }}
            className={overrideTailwindClasses(`flex flex-col items-center justify-center w-full mb-8 border border-dashed border-green-700 rounded-lg py-8 ${cClass} ${isDropping && 'bg-green-200'}`)}>
            <div className="cursor-pointer mb-5 text-green-700 dark:text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-cloud-upload"
                     width={60} height={60} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"
                     fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/>
                    <polyline points="9 15 12 12 15 15"/>
                    <line x1={12} y1={12} x2={12} y2={21}/>
                </svg>
            </div>
            <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center">
                {file ? file.name : (message || "Drag and drop here")}
            </p>
            <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center my-1">or</p>
            <label htmlFor={id || name}
                   className="cursor-pointer text-base font-normal tracking-normal text-green-700 dark:text-green-600 text-center">
                {" "}
                {file ? "browse again " : "browse "}
            </label>
            <input type="file" accept={accept} className="hidden" name={name} id={id || name} onChange={(e) => {
                return onFileChange(e.target.files ? e.target.files[0] : undefined);
            }}/>
        </div>
    );
}

export default FileInputWithDragDrop;
