import React, { useEffect, useRef, useState } from 'react'
import Displayimage from './Displayimage'
import { log } from './Testtype'
// import logo from '../../public/images'
// import { userType } from './Testtype';
import Countdown from 'react-countdown'

import Cookies from 'js-cookie'; //cookies library

import TestFor from './med/re-comp/TestFor';


// use link to navigte to a.href
import { Link, useNavigate } from 'react-router-dom';

import Timer from './med/re-comp/Timer';



function Home() {

  // userType.type = null

  // navigate to a link
  const history = useNavigate()

  const style = {
    margin: '10px',
    padding: '5px',
  }

  const routenewHome = (e) => {
    e.preventDefault()
    const user_type = e.currentTarget.id

    // console.log(user_type)

    Cookies.set('usertype',user_type , { expires: 99 });


    // to pass the ID of the type to new home page
    history('/home')

    // userType.type = user_type

  }

  const handleCountdownComplete = (e) =>{
    // inputRef.current.click()
    // console.log('current btn id',e.currentTarget.id)
    console.log('button clicked for test')
  }

  const handleSec = (seconds) =>{
    console.log('seconds',seconds.seconds)
  }

   // TO USE THE DOM ELEMENT EVENTS
   const inputRef = useRef(null);

  const handlebuttonclick = () =>{
    console.log('button clicked')
    
  }

  useEffect(() => {
    Cookies.remove('usertype');
    // console.log('rmv cookie')
  }, []);


  return (
    <>

    {/* <TestFor onClickEvent={handleCountdownComplete} />
    <Countdown date={Date.now() + 5000} onComplete={handleCountdownComplete} onTick={handleSec}/> */}
    {/* <button ref={inputRef} onClick={handlebuttonclick}>click me</button>  */}

    {/* <Timer expiryTimestamp={Date.now() + 20000} onExpire={handleCountdownComplete} /> */}

      <h4 className='home1-wlcm'>welcome to medlocus</h4>
      {/* <img src={logo} alt="" /> */}
      <button id='aspirant' type='submits' style={style} onClick={routenewHome} >Aspirant</button>
      <button id='student' type='submits' style={style} onClick={routenewHome} >Student</button>
    </>
  )
}

export default Home