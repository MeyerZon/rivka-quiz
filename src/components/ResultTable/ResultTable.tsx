import React from 'react';
import {Person} from "../../App";
import ResultRow from "../ResultRow/ResultRow";

const ResultTable: React.FC<{ person: Person }> = ({person}) => {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}><h6>Question</h6>
                <h6> UserAnswer</h6><h6>Correct Answer</h6><h6>Time</h6></div>
            {person.tests.map((test,i) => <ResultRow key={Math.random()*10000 +""+i} question={test.question}
                                                   correctAnswer={test.correctAnswer}
                                                   time={test.time}
                                                   userAnswer={test.userAnswer}
            />)}
        </div>
    );
};

export default ResultTable;