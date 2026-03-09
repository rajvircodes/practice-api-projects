// User Schema
// Responsible for authentication users

const mongoose = require("mongoose");

userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },

  {
    timestamps: true,
  },
);


const User = mongoose.model("User", userSchema);

module.exports = User;
