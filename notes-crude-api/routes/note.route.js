const express = require('express')
const {  getAllNotes,createNote, getNoteById,  } = require("../controllers/note.controller");

const router = express.Router()
router.post('/notes', createNote)
router.get('/notes', getAllNotes)
router.get('/notes/:id', getNoteById)

module.exports = router;