import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

type Action = { type: 'button'; onClick: (item: any) => void }
| { type: 'link'; href: string };

export interface DropdownOption {
    text: string,
    icon: IconType,
    action: Action,
    danger?: boolean
}

export default function DropdownMenu({
    buttonDisplay,
    hideButtonBg = false,
    hideButtonBorder = false,
    options,
    itemProp
}: {
    buttonDisplay: React.ReactNode,
    hideButtonBg?: boolean,
    hideButtonBorder?: boolean,
    options: DropdownOption[],
    itemProp?: any
}){
    return (
        <Menu>
            <MenuButton
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                className={`inline-flex items-center gap-2 rounded-md ${!hideButtonBg && 'bg-white'} hover:bg-neutral-50 border shadow-xs transform duration-150 ${!hideButtonBorder && ''} px-3 py-2 text-sm/6 font-semibold text-neutral-950 cursor-pointer`} 
            >
                {buttonDisplay}
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border bg-white p-1 text-sm/6 text-neutral-950 shadow-xs transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
                {options?.map((option, index) => {
                    const Icon = option.icon;
                    return (
                        <MenuItem key={index}>
                            {option?.action?.type === 'link' ?
                                <Link href={option.action.href} className="group flex w-full hover:bg-neutral-50 transform duration-150 cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5">
                                    <Icon className="size-4" />
                                    {option.text}
                                </Link>
                            :
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        if (option.action.type === 'button') {
                                            option.action.onClick(itemProp);
                                        }
                                    }}
                                    className={`group flex w-full hover:bg-neutral-50 ${option.danger && 'text-red-500'} transform duration-150 cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5`}
                                >
                                    <Icon className="size-4" />
                                    {option.text}
                                </button>
                            }
                        </MenuItem>
                    )
                })}
            </MenuItems>
        </Menu>
    )
}