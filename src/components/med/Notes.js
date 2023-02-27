import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

import ROOT from '../Const';

const ParsedElement = (props) => {
  const root = props.root
  let str = props.string
  // g = all occurance
  const newstr = str.replace(/_root_/g, root)
  const parsedHtml = parse(newstr) 
  return parsedHtml

};

// function ParsedElement(html, imageUrlPrefix) {
//   const parsedHtml = parse(html.replace(/{note\.rooturl\+([^"]+)}/g, (match, imageName) => imageUrlPrefix + imageName));
//   return parsedHtml;
// }


function Notes() {
  const history = useNavigate()

  const [notes, setNotes] = useState([]); //to store notes


  const loadNotes = async () => {

    try {
      const res = await fetch(ROOT+'/getnotes', {
        method: 'GET',
        headers: {
          // because there is cookies
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      setNotes(data)
      // console.log(notes)


    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

const directSingleNote = (note) =>{
  history(`/note/${note.imgname}`,{ state: { note } })
}



  // to load notes on loading the pages
  useEffect(() => {
    // fetch data from an API
    loadNotes()
  }, []);


  return (
    <>
      <h1>notes</h1><br />
      <div className="note">
        {notes.map((note, index) => {
          {/* console.log(note.notecontent) */ }
          return (<>
            <button onClick={() => directSingleNote(note)}>{index} : {note.title}</button>
            {/* <div className='notecontent'><ParsedElement string={note.notecontent} root={note.rooturl} /></div> */}
          </>)
        })}
      </div>
    </>
  )

}

export default Notes
export {ParsedElement}
