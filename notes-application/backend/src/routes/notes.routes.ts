import { createNotes, deleteNotes, getAllNotes, updateNotes } from "../controllers/notes.controller.js";
import express from "express";

const router = express.Router();

router.get("/", getAllNotes);
router.post('/create', createNotes);
router.put('/update/:id', updateNotes);
router.delete('/delete/:id', deleteNotes)

export default router;
