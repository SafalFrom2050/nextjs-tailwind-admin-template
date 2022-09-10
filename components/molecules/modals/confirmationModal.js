import React from 'react';
import {XIcon} from "@heroicons/react/outline";

import PrimaryButton from "../../atoms/buttons/primaryButton";

function ConfirmationModal({show = false, setShow = () => 0, action}) {

    return (
        <div
            className={`${show ? '' : 'hidden'} z-30 fixed top-0 left-0 right-0 bottom-0 w-screen h-screen backdrop-blur bg-green-300/30`}>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center">


                    <div className="w-full flex flex-col items-center justify-center">

                        <div className="bg-white shadow rounded p-10 mt-8">

                            <div className={'flex space-x-20'}>
                                <p tabIndex={0} aria-label="Add new project"
                                   className=" text-2xl font-extrabold leading-6 text-gray-800">
                                    Are you sure?
                                </p>

                                <button type={'button'} onClick={() => setShow(false)}
                                        className={"ml-auto hover:scale-125 transition-all"}>
                                    <XIcon className={"text-gray-700 w-6 h-6"}/>
                                </button>
                            </div>


                            <div className="mt-6 flex flex-col gap-y-2  w-full">

                                <p className={'text-gray-700'}>This action cannot be undone</p>
                            </div>

                            <div className="flex items-center mt-8">
                                <PrimaryButton
                                    name={'DELETE'}
                                    onClick={action}
                                    bClass={'bg-red-600 hover:bg-red-500 ml-0 text-sm font-semibold py-3'}
                                />

                                <PrimaryButton
                                    name={'CANCEL'}
                                    onClick={() => setShow(false)}
                                    bClass={'bg-transparent hover:bg-transparent hover:text-gray-500 text-gray-700'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;