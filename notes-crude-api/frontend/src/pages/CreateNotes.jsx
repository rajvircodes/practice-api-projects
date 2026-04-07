import React, { useState } from 'react'
import data from '../data.js'
const CreateNotes = () => {

  const [title, setTitle]= useState("");
  const handleClick = (e) => {
    e.preventDefault()
    arr.push()
    console.log(arr);
    

  }



  return (
    <div className='container'>
      <h1 id='heading'>CreateNotes</h1>
      <form className='form'>
        <input id='top' type="text" placeholder='Title' autoFocus value={title} onChange={(e)=> setTitle(e.target.value)}/>
        <input id='bottom' type="text" placeholder='write your notes here..' />
        <button id='add-note' onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default CreateNotes