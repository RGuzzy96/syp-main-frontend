export type TabOption = {
    displayName: string;
    value: string;
}

interface NavTabsProps {
    tabOptions: TabOption[];
    selectedTab: TabOption;
    setSelectedTab: React.Dispatch<React.SetStateAction<TabOption>>
}

export default function NavTabs({ tabOptions, selectedTab, setSelectedTab }: NavTabsProps){
    return (
        <div className="flex flex-row border-b border-gray-300 gap-x-6 w-full">
            {tabOptions?.map((option, index) => {
                const isSelected = option.value === selectedTab?.value;

                return (
                    <div 
                        key={index}
                        onClick={() => setSelectedTab(option)}
                        className={`font-semibold py-2 border-b-2 ${isSelected ? 'opacity-80 hover:opacity-100 border-b-purple-700' : 'opacity-50 hover:opacity-80 border-b-transparent hover:border-gray-500'} transform duration-300 cursor-pointer`}
                    >
                        { option.displayName }
                    </div>
                )
            })}
        </div>
    )
}