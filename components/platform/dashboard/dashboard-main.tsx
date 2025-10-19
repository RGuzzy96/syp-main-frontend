'use client'

import { Person } from "@/types/types"

export default function DashboardMainComponent({
    selected_person,
    setSelectedPerson
}: {
    selected_person: Person | null,
    setSelectedPerson: (person: Person | null) => void
}){

    const getReq = async () => {
        fetch('http://localhost:8080/?param=Minsu').then((resp: any) => console.log('Resp: ', resp));
    }

    return !selected_person ? (
        <div>
            Select a person
        </div>
    ) : (
        <div className="flex flex-col gap-y-10 items-start bg-white text-gray-600">
            {selected_person?.first_name} {selected_person?.last_name}
            <button onClick={() => setSelectedPerson(null)}>Clear</button>

            <button onClick={() => getReq()}>Make request</button>
        </div>
    )
}