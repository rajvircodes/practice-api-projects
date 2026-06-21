import mongoose from "mongoose";
import Note from "../models/notes.model.js";

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    if (notes.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Notes not found your collection is empty",
        note: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Notes found successfully!",
      notes: notes,
    });
  } catch (error) {
    console.log("Notes getting error", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

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
      message: "Note created",
      note: note,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID formate",
      });
    }
    const note = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true },
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Not found notes",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note updated",
      note: note,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID formate",
      });
    }
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found by this id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export { getAllNotes, createNotes, updateNotes, deleteNotes };
