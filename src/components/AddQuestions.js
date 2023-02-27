import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';
import ROOT from './Const';

function AddQuestions() {
    // const root = 'http://localhost:5000/public/'
    const root = ROOT

    const htmlString = `hey hi there bro<h1>hiiiiiii</h1><img src='${root}mat/mat1.png' />`

    const history = useNavigate()

    const [image, setImg] = useState({})
    const [imgname, setimgName] = useState('')

    const [question, setQuestion] = useState({
        qn: '', a: '', b: '', c: '', d: '', ans: '', category: ''
    })

    // const [noteimg,setnoteImg]= useState([])
    // const [title,setTitle] = useState('')
    // const [content,setContent] = useState([])

    let name, value
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        setQuestion({ ...question, [name]: value })
    }

    const fileChange = (event) => {
        setImg(event.currentTarget.files[0]) //files are always in ARRAY format
    }

    const handleNoteImage = (e)=>{
        const image = e.currentTarget.files
        setnoteImg([...image])
        console.log('each img',image)
    }

    // const sendNotePhotos = (event) =>{
    //     event.preventDefault()

    //     const form = event.target; // get the form element
    //     const formData = new FormData(form); // create a new FormData object from the form

    //     console.log(noteimg[0])
    // }


    const sendQuestions = async (e) => {
        // to prevent reloading of the page
        e.preventDefault()

        const { qn, a, b, c, d, ans, category } = question;
        if (category === 'm') {

            console.log('mat category')

            let formData = new FormData()
            formData.append('avatar', image)
            formData.append('qn',qn)
            formData.append('a',a)
            formData.append('b',b)
            formData.append('c',c)
            formData.append('d',d)
            formData.append('ans',ans)
            // formData.append('imgname', imgname)

            // console.log(formData)
            const res = await fetch(ROOT+'/saveimage', {
                method: "POST",
                body: formData
            })

            const data = await res.json()
            if (data.status === 422 || !data) {
                console.log('invalid')
            } else {
                console.log('success image sent to server')
                // setImg({})
            }

        } else {

            console.log('non mat category')
            const res = await fetch(ROOT+'/addquestion', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // since database stores only string form
                body: JSON.stringify({
                    qn, a, b, c, d, ans, category
                })
            })

            const data = await res.json()
            console.log('after send')
            console.log(data)

            if (data.status === 422 || !data) {
                console.log('invalid')
            } else {
                console.log('success')

                // history('/quiz')

            }

        }



    }


    const sendFile = async (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append('avatar', image)
        formData.append('imgname', imgname)

        console.log(formData)
        const res = await fetch(ROOT+'/saveimage', {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        if (data.status === 422 || !data) {
            console.log('invalid')
        } else {
            console.log('success')
            // setImg({})
        }

    }

    /* NOTE SECTION */

    
  const [noteimg, setnoteImg] = useState([])
  const [notetitle, setnoteTitle] = useState('')
  const [noteimgname, setnoteimgName] = useState('')
  const [notecontent, setnoteContent] = useState('')

  const handlenoteImage = (e) => {
    const image = e.currentTarget.files
    setnoteImg([...image])

  }

  const sendNotePhotos = async (event) => {
    event.preventDefault()

    let formData = new FormData()

    for (let i = 0; i < noteimg.length; i++) {
      formData.append(`note`, noteimg[i])
    }

    formData.append('notetitle', notetitle)
    formData.append('noteimgname', noteimgname)
    formData.append('notecontent', notecontent)

    const res = await fetch(ROOT+'/savenote', {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    console.log('res', data.content)
    if (data.status === 422 || !data) {
      console.log('invalid')
    } else {
      console.log('success image sent to server')
    }
  }



    return (
        <div className='addquestion'>
            <form action="" method="post">
                <h4>add question</h4>
                <input type="text" placeholder="qn" name='qn'
                    value={question.name}
                    onChange={handleInput}
                />
                <input type="text" placeholder="a" name='a'
                    value={question.name}
                    onChange={handleInput}
                />
                <input type="text" placeholder="b" name='b'
                    value={question.name}
                    onChange={handleInput}
                />
                <input type="text" placeholder="c" name='c'
                    value={question.name}
                    onChange={handleInput}
                />
                <input type="text" placeholder="d" name='d'
                    value={question.name}
                    onChange={handleInput}
                />
                <input type="text" placeholder="ans" name='ans'
                    value={question.name}
                    onChange={handleInput}
                />
                <div>
                    <input type="radio" id="huey" name="category" value="p" onChange={handleInput} />
                    <label for="huey">Physics</label>
                </div>

                <div>
                    <input type="radio" id="dewey" name="category" value="c" onChange={handleInput} />
                    <label for="dewey">Chemistry</label>
                </div>

                <div>
                    <input type="radio" id="louie" name="category" value="b" onChange={handleInput} />
                    <label for="louie">Biology</label>
                </div>

                <div>
                    <input type="radio" id="louie" name="category" value="m" onChange={handleInput} />
                    <label for="louie">Mat</label>
                </div>

                {/* <input type="text" placeholder="category" name='category'
                    value={question.name}
                    onChange={handleInput}
                /> */}

                <br />
                <h4>add images to server</h4>
                {/* <input type="text" name="imgname" id="" onChange={(e) => setimgName(e.currentTarget.value)} /> */}
                <input type="file" name="avatar" id="" onChange={fileChange} />
                {/* <button type="submit" onClick={sendFile}>send photo</button> */}

                <button onClick={sendQuestions} type="submit">submit</button>
            </form>
            <br /><br/>
            <h3>add notes</h3><br/>
           {/* { parse(htmlString) } */}

           


           {/* NOTE FORM */}
           <form action="">
        <input type="text" name="notetitle" placeholder='title of note' id=""
          onChange={(e) => setnoteTitle(e.currentTarget.value)}
        /><br />
        <input type="text" name="noteimgname" placeholder='name of img' id=""
          onChange={(e) => setnoteimgName(e.currentTarget.value)}
        /><br />
        <input type="file" multiple name='noteimg' placeholder='content'
          onChange={handlenoteImage}
        /><br />
        <textarea name="notecontent" id="" cols="30" rows="10"
          onChange={(e) => setnoteContent(e.currentTarget.value)}></textarea>
        <br /><button type='submit' onClick={sendNotePhotos}>send photos</button>
      </form>
        </div>
    )
}

export default AddQuestions