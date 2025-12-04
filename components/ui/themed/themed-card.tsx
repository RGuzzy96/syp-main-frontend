export default function ThemedCard({ children }: { children: React.ReactNode }){
    return (
        <div className="px-6 py-4 border rounded-xl bg-white shadow-sm">
            { children }
        </div>
    )
}