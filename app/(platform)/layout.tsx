import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from 'react-toastify';

export default function PlatformRootLayout({ 
    children 
}: { 
    children: React.ReactNode 
}){
    return (
        <AuthProvider>
            <ToastContainer />
            {children} 
        </AuthProvider>
    )
}