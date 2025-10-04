'use client'

import DashboardMainComponent from "@/components/platform/dashboard/dashboard-main";
import { Person } from "@/types/types";
import { useEffect, useState } from "react";

function hellWorld() {
    console.log('Hello world')
}

const data: Person[] = [
    { first_name: 'John', last_name: 'Doe' },
    { first_name: 'Leslie', last_name: 'Doe' },
    { first_name: 'Mick', last_name: 'Doe' },
    { first_name: 'Bill', last_name: 'Doe' }
]

export default function DashboardPage({}){
    const [people, setPeople] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    
    hellWorld();

    const getPeople = async () => {
        setPeople(data);
    }

    const printPerson = (person: Person) => {
        console.log('Person: ', person.first_name + ' ' + person.last_name);
        setSelectedPerson(person);
    }

    useEffect(() => {
        getPeople();
    }, [])

    return (
        <div className="text-white">
            Dashboard!
            {people?.map((person, index) => {
                return (
                    <div key={index} onClick={() => printPerson(person)}>
                        {person.first_name}
                    </div>
                )
            })}
            <DashboardMainComponent selected_person={selectedPerson} setSelectedPerson={setSelectedPerson} />
        </div>
    )
}