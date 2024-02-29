import { useEffect } from 'react';
import {Person} from "../App";

export function useStartTimer(stopWhen:number, stage:string, flag:()=>void, person:Person) {
    useEffect(() => {
        if (stage === 'testItSelf') {
            console.log('timer started',Date.now())
            const timer = setTimeout(() => {
                console.log('timer ended',Date.now())


                if (person.tests[person.tests.length-1].time === 0){
                    person.finalTime = stopWhen/1000
                    flag();
                }

            }, stopWhen); // 5 minutes

            // Cleanup function to clear the timeout if the component unmounts
            // or if the dependencies of useEffect change before the timer completes
            return () => clearTimeout(timer);
        }
    }, [stage]); // Dependencies
}
