'use client'

import { useState } from "react";

interface Sibling {
    name: string;
    type: 'sister' | 'brother'
}

const siblings: Sibling[] = [
    {
        name: 'Rick',
        type: 'brother'
    },
    {
        name: 'Brenda',
        type: 'sister'
    },
    {
        name: 'Rick',
        type: 'brother'
    },
    {
        name: 'Brenda',
        type: 'sister'
    }
]

export default function HiMomComponent({ momName }: { momName: string }){
    const hasMomName = momName ? true : false;

    const [dynamicSiblings, setDynamicSiblings] = useState<Sibling[]>([]);

    console.log('Dynamic Siblings: ', dynamicSiblings);

    const handleAddSibling = () => {
        console.log('Adding sibling...')
        setDynamicSiblings(prev => [...prev || [], siblings[3]]);
    }

    const removeSibling = (sib: Sibling) => {
        const filteredSiblings = dynamicSiblings?.filter(sibling => sib.name !== sibling.name);
        setDynamicSiblings(filteredSiblings);
        console.log('Yo')
    }

    return (
        <div className="border border-red-700 flex flex-col gap-y-3">
            {hasMomName ? <p>{"Hi mom! mom name: " + momName}</p> : <p>Hi dad</p>}
            {dynamicSiblings?.map((sibling, index) => {
                return (
                    <div onClick={() => removeSibling(sibling)} key={index}>
                        {sibling.name}
                    </div>
                )
            })}
            <button 
                onClick={handleAddSibling} 
                className="border border-white px-3.5 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 cursor-pointer font-semibold"
            >
                Add sibling
            </button>

        </div>
    )
}