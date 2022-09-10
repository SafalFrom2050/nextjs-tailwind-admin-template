import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import {BASE_URL} from "../config/common";
import {useAuth} from "./authContext";

const AxiosContext = createContext(undefined)

export const AXIOS_ACTION_TYPES = {
    newInstance: "newInstance"
}

function reducer(state, action) {

    switch (action.type) {
        case AXIOS_ACTION_TYPES.newInstance: {
            const token = action.payload
            return {axiosInstance: createAxiosInstance(token.access), isAxiosInstanceSet: true}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const initialState = {isAxiosInstanceSet: false, axiosInstance: undefined}


function createAxiosInstance(accessToken) {
    if(accessToken) {
        return axios.create({
            baseURL: BASE_URL,
            headers: {
                Accept: 'application/json',
                Authorization: `JWT ${accessToken}`,
            }
        })
    }

    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: 'application/json',
        }
    })

}

export function AxiosProvider({children}) {
    const {authState} = useAuth()

    const [state, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
        dispatch({type: AXIOS_ACTION_TYPES.newInstance, payload: authState.token})
    }, [authState.token.access]);


    if (!state.isAxiosInstanceSet) return <></>

    return <AxiosContext.Provider value={state.axiosInstance}>
        {children}
    </AxiosContext.Provider>
}

export function useAxios() {
    const context = useContext(AxiosContext)
    if (context === undefined) {
        throw new Error('useAxios must be used within the AxiosProvider')
    }
    return context
}
