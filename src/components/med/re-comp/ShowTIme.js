import React from 'react'
import Countdown from 'react-countdown'

function ShowTIme(props) {

    const desiredTime = new Date();
    desiredTime.setHours(16); // Set the hour to 4 PM
    desiredTime.setMinutes(0); // Set the minutes to 0
    desiredTime.setSeconds(0); // Set the seconds to 0
    console.log('now',Date.now()/1000)

    const desiredTimeInSeconds = Math.floor(desiredTime.getTime() / 1000);
    console.log((Date.now()-desiredTimeInSeconds)/1000);

    const timer = () => {

    }

    if (props.time.type === 'free') {
        return <p>Time : {props.time.value} seconds</p>
    } else {
        return <p>test starts in : <Countdown date={desiredTimeInSeconds} /></p>
    }
}

export default ShowTIme
