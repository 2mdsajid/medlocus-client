import React from 'react'
import {ParsedElement} from './Notes'
import { useLocation } from "react-router-dom";

function SingleNote() {

    const { state: { note } = {} } = useLocation();

  return (
    <>
    <p>single note page</p>
      <div className='note'>
        <h2>{note.title}</h2>
        <hr/>
        <div className='notecontent'><ParsedElement string={note.notecontent} root={note.rooturl} /></div>
      </div>
    </>
  )
}

export default SingleNote
