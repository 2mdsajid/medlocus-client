import React, { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook';


function Timer({ expiryTimestamp, onExpire, onTick=()=>{} }) {

  const [sec,setSec] = useState(0)

    const {
        seconds,
        minutes,
        hours,
      } = useTimer({ expiryTimestamp, onExpire });

      useEffect(() => {
        setSec(seconds);
        onTick(minutes)
      }, [seconds]); //this will run only if seconds change
    

  return (
    <div>Timer: {hours} Hours, {minutes} Minutes, {seconds} Seconds</div>
  )
}

export default Timer
