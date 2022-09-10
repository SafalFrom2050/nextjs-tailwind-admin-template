import '../styles/globals.css'
import {AuthProvider, useAuth} from "../contexts/authContext";
import AuthGuard from "../components/molecules/authGuard";
import {AxiosProvider} from "../contexts/axiosContext";
import {ProfileProvider} from "../contexts/profileContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function MyApp({Component, pageProps}) {
    return <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <AxiosProvider>
                <ProfileProvider>
                    <AuthGuard>
                        <Component {...pageProps} />
                    </AuthGuard>
                </ProfileProvider>
            </AxiosProvider>
        </AuthProvider>
    </QueryClientProvider>
}

export default MyApp
