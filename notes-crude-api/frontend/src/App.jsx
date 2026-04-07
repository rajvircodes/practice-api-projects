import React from 'react'
import Navbar from './components/Navbar'
import Notes from './pages/Notes'
import '../src/App.css'
import { Routes, Route } from 'react-router-dom'
import CreateNotes from './pages/CreateNotes'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<CreateNotes/>}/>
        <Route path='/notes' element={<Notes/>}/>
      </Routes>
    </div>
  )
} 

export default App