import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLoggedIn } from './functions'
import Cookies from 'js-cookie';
import ROOT from '../Const';

function UserProfile() {

    const history = useNavigate()
    const history2 = useNavigate()
    const [userinfo, setuserInfo] = useState({})
    const [usertests, setuserTests] = useState([])
    const [loggedin, setloggedIn] = useState(true)
    // const [showlogout, setshowLogout] = useState(false)


    const doLogOut = async () => {
        // Cookies.remove('logintoken');
        // console.log('logout')
        setloggedIn(false)

        const res = await fetch(ROOT+'/logout', {
            method: 'GET',
            headers: {
                // because there is cookies
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            // bwcause cookies is there
            credentials: 'include'
        })

        // const data = await res.json()

        // console.log(data)

        const user_type = Cookies.get("usertype")
        history2('/home', { state: { id: user_type } })

      }


    const renderuserProfile = async () => {
        try {

            const res = await fetch(ROOT+'/userprofile', {
                mode: 'no-cors',
                method: 'GET',
                headers: {
                    // because there is cookies
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                 credentials: "same-origin" ,
                withCredentials: true, 

                // bwcause cookies is there
                credentials: 'include'
            })
            
            console.log('before getting data')
            const data = await res.json()
            setuserInfo(data)
            setuserTests(data.tests)
            console.log(data)


            if (data.status == 401) {
                history('/login')
                setloggedIn(false)
                console.log('after  getting 401')
            }

        } catch (error) {
            console.log(error)
            console.log('before getting error')
            // history('/test/login')
        }
    }

    // const check = async () => {
    //     const loggedin = await userLoggedIn()

    //     if (loggedin) {
    //         // console.log('logged in profile')
    //         console.log(loggedin)
    //     } else (
    //         console.log(loggedin)
    //         // console.log('not logged profile')
    //     )
    // }



    useEffect(() => {
        renderuserProfile()

        // userLoggedIn().then(result => console.log(result.PromiseResult))
        

        // check()

        // if(userLoggedIn()){
        //     console.log('logged in profile')
        // }else(
        //     console.log('not logged profile')
        // )

        // {userLoggedIn() ? console.log('logged in profile') : console.log('not logged in profile')}

    }, [loggedin])

    return (<>
        {loggedin ? <div>
            <h4>user profile</h4>
            <p>name : {userinfo.username}</p>
            <p>emaail : {userinfo.email}</p>
            <p>date joined : {userinfo.date}</p>
            <h5>Tests attended</h5><hr />
            {loggedin && <button className='link-head' onClick={doLogOut}>logout</button>}
            {usertests.map((test, index) => {
                return (<>
                    <p>{index + 1} : {test.testmode}</p>
                    <p>score : {test.totalscore}</p>
                    <p>time taken : {test.totaltimetaken}</p>
                    <p>date attended : {test.date}</p><br />
                </>)
            })}
        </div> : <p>please log in to view your profile</p>}
        </>
    )
}

export default UserProfile
