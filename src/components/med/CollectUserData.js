import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TYPEOFTEST from '../Testtype';
import ShowTIme from './re-comp/ShowTIme';
import Countdown from 'react-countdown'
import Timer from './re-comp/Timer';

import ROOT from '../Const';

import names from 'random-indian-name'
import Cookies from 'js-cookie';
// var names = require();

// GET INPUT FROM THE ANSWERS
// const selecttestType = (typeoftest) => {
//     const selectedTest = TYPEOFTEST.find((type) => type.id === typeoftest);
//     if (!selectedTest) {
//         return;
//     }
//     return selectedTest
// };




const CollectUserData = () => {

    const history = useNavigate()

    const [username, setuserName] = useState('')
    const [nonamewarning, setnonameWarning] = useState('')
    const [userloggedin, setuserloggedIn] = useState(false)
    const [showstarttestButton, setshowstartButton] = useState(false)

    const location = useLocation();
    // typeoftest === selectedtest from prev page
    const typeoftest = location.state.typeoftest;
    // console.log('collectuser data', typeoftest)

    // SETTING  A USERNAME IN THE RECEIVED OBJECT
    typeoftest.username = username

    // TO GET THE TIME VALUE OF THE TEST  
    function ShowTime(props) {

        const desiredTime = new Date();
        const currentDate = desiredTime.getDate()
        // +parseInt(props.time.repeatafter)
        desiredTime.setDate(currentDate); // Set the date to 1 day next
        desiredTime.setHours(props.time.value); // Set the hour to 4 PM
        desiredTime.setMinutes(56); // Set the minutes to 0
        desiredTime.setSeconds(0); // Set the seconds to 0

        const desiredTimeInSeconds = Math.floor(desiredTime.getTime() / 1000);
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const timeForTheTest = (desiredTimeInSeconds - currentTimeInSeconds) * 1000;
        // console.log(desiredTimeInSeconds, currentTimeInSeconds, timeForTheTest)

        // to show the start-test-button
        const handleCountdownComplete = () => {
            setshowstartButton(true);
            console.log('show btn')
        };


        if (props.time.type === 'free') {
            setshowstartButton(true)
            return <><p>Time : {props.time.value} seconds</p><br/>
            <button onClick={startQuiz}>start test</button></>
        } else {
            // uncomment --------------------------------------
            return <>{showstarttestButton ? <button onClick={startQuiz}>start test</button> : <p>Test starts in: <Timer expiryTimestamp={Date.now() + timeForTheTest} onExpire={handleCountdownComplete} /></p>}</>;
            // return <button onClick={startQuiz}>start test</button>
        }
    }

    // generate a random name 
    const generateRandom = () => {
        const rndmname = names({ first: true })
        setuserName(rndmname)
        typeoftest.username = rndmname
        // console.log(typeoftest)
    }

    // TO GET THE USERNAME IF USER LOGGED IN
    const getUserName = async () => {
        const logintoken = Cookies.get("logintoken")
        try {
            const res = await fetch(ROOT+'/getusername', {
                 // mode: 'no-cors',
                 method: 'POST',
                 headers: {
                     "Content-Type": "application/json"
                 },
                 body: JSON.stringify({
                     logintoken: logintoken
                 })
            })
            const data = await res.json()

            if (data.status != 401) {
                setuserName(data.username)
                setuserloggedIn(true)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const startQuiz = () => {
        if (typeoftest.username) { //checking if the username is provided or not
            history(`/test/${typeoftest.testname}/${username}`, { state: { typeoftest: typeoftest } })
            // console.log('start quiz')
        } else {
            setnonameWarning('please provide a name')
        }

    }

    useEffect(() => {
        getUserName()
    }, [])

    return (
        <>
            <h3>test type: {typeoftest.testname}</h3>
            {typeoftest.physics && <p>physics : {typeoftest.physics} questions</p>}
            {typeoftest.chemistry && <p>chemistry : {typeoftest.chemistry} questions</p>}
            {typeoftest.biology && <p>biology : {typeoftest.biology} questions</p>}
            {typeoftest.mat && <p>MAT : {typeoftest.mat} questions</p>}
            {/* {typeoftest.time.value && <p>Time : {typeoftest.time.value} seconds</p>}
             */}

            {/* if user logged no input || username from userdatabase */}
            {userloggedin ? <p>username : {username}</p> : <div className='usernameinput'><input type="text" placeholder="your name" name='c'
                value={username}
                onChange={(e) => setuserName(e.currentTarget.value)}
            /><button  onClick={generateRandom}>generate random name</button>
            </div>}
            <ShowTime time={typeoftest.time} />
            {/* {showstarttestButton ? <button onClick={startQuiz}>start test</button> : <> </>} */}
            <p style={{ color: 'red' }}>{nonamewarning}</p>
        </>
    )
}

export default CollectUserData
