const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const docxtopdf = require("docx-pdf");

const app = express();
const port = 3000;

const upload = multer({ dest: "uploads/" });

// Save html from file
app.use(express.static("public"));

app.post("/docxtopdf", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const inputFilePath = req.file.path;
  const outputFilePath = path.join(
    __dirname,
    "uploads",
    `${Date.now()}-converted.pdf`,
  );

  docxtopdf(inputFilePath, outputFilePath, (error, result) => {
    if (error) {
      console.log("Conversion error", error);
      if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
      return res.status(500).send("Error converting file");
    }

    res.download(outputFilePath, (downloadError) => {
      if (downloadError) {
        console.log("Download error", downloadError);
      }

      fs.unlink(inputFilePath, () => {});
      fs.unlink(outputFilePath, () => {});
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
