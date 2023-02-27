import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Bio from '../quizes/Bio'
import Phy from '../quizes/Phy'
import Chem from '../quizes/Chem'
import Question from '../quizes/Question'
import { QnAttempt } from '../quizes/Question'
import TYPEOFTEST from './Testtype'

import ROOT from './Const'


// use link to navigte to a.href
import { Link } from 'react-router-dom';
// import { useranswers } from '../quizes/Question'

// let arrayofQn = []
// let answers;

var objData;



/* RENDERING QUESTION */

const style = {
    height:'200px'
}


function Quiz() {

    // console.log(typeoftest)
    // let ansObj;
    const history = useNavigate()

    const style = {
        margin: '10px',
        padding: '5px'
    }

    // const [qnattempt,setqnAttempt] = (qnattempt)

    let [defanswers, setAns] = useState([])

    let [arrayofQn, setarrayofQn] = useState([])

    const [questions, setQuestions] = useState([])
    const [phyqns, setPhyQuestions] = useState([])
    const [bioqns, setBioQuestions] = useState([])
    const [chemqns, setChemQuestions] = useState([])

    const [bioQnNum, setBioQnNum] = useState('')
    const [phyQnNum, setPhyQnNum] = useState('')
    const [chemQnNum, setChemQnNum] = useState('')

    const [ansobject, setansObject] = useState({})
    const [qnattempt, setqnAttempt] = useState(0)

    let [qnscore, setqnScore] = useState(0)
    let [qnwrscore, setqnwrScore] = useState(0)


    let [timeleft, settimeLeft] = useState(null)
    let [totaltime, settotalTime] = useState()
    const [timechangeState, settimechangeStata] = useState(false)
    // let timeleft = 0

    const [timeoutId, setTimeoutId] = useState(null);

    // FOR TEST TYPE
    const [testtype, settestType] = useState({})

    // TEST INFO
    const [testmodel, settestModel] = useState()

    // USERNAME AND LEVEL
    const [username, setuserName] = useState()
    const [userlevel, setuserLevel] = useState()

    // EXPORTING // FOR RESULT
    // const [objData,setobjData] = useState()




    /* FOR TIME LEFT */
    let timeUpdate
    if (timechangeState) {
        timeUpdate = setTimeout(() => {
            timeleft = timeleft - 1

            if (timeleft < 0) {
                clearTimeout(timeUpdate)
                // console.log('time out')
                settimechangeStata(false)
                timeleft = 0
            }
            settimeLeft(timeleft)
        }, 1000);
    }


    /* FUNCTION TO FETCH DATA ACCORDING TO SUBJECT */
    const fetchSubjectData = async (subject, num) => {
        const res = await fetch(`${ROOT}/get${subject}question`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ [subject.toLowerCase()[0]]: num })
        });

        const data = await res.json();
        if (data.status === 422 || !data) {
            console.log(`fail to fetch ${subject.toLowerCase()}`);
        } else {
            console.log(`success ${subject.toLowerCase()}`);
            return data;
        }
    };



    /* ON-CLICK EVENT OF FRM TO CALL THE ABOVE FUNCTION AND FETCH THE DATA */
    const renderQuestion = async (e) => {
        e.preventDefault()

        const idd = e.currentTarget.id;
        settestModel(idd)
        const selectedTest = await testType(idd)

        // setPhyQnNum(selectedTest.p);
        // setBioQnNum(selectedTest.b);
        // setChemQnNum(selectedTest.c);

        const time = selectedTest.t
        settotalTime(time)
        settimeLeft(time)

        settimechangeStata(true)

        const bioData = await fetchSubjectData('Bio', selectedTest.b);
        setBioQuestions(bioData);

        const chemData = await fetchSubjectData('Chem', selectedTest.c);
        setChemQuestions(chemData);

        const phyData = await fetchSubjectData('Phy', selectedTest.p);
        setPhyQuestions(phyData);

        const matData = await fetchSubjectData('Mat', selectedTest.m);
        setPhyQuestions(matData);

        arrayofQn = [...bioData, ...chemData, ...phyData,...matData];
        setQuestions(arrayofQn)

        console.log('questions')
        console.log(arrayofQn)

        /* ANSWERS ARRAY */
        arrayofQn.map((array) => {
            // console.log('ansssssss')
            const ansObj = {
                id: array._id, ans: array.ans
            }
            setAns(prevArray => [...prevArray, ansObj])
        })
    }


    // GET INPUT FROM THE ANSWERS
    const testType = async (idd) => {
        const selectedTest = TYPEOFTEST.find((type) => type.id === idd);
        if (!selectedTest) {
            return;
        }
        return selectedTest
    };

    const getInput = (e) => {
        const value = e.currentTarget.value
        const id = e.currentTarget.id
        const index = e.currentTarget.name

        ansobject[id] = value

        // GET LENGTH ON ANSOBJECT
        const ansObjLength = Object.keys(ansobject).length
        setqnAttempt(ansObjLength)

        defanswers.map((defanswer) => {
            if (defanswer.id === id) {
                if (defanswer.ans === value) {
                    console.log('right')
                    setqnScore(qnscore + 1)
                } else {
                    setqnwrScore(qnwrscore + 1)
                    console.log('wrong')
                }
            }
        })
    }

    const mergeQn = () => {

        // ansobject
        defanswers.map((defanswer) => {
            const ans = defanswer.ans
            const uans = ansobject[defanswer.id]

            if (uans === ans) {
                console.log('right')
                setqnScore(qnscore + 1)
            } else {
                console.log('wrong')
                setqnwrScore(qnwrscore + 1)
                // console.log(qnwrscore)
            }
        })

        return defanswers
    }



    const checkAnswers = async (e) => {

        e.preventDefault();

        // STOPPIN THE TIMER
        clearTimeout(timeUpdate)
        console.log('submitted')
        settimechangeStata(false)

        const timetaken = totaltime - timeleft

        objData = {
            username: username,
            userlevel: userlevel,
            testmode: testmodel,
            totalscore: qnscore,
            totalwrong: qnwrscore,
            totaltimetaken: timetaken
        }


        const res = await fetch(ROOT+'/saveuser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // since database stores only string form
            body: JSON.stringify(objData)
        })

        const data = await res.json()
        console.log('after send')
        console.log(data)

        if (data.status === 422 || !data) {
            // window.alert("invalid")
            console.log('invalid')
        } else {
            // window.alert("success")
            console.log('success')

            history('/result')

        }

        // console.log(objData)

        // history('/result')

    }

    return (
        <>



            <div className='quiz'>
                <form className='reqForm' action="" method="POST">


                    <input type="text" placeholder="ypur name" name='c'
                        onChange={(e) => setuserName(e.currentTarget.value)}
                    />
                    <input type="text" placeholder="your level" name='b'
                        onChange={(e) => setuserLevel(e.currentTarget.value)}
                    />
                    <br />

                    <button id='model' p='1' type='submits' style={style} onClick={renderQuestion}>model</button>
                    <button id='model2' p='2' type='submits' style={style} onClick={renderQuestion}>model2</button>

                </form>

                <div className="q">
                    <div className="left">
                        <p>profile</p>
                        <p>{username}</p>
                        <h3>{userlevel}</h3>
                        <p>score : {qnscore}</p>
                    </div>
                    <div className="middle">
                        <p>quiz</p>
                        <form onSubmit={checkAnswers} action="" method="POST">

                            {
                                questions.map((question, index) => {
                                    {/* console.log(answers) */ }
                                    return (<div className="question">
                                        <p className="qn"><span className="qn-num">{index} </span> {question.qn} </p>
                                        {question.img && <img style={{height:'200px'}} src={question.img} alt="Question Image" />}
                                        <div><input onChange={getInput} type="radio" id={question._id} name={index} value={question.a} /><label for="huey">{question.a}</label></div>
                                        <div><input onChange={getInput} type="radio" id={question._id} name={index} value={question.b} /><label for="sth">{question.b}</label></div>
                                        <div><input onChange={getInput} type="radio" id={question._id} name={index} value={question.c} /><label for="sth3">{question.c}</label></div>
                                        <div><input onChange={getInput} type="radio" id={question._id} name={index} value={question.d} /><label for="sth4">{question.d}</label></div>
                                    </div>)



                                    {/* return (
                        <Question key={index}
                            index={index}
                            qn={question.qn}
                            a={question.a}
                            b={question.b}
                            c={question.c}
                            d={question.d}
                            id={question._id}
                        />
                    ) */}


                                })
                            }



                            <button type="submit">submit answers</button>
                        </form>
                    </div>
                    <div className="right">
                        <p>status</p>
                        <p>qn attempt : {qnattempt}</p>
                        <p>time left : {timeleft}</p>
                    </div>
                </div>

                <button type='submit' onClick={checkAnswers}>answers</button>


            </div>

            <Link to="/addquestions">Add Questions</Link>

        </>



    )
}

export default Quiz

export { objData }