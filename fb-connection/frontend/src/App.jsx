import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
const App = () => {
  const [jokes, setJokes] = useState([]);



  useEffect(() => {
    axios.get('/api/jokes')
      .then((response) => {
        setJokes(response.data)
      }).catch((err) => {
        console.log(err);

      })
  })

  return (
    <div className="container">
      <h1>Jokes</h1>
      <p className="joke-count">Total Jokes: {jokes.length}</p>

      {jokes.map((joke) => (
        <div key={joke.id} className="joke-card">
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </div>
  )
}

export default App