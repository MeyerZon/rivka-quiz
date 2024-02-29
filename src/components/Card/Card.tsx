// import style from "./Card.module.css";
// import React from "react";
//
// type CardProps = {
//     question: string,
//     keyPressFunc?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
//     clickFunc: () => void,
//     showInput?: boolean,
//     curInput?: number | null,
//     clearInput?: () => void,
//     setCurInputHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
// }
//
//
// const Card: React.FC<CardProps> = ({
//                                        question,
//                                        keyPressFunc,
//                                       // clickFunc,
//                                        showInput = true,
//                                        curInput,
//                                        setCurInputHandler,
//                                       // clearInput
//                                    }) => {
//     return (
//         <div className={style.card}>
//             <h3>{question}</h3>
//             {showInput && (
//                 <input
//                     type={'number'}
//                     onChange={setCurInputHandler}
//                     value={curInput ?? ''}
//                     onKeyDown={keyPressFunc}
//                 />
//             )}
//             {/*<button onClick={() => {*/}
//             {/*    clickFunc();*/}
//             {/*    if (clearInput) {*/}
//             {/*        clearInput();*/}
//             {/*    }*/}
//             {/*}}>תשובה</button>*/}
//         </div>
//     );
// };
//
//
// export default Card;




import React, { useEffect, useRef } from 'react';
import style from "./Card.module.css";

type CardProps = {
    question: string,
    keyPressFunc?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
    clickFunc: () => void,
    showInput?: boolean,
    curInput?: string | null,
    clearInput?: () => void,
    setCurInputHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
    nextStage: (event: React.KeyboardEvent<HTMLInputElement>) => void,
}


const Card: React.FC<CardProps> = ({

                                       question,
                                       keyPressFunc,
                                       // clickFunc,
                                       showInput = true,
                                       curInput,
                                       setCurInputHandler,
                                       nextStage
                                       // clearInput

                                   }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (inputRef.current && !event.metaKey && !event.ctrlKey && !event.altKey) {
                inputRef.current.focus();
            }
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    return (
        <div className={style.card}>
            <h3>{question}</h3>
            
                <input

                style={showInput?{}:{width:'0px', height:'0px', border:'none', padding:'0px', margin:'0px'}}
                    ref={inputRef}
                    type="text"
                    onChange={setCurInputHandler}
                    value={curInput ?? ''}
                    onKeyDown={showInput?keyPressFunc:nextStage}
                />
            
        </div>
    );
};

export default Card;
