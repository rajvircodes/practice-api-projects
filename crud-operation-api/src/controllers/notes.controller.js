const Note = require("../model/notes.model");

/**
 * - Create note
 * - POST - /api/v1/notes
 */
const createNotes = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All field required",
      });
    }
    const note = await Note.create({ title, description });

    res.status(201).json({
      success: true,
      message: "Note created!",
      note: {
        title: note.title,
        description: note.description,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

/**
 * - Get notes
 * - GET -/api/v1/notes
 */
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    if (!notes) {
      return res.status(404).json({
        success: false,
        message: "Notes not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notes found!",
      notes: notes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

/**
 * - Get single note
 * - GET -/api/v1/notes:id
 */

const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById({ _id: id });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Notes not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note found successfully!",
      note: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

/**
 * - Update notes
 * - POST -/api/v1/notes:id
 */
const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const newNote = await Note.findByIdAndUpdate(
      { _id: id },
      { title, description },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Note updated!",
      note: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

/**
 * - Delete notes
 * - DELETE :/api/v1/notes/delete:id
 */

const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const newNote = await Note.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "Note deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

module.exports = {
  createNotes,
  getAllNotes,
  getSingleNote,
  updateNotes,
  deleteNotes,
};
