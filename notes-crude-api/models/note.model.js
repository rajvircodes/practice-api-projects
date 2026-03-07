const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required for creating Note!"],
      maxLength: 100,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["personal", "work", "study", "other"],
      default: "other",
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true },
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
