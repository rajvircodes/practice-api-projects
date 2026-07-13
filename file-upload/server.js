const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world from backend");
});

app.post("/profile", upload.single("input_file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Failed to upload file");
  }

  console.log(req.file);
  console.log("File upload success!");

  res.send("File uploaded successfully!");
});

const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
