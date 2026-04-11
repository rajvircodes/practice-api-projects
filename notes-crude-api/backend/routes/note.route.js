const express = require('express')
const {  getAllNotes,createNote, getNoteById, updateNote, deleteNote,  } = require("../controllers/note.controller");

const router = express.Router()
router.post('/', createNote)
router.get('/', getAllNotes)
router.get('/:id', getNoteById)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router;