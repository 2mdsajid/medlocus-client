import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Countdown from 'react-countdown'
import Timer from './re-comp/Timer'
import { storelocalStorage, loadlocalStorage, updatelocalStorage } from './functions'

import ROOT from '../Const';

// var objData;
function StartQuiz() {

    const history = useNavigate()
    const location = useLocation();

    // DEFAULT ANS ARRAY
    let [defanswers, setdefAns] = useState([])

    // QUESTIONS ARRAY STATES
    // let [arrayofQn, setarrayofQn] = useState([])
    const [questions, setQuestions] = useState([])
    const [phyqns, setPhyQuestions] = useState([])
    const [bioqns, setBioQuestions] = useState([])
    const [chemqns, setChemQuestions] = useState([])
    const [matqns, setMatQuestions] = useState([])

    // QNATTEMPT & THEIR ANSWERS(OBJECT)
    const [ansobject, setansObject] = useState({})
    const [qnattempt, setqnAttempt] = useState(0)
    const [rightscore, setrightScore] = useState(0)
    const [wrongscore, setwrongScore] = useState(0)

    // TOTALTIME AND TIMELEFT
    const [timeleft, settimeLeft] = useState(null)
    const [remtime, setremTime] = useState(null)
    const [totaltime, settotalTime] = useState(0)
    const [expiryTimestamp, setExpiryTimestamp] = useState(Date.now() + totaltime);

    const [localstoragetime, setlocalstorageTime] = useState(null)
    const [timechangeState, settimechangeStata] = useState(false)

    // DEFINING THE TEST OBECT FOR THE CURRENT TEST 
    const [test, setTest] = useState({})

    // TO CLICK BUTTON ON TIME END
    const [buttonClicked, setButtonClicked] = useState(false);

    // TO USE THE DOM ELEMENT EVENTS
    const inputRef = useRef();

    const showCountDown = async (timearray) => {

        // console.log('totaltime in show cd before if-else', totaltime)

        if (timearray.type === 'free') {
            const time = Number(timearray.value)
            // console.log('timearray', time)
            settotalTime(time)
            // console.log('totaltime in showCD free', totaltime)
        }

        else if (timearray.type === 'timed') {
            const desiredTime = new Date();
            desiredTime.setHours((Number(timearray.value) + Number(timearray.duration)))
            // desiredTime.setHours(18)
            desiredTime.setMinutes(51)
            desiredTime.setSeconds(0)
            // console.log('desired hr in ', desiredTime.getHours())
            const desiredTimeInSeconds = Math.floor(desiredTime.getTime() / 1000);
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);

            const timeForTheTest = (desiredTimeInSeconds - currentTimeInSeconds) * 1000;

            settotalTime(timeForTheTest)
            // console.log('time for test dt', timeForTheTest)
            // console.log('totaltime in showCD timed', totaltime)


            // const timeForTheTest = (desiredTimeInSeconds - currentTimeInSeconds) * 1000;
            // console.log(desiredTimeInSeconds, currentTimeInSeconds, timeForTheTest)
        }
    }


    const handleCountdownComplete = () => {
        inputRef.current.click()
        inputRef.current.blur()
        // settotalTime(0)
        console.log('totaltime in handle countdown', totaltime)
        // console.log('totaltime',ttime)
        // console.log('out')
    }


    /* GET INPUT FROM CLICKING THE ANSWERS */
    const getInput = (e) => {
        // console.log(test)
        const value = e.currentTarget.value
        const id = e.currentTarget.id
        const index = e.currentTarget.name

        // GET LENGTH ON ANSOBJECT
        ansobject[id] = value
        const ansObjLength = Object.keys(ansobject).length
        setqnAttempt(ansObjLength)

        questions.map((question) => {
            if (question._id == id) {
                question.uans = value
                // console.log('question matched', question)
            } else if (!question.uans) {
                question.uans = 'nan'
                // console.log(question)
            }
        })


        // not needed anymore---------------------
        // defanswers.map((defanswer) => {
        //     if (defanswer.id === id) {
        //         if (defanswer.ans === value) {
        //             console.log('right')
        //             setqnScore(qnscore + 1)
        //         } else {
        //             setqnwrScore(qnwrscore + 1)
        //             console.log('wrong')
        //         }
        //     }
        // })
    }

    /* FUNCTION TO FETCH DATA ACCORDING TO SUBJECT */
    // const fetchSubjectData = async (subject, num) => {

    //     // console.log('fetch qn in start quiz')

    //     // console.log(subject)
    //     const res = await fetch(`/get${subject}question`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ [subject]: num })
    //     });

    //     const data = await res.json();
    //     if (data.status === 422 || !data) {
    //         console.log(`fail to fetch ${subject.toLowerCase()}`);
    //     } else {
    //         console.log(`success ${subject.toLowerCase()}`);
    //         return data;
    //     }
    // };

    /* ON-CLICK EVENT OF FRM TO CALL THE ABOVE FUNCTION AND FETCH THE DATA */
    const renderQuestion = async () => {

        // TO GET THE TEST DATA FROM PREV PAGE
        const selectedTest = await location.state.typeoftest;
        setTest(selectedTest)

        console.log('renderqn in start quiz')

        const res = await fetch(`${ROOT}/getallquestion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                physics: selectedTest.physics,
                chemistry: selectedTest.chemistry,
                biology: selectedTest.biology,
                mat: selectedTest.mat
            })
        });

        const data = await res.json();

        const arrayofqn = [...data.bio, ...data.chem, ...data.phy, ...data.mat];

        setQuestions(arrayofqn)

        // console.log('selected test time value', selectedTest.time.value)
        settotalTime(selectedTest.time.value * 1000)
        // console.log('totaltime in renderqn function', totaltime)

        showCountDown(selectedTest.time)

        if (data.status === 402 || !data) {
            console.log(`fail to fetch questions`);
        } else {
            console.log(`success in fetching the questions`);
            return data;
        }


        /* THIS TO GET QUESTIONS IN SUBJECT WISE
        MANY REQUESTS WERE SENT AND RECEIVED SO LAGGY SO COMMENTED OUT */
        // // const bioData = await fetchSubjectData('biology', selectedTest.biology);
        // setBioQuestions(data.bio);

        /* ANSWERS ARRAY */
        // not needed anymore--------------------------------
        // questions.map((array) => {
        //     // console.log('ansssssss')
        //     const ansObj = {
        //         id: array._id, ans: array.ans
        //     }
        //     setdefAns(prevArray => [...prevArray, ansObj])
        // })
    }





    /* CHECK ANSWERS ON/WHLE SUMBITTING THE ANSWERS */
    const checkAnswers = async (e) => {

        e.preventDefault();
        // console.log('submitted')

        // await calcu()

        test.totaltimetaken = totaltime
        // console.log('timeleft', timetaken)

        const objData = {
            testmode: test.testname,
            totalscore: rightscore,
            totalwrong: wrongscore,
            totaltimetaken: totaltime
        }

        console.log('test data in check answer', test)

        history(`/test/${test.testname}/${test.username}/result`, { state: { questions: questions, test: test } })

    }

    useEffect(() => {
        renderQuestion()
        // console.log('use effect start quiz page')
        console.log('totaltime in useeffect', totaltime)

    }, []);

    return (
        <>
            <h4>quiz page</h4><br /><br />
            <div className="q">
                <div className="left">
                    <p>profile</p>
                    <hr />
                    <p>{test.username}</p>
                    <h3>{test.userlevel}</h3>
                    <p>score : {rightscore}</p>
                    <p>wrong : {wrongscore}</p>
                </div>
                <div className="middle">
                    <p>quiz</p>
                    <hr />
                    <form onSubmit={checkAnswers} action="" method="POST">
                        {
                            questions.map((question, index) => {
                                return (<div className="question">
                                    <p className="qn"><span className="qn-num">{index+1} </span> {question.qn} </p>
                                    {question.img && <img style={{ height: '200px' }} src={question.img} alt="Question Image" />}
                                    <div><input onChange={getInput} type="radio" id={question._id} name={index} value='a' /><label for="huey">{question.a}</label></div>
                                    <div><input onChange={getInput} type="radio" id={question._id} name={index} value='b' /><label for="sth">{question.b}</label></div>
                                    <div><input onChange={getInput} type="radio" id={question._id} name={index} value='c' /><label for="sth3">{question.c}</label></div>
                                    <div><input onChange={getInput} type="radio" id={question._id} name={index} value='d' /><label for="sth4">{question.d}</label></div>
                                </div>)
                            })
                        }

                        <button type="submit" ref={inputRef}>submit answers</button>
                    </form>
                </div>
                <div className="right">
                    <p>status</p>
                    <hr />
                    <p>qn attempt : {qnattempt}</p>
                    {totaltime > 0 && <Timer expiryTimestamp={Date.now() + totaltime} onExpire={handleCountdownComplete} />}

                    {/* <Timer expiryTimestamp={expiryTimestamp} onExpire={handleCountdownComplete} /> */}
                </div>
            </div>
        </>
    )
}

export default StartQuiz
