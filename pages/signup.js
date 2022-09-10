import React, {useState} from "react";
import Image from "next/image";
import * as yup from "yup";
import * as Yup from "yup";
import {useFormik} from "formik";
import {FormErrorMessage} from "../components/molecules/common/formErrorMessage";
import PrimaryButton from "../components/atoms/buttons/primaryButton";
import Link from "next/link";
import useFormikInput from "../hooks/useFormikInput";
import {useQuery} from "@tanstack/react-query";
import {ChatAltIcon} from "@heroicons/react/solid";
import axios from "axios";
import {BASE_URL} from "../config/common";

const validationSchema = yup.object({
    first_name: yup
        .string()
        .required('First name is required'),
    last_name: yup
        .string()
        .required('Last name is required'),
    email: yup
        .string()
        .required('Email is required'),
    project: yup
        .number(),
    // .required('This field is required'),
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirm_password: yup
        .string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match")
});


function Signup() {

    const [formError, setFormError] = useState(false)
    const [isSignUpComplete, setIsSignUpComplete] = useState(false)
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [projects, setProjects] = useState([])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
            email: '',
            project: undefined
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signup(values)
        },
    })

    const generateFormikInput = useFormikInput()

    const projectsQuery = useQuery(['ongoing-projects'], fetchProjects)

    async function fetchProjects() {
        const {data} = await axios.get(BASE_URL + 'projects/ongoinprojects/')
        let projects = data?.results || []

        projects = projects.map(project => ({key: project.id, value: project.projectName}))

        setProjects(projects)

        return data
    }

    async function signup(formData) {

        try {
            setIsSigningUp(true)
            const signupResult = await axios.post(BASE_URL + 'auth/users/', formData)
            if (signupResult.status === 201) {
                const token = signupResult.data
                console.log(signupResult)
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
                        Hi {formik.values.first_name} {formik.values.last_name}!
                    </p>
                    <p className="text-xl font-medium leading-6 text-gray-700">
                        Thank you for signing up. We will soon
                        contact you after our supervisor verifies your account. Thank you again for your
                        patience.
                    </p>

                    <p className="text-sm font-medium leading-none text-gray-500 mt-10">
                        Already have an account?{" "}
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

                    <p tabIndex={0} role="heading" aria-label="Login to your account"
                       className="text-2xl font-extrabold leading-6 text-gray-800">
                        Create a new account
                    </p>


                    <div className="mt-6 flex flex-col gap-y-2  w-full">

                        {formError &&
                            <FormErrorMessage errorMsg={formError}/>
                        }

                        <div className={'grid md:grid-cols-2 gap-x-3'}>
                            {generateInput("first_name", "First Name")}
                            {generateInput('last_name', "Last Name")}
                        </div>

                        <div className={'grid md:grid-cols-2 gap-x-3'}>
                            {generateInput('username', "Username")}
                            {generateInput('email', "Email")}
                        </div>

                        <div className={'grid md:grid-cols-2 gap-x-3'}>
                            {generateInput('password', 'Password', 'password')}
                            {generateInput('confirm_password', 'Confirm Password', 'password')}
                        </div>

                        <div className={'flex flex-col'}>
                            {generateInput('project', 'Project', 'dropdown', projects)}
                        </div>


                    </div>

                    <div className="w-full flex items-center justify-between py-5">
                        <hr className="w-full bg-gray-400"/>
                        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                        <hr className="w-full bg-gray-400  "/>
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500">
                        Already have an account?{" "}
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
                            disabled={isSigningUp}
                            name={'SIGN UP'}
                            bClass={'w-full ml-0 text-sm font-semibold py-3'}
                        />
                    </div>
                </div>
            </form>
        </div>
    </>);
}

export default Signup;
