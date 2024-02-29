import Card from "../Card/Card";
import React, { useState } from "react";
import {TestData} from "../../App";

type TestSliderProps = {
    tests: TestData[];
    finalWords: string;
    finalWordsBTN: string;
    nextStage: () => void;
};

const TestSlider: React.FC<TestSliderProps> = ({ tests, finalWords, nextStage, finalWordsBTN }) => {
    const [curState, setCurState] = useState(0);
    const [curInput, setCurInput] = useState<string | null>(null);
    const [startTimer, setStartTimer] = useState(Date.now())

    const nextQuiz = (e: React.KeyboardEvent) => {
        console.log(e.key)

        if (e.key === ' ' && curInput !== null) {
            // Logic to handle user answer and move to next question
            handleUserAnswer();
        }
    };

    const handleButtonClick = () => {
        // Logic to handle user answer and move to next question
        handleUserAnswer();
    };

    const handleUserAnswer = () => {
        if (curState < tests.length) {
            const updatedTests = [...tests];
            updatedTests[curState].userAnswer = Number(curInput); // Store the current input as the user's answer

            const endTime = Date.now(); // Get the current time
            updatedTests[curState].time = +((endTime - startTimer)/1000).toFixed(2); // Calculate the time difference

            setStartTimer(endTime); // Reset the start time for the next question
            setCurState(prevState => prevState + 1); // Move to next question
            setCurInput(null); // Clear the input field
        }
    };

    const setCurInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const goodValues = ['1','2','3','4','5','6','7','8','9','0']


        for (const char of e.target.value) {
            if (!goodValues.includes(char)) {
                return
            }
        }
        setCurInput(e.target.value);
    };

    const clearInput = () => {
        setCurInput(null);
    };

    if (curState < tests.length) {
        return (
            <Card
                question={tests[curState].question}
                keyPressFunc={nextQuiz}
                clickFunc={handleButtonClick}
                curInput={curInput}
                setCurInputHandler={setCurInputHandler}
                clearInput={clearInput} 
                nextStage={(e)=>{
                    
                    console.log(e);
                    
                    nextStage()}}/>
        );
    } else {
        // All tests are completed, show final words
        return (<>
            <Card question={finalWords} clickFunc={()=>{nextStage()
                }} showInput={false} 
                
                nextStage={(e)=>{
                    console.log(e);
                    if(e.key===" ")
                    nextStage()}}

                
                />
                <button onClick={()=>nextStage()}>{finalWordsBTN}</button>
    </>
        );


        // nextStage()


    }
};

export default TestSlider;
