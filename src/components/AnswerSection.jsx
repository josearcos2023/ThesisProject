// import React from 'react'

// const AnswerSection = ({ storedValues, formatExamText }) => {
//     const copyText = (text) => {
//         navigator.clipboard.writeText(text);
//     };

//     return (
//         <>
//             <hr className="hr-line" />
//             {/* <div className="answer-section">
// 						<p className="question">{question}</p>
// 						<p className="answer">{answer}</p>
// 						<div className="copy-icon">
// 							<i className="fa-solid fa-copy"></i>
// 						</div>
// 					</div> */}
//             <div className="answer-container">
//                 {storedValues.map((value, index) => {
//                     return (
//                         <div className="answer-section" key={index}>
//                             <p className="question">{value.question}</p>
//                             <p className="answer">{formatExamText(value.answer)}</p>
//                             <div
//                                 className="copy-icon"
//                                 onClick={() => copyText(value.answer)}
//                             >
//                                 <i className="fa-solid fa-copy"></i>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </>
//     )
// }

// export default AnswerSection

//TEST//
import React from 'react'

const AnswerSection = ({ storedValues, formatExamQuestions }) => {
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <hr className="hr-line" />
            <div className="answer-container">
                {storedValues.map((value, index) => {
                    return (
                        <div className="answer-section" key={index}>
                            <p className="question"><strong>Prompt:</strong> {value.question}</p>
                            <div className="answer">
                                {formatExamQuestions(value.answer)}
                            </div>
                            <div
                                className="copy-icon"
                                onClick={() => copyText(JSON.stringify(value.answer, null, 2))}
                            >
                                <i className="fa-solid fa-copy"></i>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default AnswerSection