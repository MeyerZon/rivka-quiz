import style from "./ResultRow.module.css"
import React from "react";

const ResultRow: React.FC<{question: string, userAnswer: number|null, correctAnswer: number, time: number }> = ({question, userAnswer, correctAnswer, time}) => {
    return (
        <div className={style.row}>
            <p className={style.cell}>{question}</p>
            <p className={style.cell}>{correctAnswer}</p>
            <p className={`${style.cell} ${correctAnswer===userAnswer?style.green:style.red}`}>{userAnswer?userAnswer:'N/A'}</p>
            <p className={style.cell}>{time}</p>
        </div>
    );
};

export default ResultRow;