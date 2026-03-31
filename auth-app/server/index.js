const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', require('./routes/auth'));

// test routes
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Connect to MongoDB then start server

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("❌ MongoDB error", err));
