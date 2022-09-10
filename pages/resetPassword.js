import React, {useState} from "react";
import Image from "next/image";
import * as yup from "yup";
import {useFormik} from "formik";
import {FormErrorMessage} from "../components/molecules/common/formErrorMessage";
import PrimaryButton from "../components/atoms/buttons/primaryButton";
import Link from "next/link";
import useFormikInput from "../hooks/useFormikInput";
import {ChatAltIcon} from "@heroicons/react/solid";
import axios from "axios";
import {BASE_URL} from "../config/common";

const validationSchema = yup.object({
    email: yup
        .string()
        .required('Email is required'),
});


function ResetPassword() {

    const [formError, setFormError] = useState(false)
    const [isSignUpComplete, setIsSignUpComplete] = useState(false)
    const [isSigningUp, setIsSigningUp] = useState(false)


    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            requestResetPassword(values)
        },
    })

    const generateFormikInput = useFormikInput()

    async function requestResetPassword(formData) {

        try {
            setIsSigningUp(true)
            const signupResult = await axios.post(BASE_URL + 'auth/users/reset_password/', formData)
            if (signupResult.status === 204) {
                const token = signupResult.data
                setIsSignUpComplete(true)
                // authDispatch({type: AUTH_ACTION_TYPE.setToken, payload: token})
            }
        } catch ({message, response}) {
            setIsSigningUp(false)
            switch (response.status) {
                case 400: {
                    setFormError(`Please check the fields again`)
                    formik.setErrors(response.data)
                    return
                }
                default: {
                    setFormError(message)
                }
            }
        }
    }

    function generateInput(name, label, type = "text", options = []) {
        return generateFormikInput(formik, name, label, type, options)
    }

    return (<>
        <div className={"fixed w-full h-full top-0 bottom-0"}>
            <Image alt={"sse themed image"} src={"/images/sse.jpg"} layout={'fill'}/>
        </div>

        <div className="backdrop-blur bg-gradient-to-tl from-green-400 w-full h-full min-h-[100vh] py-16 px-4">


            <form className={`flex flex-col items-center justify-center`}
                  method={"POST"}
                  onSubmit={(e) => {
                      e.preventDefault()
                      formik.submitForm()
                  }}>
                <div className={"relative h-28 w-48"}>
                    <Image alt={"organization logo"} objectFit={'contain'} src={"/logo.webp"} layout={'fill'}/>
                </div>

                <div
                    className={`${!isSignUpComplete && 'hidden'} min-h-[50vh] bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-8`}>

                    <ChatAltIcon className={'w-24 h-24 text-green-600'}/>

                    <p className="text-2xl font-extrabold leading-loose text-gray-800">
                        Hi there!
                    </p>
                    <p className="text-xl font-medium leading-6 text-gray-700">
                        We have sent you an email with a link to reset your password at <span
                        className={'text-gray-800 underline'}>{formik.values.email}</span>. Please check your inbox.
                    </p>

                    <p className="text-sm font-medium leading-none text-gray-500 mt-10">
                        Continue to sign in?{" "}
                        <Link href={"/signin"}>
                            <a>
                                <span tabIndex={0} role="link" aria-label="Sign up here"
                                      className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                                    {" "}
                                    Sign in here
                                </span>
                            </a>
                        </Link>
                    </p>


                </div>

                <div
                    className={`${isSignUpComplete && 'hidden'} bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-8`}>

                    <p tabIndex={0} role="heading" aria-label="Reset Password"
                       className="text-2xl font-extrabold leading-6 text-gray-800">
                        Reset password
                    </p>


                    <div className="mt-6 flex flex-col gap-y-2  w-full">

                        {formError &&
                            <FormErrorMessage errorMsg={formError}/>
                        }

                        <div className={'flex flex-col'}>
                            {generateInput('email', "Email")}
                        </div>


                    </div>

                    <div className="w-full flex items-center justify-between py-5">
                        <hr className="w-full bg-gray-400"/>
                        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                        <hr className="w-full bg-gray-400  "/>
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500">
                        Continue to sign in?{" "}
                        <Link href={"/signin"}>
                            <a>
                                <span tabIndex={0} role="link" aria-label="Sign up here"
                                      className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                                    {" "}
                                    Sign in here
                                </span>
                            </a>
                        </Link>
                    </p>

                    <div className="mt-8">
                        <PrimaryButton
                            isSubmitType={true}
                            onClick={formik.submitForm}
                            disabled={isSigningUp || !formik.isValid}
                            name={'CONTINUE'}
                            bClass={'w-full ml-0 text-sm font-semibold py-3'}
                        />
                    </div>
                </div>
            </form>
        </div>
    </>);
}

export default ResetPassword;
