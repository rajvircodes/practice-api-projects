import React from 'react'
import './Note.css'
const Note = () => {
  return (
    <div>
        <div className="container">
            <div className="top">
                <h1>Notes app</h1>
            <h3>Add notes</h3>

            <form>
                <div className='title'>
                    <input type="text" placeholder='notes title...'/>
                </div>
               <div className="desc">
                 <textarea type="text" placeholder='Notes description' />
               </div>
                <button>Create note</button>
            </form>
            </div>
            <div className="card">
                <h3>MERN stack</h3>
                <p>Important topics of read</p>
                <div className="buttons">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Note