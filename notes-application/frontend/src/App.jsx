import React, { useState, useEffect } from "react";
import axios from "axios";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Backend API se data lane ke liye function
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notes");
        
        // Agar backend se data { success: true, notes: [...] } format mein aa raha hai
        setNotes(response.data.notes); 
      } catch (err) {
        // Agar koi error aati hai (jaise backend band hai ya route galat hai)
        setError(err.response?.data?.message || "Data fetch karne mein error aayi");
      } finally {
        setLoading(false); // Loading khatam
      }
    };

    fetchNotes();
  }, []); // [] ka matlab hai yeh page load hote hi sirf ek baar chalega

  // 1. Agar data load ho raha hai
  if (loading) return <p>Loading notes, please wait...</p>;

  // 2. Agar koi error aayi
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // 3. Agar sab sahi hai aur data mil gaya
  return (
    <div style={{ padding: "20px" }}>
      <h2>My Notes Collection</h2>
      
      {notes.length === 0 ? (
        <p>Koi notes nahi mile. Aapka collection khali hai!</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note._id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc" }}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotesList;