import ThemedText from "./themed/themed-text";

export default function SectionHeader({ title = 'Section Title', back }: { title: string, back?: () => void}){
    return (
        <div className="flex flex-col gap-y-2.5">
            {(back !== undefined && typeof back === 'function') && <ThemedText 
                className="font-medium text-sm opacity-70 cursor-pointer hover:opacity-100 transform duration-300"
                onClick={back}
            >
                ← Back
            </ThemedText>}
            <ThemedText className="font-semibold text-3xl">{title}</ThemedText>
        </div>
    )
}