import mongoose from "mongoose";
import Note from "../models/notes.model.js";
import { Request, Response } from "express";
import { RequestHandler } from "express";

const getAllNotes = async (req:Request, res:Response):Promise <Response | void> => {
  try {
    const notes = await Note.find();

    if (notes.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Notes not found your collection is empty",
        note: [],
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Notes found successfully!",
      notes: notes,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log("Notes getting error", errorMessage);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const createNotes = async (req:Request, res:Response):Promise<Response | void> => {
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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log(errorMessage);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateNotes = async (req:Request, res:Response):Promise < Response | void> => {
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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log(errorMessage);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteNotes = async (req:Request, res:Response):Promise <Response | void> => {
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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log(errorMessage);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};


export { getAllNotes, createNotes, updateNotes, deleteNotes };
