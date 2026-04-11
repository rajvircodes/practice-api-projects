const Note = require("../models/note.model");
const asyncHandler = require("../utils/async-handler");

// @desc get all notes
// @route GET/api/v1/notes
// @access public
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({
    message: "Note get successfully!",
    success: true,
    count: notes.length,
    data: notes,
  });
});


// @desc get note by id
// @route POST/api/v1/notes:id
// @access public
const getNoteById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // const {id} = req.params;
  const note = await Note.findById(id);
  if (!note) {
    return res.status(404).json({
      message: "Note note found",
    });
  }

  res.status(200).json({
    message: "Note found successfully",
    success: true,
    data: note,
  });
});



// @desc create a new note
// @route POST/api/v1/notes
// @access public
const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const newNote = await Note.create({
    title,
    content,
    category,
  });

  res.status(201).json({
    message: "Note created successfully!",
    data: newNote,
  });
});



// @desc update notes by id
// @route PUT/api/v1/notes:id
// @access public
const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updated = await Note.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    res.status(404).json({
      message: "Note not found",
    });

    throw new Error("Note not found");
  }

  res.status(200).json({
    message: "Note updated successfully",
    success: true,
    data: updated,
  });
});


// @desc delete note
// @route DELETE/api/v1/notes:id
// @access public
const deleteNote = asyncHandler(async (req, res)=>{
  const {id} = req.params;

  const deletedNote = await Note.findByIdAndDelete(id)
  if(!deletedNote){
    return res.status(404).json({
      message:"Note not found!",
      success:false
    })
  }
    res.status(200).json({
      message:"Note deleted successfully!",
      success:true,
      id:id
    
    })
})


module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
