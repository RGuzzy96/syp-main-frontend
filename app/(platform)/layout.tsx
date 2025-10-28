import { AuthProvider } from "@/context/AuthContext";

export default function PlatformRootLayout({ 
    children 
}: { 
    children: React.ReactNode 
}){
    return (
        <AuthProvider>
            {children} 
        </AuthProvider>
    )
}