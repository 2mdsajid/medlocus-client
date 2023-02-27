import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ROOT from '../Const';
import Cookies from 'js-cookie';

function UserLogin() {

  const history = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = async (e) => {
    e.preventDefault()
    // console.log(email, password)
    const user = {
      email:email,
      password:password
    }
    
    console.log(user)

    try {

      const res = await fetch(ROOT+"/userlogin", {
        mode: 'no-cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()
      console.log('data received after login',data)
      Cookies.set('logintoken',data.logintoken)


      if (data.status === 422 || !data) {
        console.log('invalid')
      } else {
        console.log('success')
        history('/userprofile')
        console.log('user logged in')
      }

    } catch (error) {
  console.log(error)
    }
  }

  return (
    <>
      <h3>login</h3>
      <form onSubmit={userLogin} action="" method="post">
        <input type="text" placeholder='email'
          onChange={(e) => setEmail(e.currentTarget.value)} />

        <input type="text" placeholder='password'
          onChange={(e) => setPassword(e.currentTarget.value)} />
        <input type="submit" value="log in" />
      </form>
      <p>Not a user? <Link to='/signup'>Do a quick signup</Link></p>
    </>
  )
}

export default UserLogin
