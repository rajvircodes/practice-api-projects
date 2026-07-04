const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
