const express = require("express");
const app = express();
const notesRoutes = require("./routes/notes.route");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from backend");
});

app.use("/api/v1/notes", notesRoutes);

module.exports = app;
