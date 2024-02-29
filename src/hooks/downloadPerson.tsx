import {Person} from "../App";
import {useEffect} from "react";

export function useDownloadPerson(person: Person, stage: string) {

    useEffect(() => {
        if (stage === 'final') {
            // Convert the data to JSON and create a blob
            const blob = new Blob([JSON.stringify(person, null, 2)], {type: 'application/json'});
            // Create a link element, use it to create a download link for the blob, and click it programatically
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `data_${person.zeut}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        console.log(person)
    }, [stage])
    return;
}