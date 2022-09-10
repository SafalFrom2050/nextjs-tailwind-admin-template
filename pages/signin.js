import React, {useState} from "react";
import Image from "next/image";
import {AUTH_ACTION_TYPE, useAuth} from "../contexts/authContext";
import TextInput from "../components/atoms/inputs/textInput";
import * as yup from "yup";
import {useFormik} from "formik";
import {EyeIcon, EyeOffIcon} from "@heroicons/react/outline";
import {FormErrorMessage} from "../components/molecules/common/formErrorMessage";
import PrimaryButton from "../components/atoms/buttons/primaryButton";
import Link from "next/link";
import axios from "axios";
import {BASE_URL} from "../config/common";

const validationSchema = yup.object({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});


function Signin() {

    const [showPass, setShowPass] = useState(false)
    const [formError, setFormError] = useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const {authDispatch} = useAuth()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            login(values)
        },
    })

    async function login(formData) {

        try {
            setIsLoggingIn(true)
            const {data, status} = await axios.post(BASE_URL + 'auth/jwt/create', formData)

            console.log(data)
            if (status === 200) {
                const token = {access: data.access, refresh: data.refresh}
                authDispatch({type: AUTH_ACTION_TYPE.setToken, payload: token})
            }
        } catch ({message, response}) {
            setIsLoggingIn(false)
            console.log(response)
            switch (response.status) {
                case 401: {
                    setFormError(response.data.detail)
                    return
                }
                default: {
                    setFormError(message)
                }
            }
        }
    }


    return (<>
        <Image alt={"sse themed image"} src={"/images/sse.jpg"} layout={'fill'}/>

        <div className="h-screen backdrop-blur bg-gradient-to-tl from-green-400 w-full py-16 px-4">

            <form className="flex flex-col items-center justify-center" method={"POST"}
                  onSubmit={(e) => {
                      e.preventDefault()
                      formik.submitForm()
                  }}>
                <div className={"relative h-28 w-48"}>
                    <Image alt={"organization logo"} objectFit={'contain'} src={"/logo.webp"} layout={'fill'}/>
                </div>
                <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-8">
                    <p tabIndex={0} role="heading" aria-label="Login to your account"
                       className="text-2xl font-extrabold leading-6 text-gray-800">
                        Sign in to your account
                    </p>


                    <div className="mt-6  w-full">

                        {formError &&
                            <FormErrorMessage errorMsg={formError}/>
                        }

                        <TextInput
                            name={"username"}
                            label={"Username"}

                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            errorMsg={formik.touched.username && formik.errors.username}
                        />
                    </div>
                    <div className="mt-6  w-full">
                        <div className="relative items-center justify-center">
                            <TextInput
                                type={showPass ? 'text' : 'password'}
                                name={"password"}
                                label={"Password"}

                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                errorMsg={formik.touched.password && formik.errors.password}
                            >
                                <div onClick={() => setShowPass((v) => !v)}
                                     className="absolute right-0 top-0 mt-[53px] mr-3 cursor-pointer">

                                    {showPass
                                        ? <EyeOffIcon className={'w-4 h-4 text-gray-700'}/>
                                        : <EyeIcon className={'w-4 h-4 text-gray-700'}/>
                                    }

                                </div>
                            </TextInput>

                        </div>
                        <p className="text-sm font-medium leading-none text-gray-500 mt-2 text-right">
                            <Link href={"/resetPassword"}>
                                <a>
                                <span tabIndex={0} role="link" aria-label="Sign up here"
                                      className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                                    {" "}
                                    Forgot password?
                                </span>
                                </a>
                            </Link>
                        </p>
                    </div>
                    <div className="w-full flex items-center justify-between py-5">
                        <hr className="w-full bg-gray-400"/>
                        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                        <hr className="w-full bg-gray-400  "/>
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500">
                        Dont have account?{" "}
                        <Link href={"/signup"}>
                            <a>
                                <span tabIndex={0} role="link" aria-label="Sign up here"
                                      className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                                    {" "}
                                    Sign up here
                                </span>
                            </a>
                        </Link>
                    </p>

                    <div className="mt-8">
                        <PrimaryButton
                            isSubmitType={true}
                            onClick={formik.submitForm}
                            disabled={isLoggingIn || !formik.isValid}
                            name={'SIGN IN'}
                            bClass={'w-full ml-0 text-sm font-semibold py-3'}
                        />
                    </div>
                </div>
            </form>
        </div>
    </>);
}

export default Signin;
