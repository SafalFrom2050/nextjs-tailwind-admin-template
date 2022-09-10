import React, {useEffect} from 'react';
import {useAuth, USER_ACCOUNT_TYPES} from "../../contexts/authContext";
import {useRouter} from "next/router";
import SupervisorLayout from "../../components/layouts/supervisorLayout";
import EmployeeLayout from "../../components/layouts/employeeLayout";
import {ScreenLoading} from "../atoms/common/screenLoading";


export const supervisorOnlyRoutes = [
    '/projects',
    '/users'
]

export const employeeOnlyRoutes = [
    '/reports/new'
]

export const authOnlyRoutes = [
    ...supervisorOnlyRoutes,
    ...employeeOnlyRoutes,
    '/',
    '/account',
    '/reports',
]

// Top route is the default route for guest
export const guestOnlyRoutes = [
    '/signin',
    '/signup',
    '/resetPassword',
]

function AuthGuard({children}) {

    const {authState} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!authState.isTokenSet) return

        if (!authState.isLoggedIn && authOnlyRoutes.includes(router.route)) {
            router.push('/signin')
        }

        if (authState.isLoggedIn) {
            if (guestOnlyRoutes.includes(router.route)) {
                router.push('/')
            }

            switch (authState.accountType) {
                case USER_ACCOUNT_TYPES.supervisor: {
                    if (employeeOnlyRoutes.includes(router.route)) {
                        router.push('/')
                    }
                    break
                }
                case USER_ACCOUNT_TYPES.employee: {
                    if (supervisorOnlyRoutes.includes(router.route)) {
                        router.push('/')
                    }
                    break
                }
            }
        }

    }, [router, authState.isLoggedIn, authState.isTokenSet]);


    if (!authState.tokenChecked) return <ScreenLoading/>

    if (authState.isLoggedIn) {
        if (authOnlyRoutes.includes(router.route)) {

            switch (authState.accountType) {
                case USER_ACCOUNT_TYPES.supervisor:
                    return <SupervisorLayout>{children}</SupervisorLayout>

                case USER_ACCOUNT_TYPES.employee:
                    return <EmployeeLayout>{children}</EmployeeLayout>
            }
        }
    } else {
        if (guestOnlyRoutes.includes(router.route)) {
            return <>{children}</>
        } else {
            router.push(guestOnlyRoutes[0])
        }
    }

    return <ScreenLoading/>
}

export default AuthGuard;