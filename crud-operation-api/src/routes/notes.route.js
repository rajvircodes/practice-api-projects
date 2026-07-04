const express = require("express");
const {
  createNotes,
  getAllNotes,
  getSingleNote,
  updateNotes,
  deleteNotes,
} = require("../controllers/notes.controller");
const router = express.Router();

router.post("/create", createNotes);
router.get("/", getAllNotes);
router.get("/:id", getSingleNote);
router.put("/update/:id", updateNotes);
router.delete("/delete/:id", deleteNotes);

module.exports = router;
