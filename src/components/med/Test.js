import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import SubTestTitleDisplay from './re-comp/SubTestTitleDisplay'
import ROOT from '../Const';

function Test() {

  const history = useNavigate()

  // a little inline styling
  const style = {
    margin: '10px',
    padding: '5px'
  }

  const [tests, setTests] = useState([])


  // TO GET CATEGORY WISE OBJECTS OF TEST
  function filterByCategory(objects, category) {
    return objects.filter(object => object.category === category);
  }

  const getAllTest = async () => {
    try {
      const res = await fetch(ROOT+'/getnewtest', {
        method: 'GET',
        headers: {
          // because there is cookies
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      setTests(data)

      // console.log(data)
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  }

  

  const CollectUserData = (e, selectedtest) => {
    e.preventDefault()
    // passing the current Test object to next page
    history(`/test/${selectedtest.testname}`, { state: { typeoftest: selectedtest } })
  }


  useEffect(() => {
    getAllTest()
  }, [])


  return (
    <>
      <h1>test</h1>
      <br/>
      <h3>Model Tests</h3>
      {
        tests.filter(test => test.category === 'modeltest').map(test => {
          return <button id={test.testname} type='submits' style={style} onClick={(e) => CollectUserData(e, test)}>{test.testtitle}</button>
        })
      }
      <br />
      <h3>Daily Tests</h3>
      {
        tests.filter(test => test.category === 'dailytest').map(test => {
          return <button id={test.testname} type='submits' style={style} onClick={(e) => CollectUserData(e, test)}>{test.testtitle}</button>
        })
      }
      <h3>Weekly Tests</h3>
      {
        tests.filter(test => test.category === 'weeklytest').map(test => {
          return <button id={test.testname} type='submits' style={style} onClick={(e) => CollectUserData(e, test)}>{test.testtitle}</button>
        })
      }
      <h3>Archives</h3>
      {
        tests.filter(test => test.category == 'archive').map(test => {
          return <button id={test.testname} type='submits' style={style} onClick={(e) => CollectUserData(e, test)}>{test.testtitle}</button>
        })
      }
      <br />
    </>
  )
}

export default Test
