import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { RenderNav } from './Testtype';
// import { websiteMode } from './Testtype';
// import { user_type } from './med/Home';
// import { userLoggedIn } from './med/functions';

import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import { userLoggedIn } from './med/functions';


function Header() {
  const [shownav, setshowNav] = useState(false);
  const [showlogout, setshowLogout] = useState(false)

  // const [userType, setUserType] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const user_type = Cookies.get("usertype");

      if (user_type) {
        // setUserType(user_type);
        setshowNav(true);
      } else {
        setshowNav(false);
      }
    }, 100);
    // return () => clearInterval(interval);


  }, []);


  return (
    <>
      {shownav && <div className='header'>
        <Link className='link-head' to='/home'>Home</Link>
        <Link className='link-head' to='/notes'>Notes</Link>
        <Link className='link-head' to='/test'>Test</Link>
        <Link className='link-head' to='/userprofile'>
          Profile
        </Link>

      </div>}
    </>
  );
}

export default Header
