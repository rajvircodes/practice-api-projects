import axios from 'axios';
import React, { useState } from 'react';

const CreateNotes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Content ke liye alag state

  const handleClick = async (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye

    // Basic validation
    if (!title || !content) {
      alert("Bhai, Title aur Content dono bharo!");
      return;
    }

    try {
      // POST request with body data
      const response = await axios.post('/api/v1/notes', {
        title: title,
        content: content,
        category: "work" // Default category ya state se le sakte ho
      });

      console.log("Note ban gaya!", response.data);
      
      // Form khali karne ke liye
      setTitle("");
      setContent("");
      alert("Note added successfully!");
      
    } catch (err) {
      console.log("Locha to create notes", err);
    }
  };

  return (
    <div className='container' style={styles.formContainer}>
      <h1 id='heading'>Create Notes</h1>
      <form className='form' onSubmit={handleClick}>
        <input 
          id='top' 
          type="text" 
          placeholder='Title' 
          autoFocus 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input 
          id='bottom' 
          type="text" 
          placeholder='Write your notes here..' 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.input}
        />
        <button id='add-note' type="submit" style={styles.button}>
          Add Note
        </button>
      </form>
    </div>
  );
};

// Simple styles for testing
const styles = {
  formContainer: { margin: '20px', textAlign: 'center' },
  input: { display: 'block', margin: '10px auto', padding: '10px', width: '300px' },
  button: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#2ecc71', color: '#fff', border: 'none' }
};

export default CreateNotes;