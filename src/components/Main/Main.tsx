import {useEffect, useRef, useState} from "react";
import TestSlider from "../TestSlider/TestSlider";
import {Person} from "../../App";
import ResultTable from "../ResultTable/ResultTable";
import Header from "../Header/Header";
import {useDownloadPerson} from "../../hooks/downloadPerson";
import {useStartTimer} from "../../hooks/startTimer";

const Main = () => {
    const [stage, setStage] = useState('login')
    const [zeut, setZeut] = useState<string | null>(null)
    const person = useRef(new Person());
    const timeAmount =300_000
    const startButtonRef = useRef<HTMLButtonElement>(null); // Creating a ref for the start button


    useStartTimer(timeAmount, stage, ()=>{
        if (stage==='testItSelf') setStage(prevState => prevState = 'timeOut')}, person.current)



    useDownloadPerson(person.current, stage)

    // const startBTNHandler = () => {
    //     if (zeut && String(zeut).length === 4) {
    //         setStage('explanation')
    //         console.log(zeut)
    //         person.current.zeut = zeut
    //     } else {
    //         alert("הקש 4 ספרות אחרונות של תעודת הזהות שלך")
    //     }
    // }







    const startBTNHandler = () => {
        // Convert zeut to a string to ensure we're working with text
        // This is crucial if zeut might be input as a number
    
        // Ensure zeutStr is exactly 4 digits long, pad with leading zeros if necessary
        // This line is optional if you're sure zeut will always have 4 digits
    
        if (zeut && zeut.length === 4) {
            setStage('explanation');
            console.log(zeut); // This will show the zeut value, including leading zeros
            person.current.zeut = zeut;
        } else {
            alert("הקש 4 ספרות אחרונות של תעודת הזהות שלך");
        }
    }
    useEffect(() => {
        // Checking if the current stage requires focusing on the button
        if (stage === 'explanation' || stage === 'beforeTestAlarm'|| stage === 'login') {
            startButtonRef.current?.focus(); // Focus on the button for the relevant stages
        }

        // Function to handle keypress event
        const handleKeyPress = (event: KeyboardEvent) => {
            // Trigger button click on spacebar press when the button is focused
            if (event.code === 'Space' && document.activeElement === startButtonRef.current) {
                startButtonRef.current?.click();
            }
        };

        // Adding the keypress event listener to the window
        window.addEventListener('keypress', handleKeyPress);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [stage]); // This effect depends on changes to the 'stage'




    if (stage === 'login') {
        return (<>
            <Header/>
            <h1>מספר משתתף</h1>
            <h2>(הקש 4 ספרות אחרונות של תעודת הזהות שלך)</h2>

            <div className={'flexCenter'}><input value={zeut ?? ""} onChange={(e) => {
                setZeut(prevState => prevState = e.target.value)
            }} type={"number"}/>
                <button ref={startButtonRef} onClick={startBTNHandler}>התחל</button>
            </div>
        </>)
    }


    if (stage === 'explanation') {
        return (<>
            {/*<span className={'bold-decorated'}></span>*/}
            <p>שלום רב,</p>
            <p>בניסוי שלפניך יוצגו תרגילי חשבון פשוטים במרכז המסך.</p>
            <p>בעת הופעת התרגיל <span className={'bold-decorated'}>עליך לענות את התשובה וללחוץ על מקש רווח</span> כדי
                לעבור לתרגיל הבא.</p>
            <p>עליך להגיב <span className={'bold-decorated'}>מהר</span> ככל האפשר תוך כידי שמירה על <span
                className={'bold-decorated'}>הדיוק.</span></p>
            <p className={'withAnotherColor'}>לחץ על מקש הרווח לתרגול קצר</p>

            <button ref={startButtonRef} onClick={() => {
                setStage('explanation-with-test');
            }}>התחל</button>
        </>)
    }

    if (stage === 'explanation-with-test') {
        return (<>

            <TestSlider tests={
                [{
                    question: '8 + 2 =',
                    correctAnswer: 5,
                    userAnswer: null,
                    time: 0
                },
                    {
                        question: '6 - 3 =',
                        correctAnswer: 5,
                        userAnswer: null,
                        time: 0
                    }, {
                    question: '5 * 5 =',
                    correctAnswer: 5,
                    userAnswer: null,
                    time: 0
                }, {
                    question: '21 / 3 =',
                    correctAnswer: 5,
                    userAnswer: null,
                    time: 0
                }]}
                        finalWords={'תודה, החלק של התרגול הסתיים'}
                        nextStage={() => {
                            setStage('beforeTestAlarm')
                        }
                        } finalWordsBTN={'המשך'}/>
        </>)
    }
    if (stage === 'beforeTestAlarm') {

        return (<>
            <p>בניסוי שלפניך יוצגו תרגילי חשבון פשוטים במרכז המסך.</p>
            <p>בעת הופעת התרגיל <span className={'bold-decorated'}>עליך לענות את התשובה וללחוץ על מקש רווח</span> כדי
                לעבור לתרגיל הבא.</p>
            <p>עליך להגיב <span className={'bold-decorated'}>מהר</span> ככל האפשר תוך כידי שמירה על <span
                className={'bold-decorated'}>הדיוק.</span></p>
            <p className={'withAnotherColor'}>לחץ על מקש הרווח לתרגול קצר</p>


            <button ref={startButtonRef} onClick={() => setStage('testItSelf')}>התחל</button>


        </>)
    }

    if (stage === "testItSelf") {
        return (<>
            <TestSlider tests={person.current.tests}
                        finalWords={'תודה על השתתפותך, הניסוי הסתיים'}
                        nextStage={() => {
                            person.current.finalTime = person.current.tests.reduce(
                                (accumulator, currentValue) => accumulator + currentValue.time, 0);
                            setStage('final')
                        }
                        }
                        finalWordsBTN={'לסיום לחץ כאן'}
            />
        </>)

    }
    if (stage === "final") {
        return (<>
            <h2>תודה!</h2>

            {/*<ResultTable person={person}/>*/}
        </>)

    }

    if (stage === 'timeOut'){
        return (
            <>
                <h2>הזמן נגמר</h2>
                <button onClick={() => {
                    setStage('final')
                }}>לסיום לחץ כאן
                </button>
            </>
        )

    }


};

export default Main;