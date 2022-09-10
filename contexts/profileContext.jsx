import {createContext, useContext, useEffect} from "react";
import {AUTH_ACTION_TYPE, useAuth} from "./authContext";
import {useAxios} from "./axiosContext";
import {ScreenLoading} from "../components/atoms/common/screenLoading";

const ProfileContext = createContext(undefined)

export function ProfileProvider({children}) {

    const {authState, authDispatch} = useAuth()
    const axiosInstance = useAxios()


    useEffect( () => {

        async function fetchUserProfile() {
            try {
                const profileRequest = await axiosInstance.get('auth/users/me/')

                if (profileRequest.status === 200) {
                    const user = profileRequest.data
                    console.log(user)
                    authDispatch({type: AUTH_ACTION_TYPE.setUser, payload: user})
                }else {
                    authDispatch({type: AUTH_ACTION_TYPE.setAuthChecked})
                }

            }catch (e) {
                console.log("Error fetching user profile!")
                authDispatch({type: AUTH_ACTION_TYPE.setAuthChecked})
            }
        }

        if (authState.tokenChecked) {
            fetchUserProfile()
        }

    }, [authState.tokenChecked, axiosInstance]);


    if (!authState.isAuthChecked) return <ScreenLoading />
    return <ProfileContext.Provider value={authState.currentUser}>{children}</ProfileContext.Provider>
}

export function useProfile() {
    const context = useContext(ProfileContext)
    if (context === undefined) {
        throw new Error('useProfile must be used within the ProfileProvider')
    }
    return context
}