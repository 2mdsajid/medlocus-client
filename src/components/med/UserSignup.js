import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ROOT from '../Const';

function UserSignup() {

    const history = useNavigate()

    // DEFINING A USER IN JSON FORMAT TO STORE INPUT DATA
    const [user, setUser] = useState({
        username: '', email: '', password: ''
      })

    //   STORING THE INPUT VALUES IN USER JAOS
    let name,value
    const handleInput = (e) => {
         name = e.target.name;
         value = e.target.value;
    
        setUser({ ...user, [name]: value })
      }


const userSignup = async (e) =>{
    e.preventDefault()

    const {username,email,password} = user

    const res = await fetch(ROOT+"/usersignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()

      
    if (data.status === 422 || !data){
        console.log('invalid')
      } else {
        console.log('success')
  
        history('/userprofile')
        
      }

}

  return (
    <>
      <h3>signup</h3>
      <div className="signup-container">
        <form method='POST' className="signup-form" id='signup-form'>
          <input type="text" placeholder="full name" name='username'
            value={user.username}
            onChange={handleInput}
          />
          <input type="text" placeholder="email" name='email'
            value={user.email}
            onChange={handleInput}
          />
          <input type="password" placeholder="password" name='password'
            value={user.password}
            onChange={handleInput}
          />
          <input id='sign-up' type="submit" value="Sign Up" onClick={userSignup} />
        </form>
        <p class="old-user-login">Already a user? <span><Link to="/login">LOGIN HERE</Link></span></p>
      </div>

    </>
  )
}

export default UserSignup
