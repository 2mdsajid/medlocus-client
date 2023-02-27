import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
// import { objData } from './Quiz'
import ROOT from '../Const';

import { checkAnswer } from './functions';

import ShowAns from './re-comp/ShowAns';


// import React from 'react'

/* 

-attended users -> test collection
-test,scores,time,questions -> usercollection

*/



function ResultShow() {

    const [questions, setQuestions] = useState([])
    const [test, setTest] = useState({})
    const [rightscore, setrightScore] = useState(0)
    const [wrongscore, setwrongScore] = useState(0)
    const [unattemptscore, setunattemptScore] = useState(0)

    const [overallresult, setoverallResult] = useState([])
    // show button if it is daily test
    const [showanswer, setshowAnswer] = useState(false)
    const [showoverallresultbtn, setshowoverallresultBtn] = useState(true)
    // const [newresult,setnewResult] = useState([])
    const [objData, setObj] = useState([])
    const [showoverallresult, setshowoverResult] = useState(false)
    const [notloggedtext, setnotloggedText] = useState('')

    const location = useLocation();

    const username = location.state.username;

    // SHIW ANSWERS

    // SAVE TEST DATA IN THE RESPECTIVE USERS DATABASE
    const saveTestToUser = async (testmode, testtitle, totalscore, totalwrong, unattempt, totaltimetaken, questions) => {

        // const { testmode,testtitle,totalscore,totalwrong,unattempt,totaltimetaken,questions} = req.body

        const res = await fetch(ROOT+'/addtestdata', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // since database stores only string form
            body: JSON.stringify({
                testmode,
                testtitle,
                totalscore,
                totalwrong,
                unattempt,
                totaltimetaken,
                questions
            })
        })

        const data = await res.json()

        if (data.status === 401 || !data) {
            console.log('user not logged in')
        } else {
            console.log('user logged in')
        }
    }


    // PERFORM THE CALCULATIONS
    const calcu = (questions) => {
        questions.map((question) => {
            if (question.ans === question.uans) {
                setrightScore((rightscore) => rightscore + 1)
            } else if (question.uans === 'nan') {
                setunattemptScore((unattemptscore) => unattemptscore + 1)
            } else {
                setwrongScore((wrongscore) => wrongscore + 1)
            }
        })

        return 'question checked'
    }

    // SEND THE TEST DATA TO THE TEST DATABASE
    const saveUserToTest = async (id, username, totalscore) => {
        try {
            const res = await fetch(ROOT+'/saveusertotest', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // since database stores only string form
                body: JSON.stringify({ id, username, totalscore })
            })
            const data = await res.json()
            // setoverallResult(data.users)

            if (data.status != 401) {
                return 'attended user sent successfully'
            } else {
                return 'cant send the attended user'
            }
        } catch (error) {
            console.log('attended user save', error)
        }
    }

    const checkLogin = () => {

    }

    const showOverallResult = async (e) => {
        e.preventDefault()

        // console.log(objData.testname)

        try {
            const res = await fetch(ROOT+'/showoverallresult', {
                method: 'POST',
                headers: {
                    // because there is cookies
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

                // bwcause cookies is there
                credentials: 'include',
                body: JSON.stringify({ testmode: objData.testmode })
            })

            const data = await res.json()
            if (data.status !== 401) {
                setoverallResult(data)
                const sortedData = [...overallresult].sort((a, b) => a.totalscore - b.totalscore)
                console.log(sortedData)
                // setoverallResult(sortedData)
                setshowoverResult(true)
            } else {
                setnotloggedText('please log in to see overall result')
            }



        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        // console.log('right score changed to useffect2', rightscore);
        // console.log('right score changed to useffect2', wrongscore);
        // console.log('right score changed to useffect2', unattemptscore);
        // console.log('wrong score changed to', wrongscore);
        // console.log('here goes save to user in useeffect 2')

        // {testmode,
        //     testtitle,
        //     totalscore,
        //     totalwrong,
        //     unattempt,
        //     totaltimetaken,
        //     questions}

        if (wrongscore > 0 || rightscore > 0 || unattemptscore > 0) {
            const savetesttouserstatus = saveTestToUser(
                test.testname,
                test.testtitle,
                rightscore,
                wrongscore,
                unattemptscore,
                test.totaltimetaken,
                questions)

            const saveusertoteststatus = saveUserToTest(
                test._id,
                test.username,
                rightscore
            )
            
            console.log('res from add test to user', savetesttouserstatus)
            console.log('res from add user to test', saveusertoteststatus)
        }

    }, [rightscore, wrongscore, unattemptscore]);

    useEffect(() => {
        const questions = location.state.questions;
        const test = location.state.test;
        setQuestions(questions)
        setTest(test)

        // console.log('before question passed to function')
        const res = calcu(questions)
        // console.log('right score in useeffect1',rightscore)
        // console.log('result from fun in use effect', res)

        // setObj(objData)
        console.log('use effect', test)

        // const { _id, ...newquestions } = questions;


        // console.log('newquestions in useeffect', newquestions)

        // TO SHOW OR HIDE OVERALL RESULT
        if (test.category === 'modeltest') {
            setshowoverallresultBtn(false)
        }
    }, [])


    return (
        <>
            <h3>result</h3>
            <p>user name : {test.username}</p>
            <p>test mode : {test.testtitle}</p>
            <p>total score: {rightscore}</p>
            <p>wrong : {wrongscore}</p>
            <p>Not attempted : {unattemptscore}</p>
            <p>total time taken : {test.totaltimetaken}</p>
            <br />
            <br />
            <button type="submit" onClick={() => setshowAnswer(true)}>see answers </button>
            {showanswer && <p>answers</p>}
            {showanswer && <ShowAns questions={questions} />}
            {showoverallresultbtn && <button type="submit" onClick={showOverallResult}>see overall reesult </button>}
            {showoverallresult ? <h3>Overall Result</h3> : <p style={{ color: 'red' }} >{notloggedtext}</p>}
            {
                overallresult.map((result, index) => {
                    return <p>{index}. {result.username} : {result.totalscore}</p>
                })
            }
        </>
    )
}

export default ResultShow