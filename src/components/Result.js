import React from 'react'
import { objData } from './Quiz'

                // console.log(objData)
function Result() {
    return (
        <>
            <h3>result</h3>

            <p>user name : {objData.username}</p> 
             <p>level : {objData.userlevel}</p><br/>
            <p>test mode : {objData.testmode}</p>
            <p>total score: {objData.totalscore}</p>
            <p>wrong : {objData.totalwronf}</p>
            <p>total time taken : {objData.totaltimetaken}</p>
            
        </>
    )
}

export default Result
