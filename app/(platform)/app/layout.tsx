import AppNav from "@/components/platform/app-nav"

export default function AppRoot({
    children 
}: { 
    children: React.ReactNode 
}){
    return (
        <div>
            <AppNav>{children}</AppNav>
        </div>
    )
}