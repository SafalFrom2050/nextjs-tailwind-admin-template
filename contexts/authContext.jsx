import {createContext, useContext, useEffect, useReducer} from "react";
import {ScreenLoading} from "../components/atoms/common/screenLoading";


export const AUTH_ACTION_TYPE = {
    setUser: "setUser",
    logout: "logout",
    setToken: "setToken",
    setTokenChecked: "setTokenChecked",
    setAuthChecked: "setAuthChecked"
}

export const USER_ACCOUNT_TYPES = {
    supervisor: "supervisor",
    employee: "employee"
}


const AuthContext = createContext(undefined)

function authReducer(state, action) {

    switch (action.type) {
        case AUTH_ACTION_TYPE.setTokenChecked: {
            return {...state, tokenChecked: true}
        }

        case AUTH_ACTION_TYPE.setToken: {
            const token = action.payload
            localStorage.setItem("access_token", token.access)
            localStorage.setItem("refresh_token", token.refresh)
            return {...state, token:token, isTokenSet: true, tokenChecked: true}
        }

        case AUTH_ACTION_TYPE.setAuthChecked: {
            return {...state, isAuthChecked: true}
        }

        case AUTH_ACTION_TYPE.setUser: {
            const user = action.payload
            let accountType = USER_ACCOUNT_TYPES.employee
            if (user.is_staff) accountType = USER_ACCOUNT_TYPES.supervisor
            return {...state, accountType, currentUser: action.payload, isUserSet: true, isLoggedIn: true, isAuthChecked: true}
        }

        case AUTH_ACTION_TYPE.logout: {
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            return {...state, currentUser: {}, isLoggedIn: false, isUserSet: false, token: {}, isTokenSet: false}
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const initialAuthState = {
    tokenChecked: false,
    isTokenSet: false,
    isUserSet: false,
    currentUser: {},
    token: {access: undefined, refresh: undefined},
    isLoggedIn: false,
    accountType: USER_ACCOUNT_TYPES.supervisor
}


export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);


    useEffect(() => {

        const token = {
            access: localStorage.getItem('access_token'),
            refresh: localStorage.getItem('refresh_token'),
        }

        if (token.access !== null){
            dispatch({type: AUTH_ACTION_TYPE.setToken, payload: token})
        }else {
            dispatch({type: AUTH_ACTION_TYPE.setTokenChecked})
        }

    }, []);

    if (!state.tokenChecked) return <ScreenLoading />

    return <AuthContext.Provider value={{authState: state, authDispatch: dispatch}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within the AuthProvider')
    }
    return context
}