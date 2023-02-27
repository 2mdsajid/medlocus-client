import React, { useEffect, useState } from 'react'
import { websiteMode } from '../Testtype'
import Header from '../Header';
import Nav from '../Header'
// import { userType } from '../Testtype';

import { useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import ROOT from '../Const';


let user_type=null; // initializing as null to avoid undefined error



function Home() {

  // defining a conditional variable
  // const [isTrue, setIsTrue] = useState(false);
  

  const location = useLocation();
  // const user_type = location.state.id;
  const user_type = Cookies.get("usertype")

   // STORING THE USER TYPE IN THE COOKIES FOR WHOLE APP USE
  //  Cookies.set('usertype',user_type , { expires: 99 });

  // LOADING THE STORED COOKIES FORUSER TYPE
  // const user_type = Cookies.get('usertype');


  useEffect(() => {
    // setIsTrue(!isTrue);
  }, []);

  return (

    <>

      <h4>welcome {user_type} to medlocus</h4>
      {/* <RenderNav user_type={user_type} /> */}
      {/* <Nav showContent={isTrue} navData={user_type}/> */}
    </>
  )
}

export default Home
// export {user_type}
