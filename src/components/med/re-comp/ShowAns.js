import React, { useState } from 'react'

function ShowAns(props) {
    const [questions, setQuestions] = useState([])

    useState(() => {
        setQuestions(props.questions)
        console.log(props.questions)
    }, [])

    const getQuestionClass = (uans) => {
        if (uans === 'nan'){
            return 'nil question'
        } else {
            return ''
        }
    }

    const getAnswerClass = (givenoption, useranswer, correctanswer) => {
        // checking if the selected option is either correct or user input
        if (givenoption === useranswer || givenoption === correctanswer) {
            // if given option is correct answer
            if (givenoption === correctanswer) {
                return 'correct'
            // if given option is user input and not correct
            } else if (givenoption === useranswer) {
                return 'incorrect'
            }
        } else {
            return ''
        }
        


    }

    return (
        <div className='anspage'>
            {
                questions.map((question, index) => {
                    return (<div className={getQuestionClass(question.uans)}>
                        <p className="qn" id={question._id}><span className="qn-num">{index + 1}. </span> {question.qn} </p>
                        {question.img && <img style={{ height: '200px' }} src={question.img} alt="Question Image" />}
                        <p id={question.a} className={getAnswerClass('a', question.uans, question.ans)}>a. {question.a}</p>
                        <p id={question.b} className={getAnswerClass('b', question.uans, question.ans)}>b. {question.b}</p>
                        <p id={question.c} className={getAnswerClass('c', question.uans, question.ans)}>c. {question.c}</p>
                        <p id={question.d} className={getAnswerClass('d', question.uans, question.ans)}>d. {question.d}</p>
                    <br/></div>)
                })
            }
        </div>
    )
}

export default ShowAns
