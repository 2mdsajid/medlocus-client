import React, { useState } from 'react'
import { answers } from '../components/Quiz'

let value, id;
// const useranswers = []



let ansobject = {}
let qnattempt = 0

const QnAttempt = () =>{
    return <p>qn attempt : {qnattempt}</p>
}

function Question(props) {

    const getInput = (e) => {
        const value = e.currentTarget.value
        const id = e.currentTarget.id
        const index = e.currentTarget.name

        ansobject[index] = value

        // GET LENGTH ON ANSOBJECT
        const ansObjLength = Object.keys(ansobject).length
        qnattempt = ansObjLength



        // console.log(ansobject)
        // console.log(qnattempt)

    }


    return (
        <>
            <div className="question">
                <p className="qn"><span className="qn-num">{props.index} </span> {props.qn} </p>
                <div><input onChange={getInput} type="radio" id={props.id} name={props.index} value={props.a} /><label for="huey">{props.a}</label></div>
                <div><input onChange={getInput} type="radio" id={props.id} name={props.index} value={props.b} /><label for="sth">{props.b}</label></div>
                <div><input onChange={getInput} type="radio" id={props.id} name={props.index} value={props.c} /><label for="sth3">{props.c}</label></div>
                <div><input onChange={getInput} type="radio" id={props.id} name={props.index} value={props.d} /><label for="sth4">{props.d}</label></div>
            </div>

        </>
    )
}



export default Question
export {QnAttempt}
// export {useranswers}
