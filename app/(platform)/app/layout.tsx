import AppNav from "@/components/platform/app-nav"

export default function AppRoot({
    children 
}: { 
    children: React.ReactNode 
}){
    return (
        <div className="min-h-screen bg-neutral-100">
            <AppNav>{children}</AppNav>
        </div>
    )
}