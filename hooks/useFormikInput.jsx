import TextInput from "../components/atoms/inputs/textInput";
import ToggleCheckbox from "../components/atoms/inputs/toggleCheckbox";
import {EyeIcon, EyeOffIcon} from "@heroicons/react/outline";
import {useState} from "react";
import Dropdown from "../components/atoms/inputs/dropdown";
import TextArea from "../components/atoms/inputs/textArea";

export default function useFormikInput() {

    function generateFormikInput(formik, name, label, type = "text", options = []) {
        switch (type) {
            case "text": {
                return <TextInput
                    name={name}
                    label={label}

                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    errorMsg={formik.touched[name] && formik.errors[name]}
                />
            }

            case "password": {
                return <PasswordComponent formik={formik} name={name} label={label} />
            }

            case "checkbox": {
                return <ToggleCheckbox
                    name={name}
                    label={label}

                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    errorMsg={formik.touched[name] && formik.errors[name]}
                />
            }

            case "dropdown": {
                return <Dropdown name={name}
                                 options={options}

                                 onSelect={(v) => !formik.setFieldValue(name, v, true)}
                                 error={formik.touched[name] && Boolean(formik.errors[name])}
                                 errorMsg={formik.touched[name] && formik.errors[name]}

                                 label={label}
                                 separateLabel={true}
                                 required={true}/>
            }

            case "textarea": {
                return <TextArea
                    name={name}
                    label={label}

                    value={formik.values[name]}
                    onChange={(e) => {
                        formik.setFieldValue(name, e.target.value)
                    }}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    errorMsg={formik.touched[name] && formik.errors[name]}
                 />
            }
        }

    }

    return generateFormikInput
}

function PasswordComponent({formik, name, label}) {

    const [showPass, setShowPass] = useState(false)

    return <div key={name} className="relative items-center justify-center">
        <TextInput
            type={showPass ? 'text' : 'password'}
            name={name}
            label={label}

            value={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            errorMsg={formik.touched[name] && formik.errors[name]}
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
}