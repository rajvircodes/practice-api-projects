import React from 'react'
// import myNotes from '../data.js'
const notes = [
    {
       id:1,
       title:"Note 1",
       content:"This is note one"
    },
    {
       id:1,
       title:"Note 2" ,
       content:"This is second note"

    },
    {
       id:1,
       title:"Note 3",
       content:"Third note"
    },
    {
       id:1,
       title:"Note 4",
       content:"Final note"
    }
]


const Notes = () => {
  return (
        notes.map((note)=> <div key={note.id} style={styles.container}>
               <h2 style={styles.title}>{note.title} </h2>
            <p style={styles.content}>{note.content}</p>
        </div>)
    
   )
   
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    textAlign: 'center',

  },
  title: {
    color: '#2c3e50',
    fontSize: '2rem',
    marginBottom: '10px'
  },
  content:{
   fontSize:"2rem"
  }
};


export default Notes