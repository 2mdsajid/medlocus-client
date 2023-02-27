import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const TYPEOFTEST = [
  {
    id: 'model',
    p: 1,
    c: 2,
    b: 1,
    m: 2,
    t: 10
  },
  {
    id: 'model2',
    p: 3,
    c: 2,
    b: 4,
    m: 2,
    t: 10
  }
  ,
  {
    id: 'model4',
    p: 3,
    c: 2,
    b: 4,
    m: 2,
    t: 100
  }
  ,
  {
    id: 'model2',
    p: 3,
    c: 2,
    b: 4,
    m: 2,
    t: 100
  }
]

const websiteMode = [
  {
    id: 'aspirant',
    navs: [
      {
        text: 'Home',
        href: '/'
      },
      {
        text: 'Notes',
        href: '/notes'
      },
      {
        text: 'Test',
        href: '/test'
      },
      {
        text: 'Confusing Terms',
        href: '/confusingterms'
      }, {
        text: 'login',
        href: '/test/login'
      }
      , {
        text: 'logout',
        href: '/logout'
      }
      , {
        text: 'profile',
        href: '/userprofile'
      }
    ]
  },
  {
    id: 'student',
    navs: [
      {
        text: 'Home',
        href: '/'
      },
      {
        text: 'Notes',
        href: '/notes'
      },
      {
        text: 'Test',
        href: '/test'
      }
    ]
  }
]

// const userType = { type: null }




// let user_type = ''

const log = (log) => {
  return console.log(log)
}
const RenderNav = (props) => {
  // const [userType, setUserType] = useState('');
  console.log(props.user_type)
  return websiteMode.map((webmode) => {
    if (webmode.id == props.user_type) {
      return webmode.navs.map((web) => {
        return <><Link to={web.href}>{web.text}</Link><br /></>;
      });
    }
  });
};


export default TYPEOFTEST
export { log, RenderNav }
