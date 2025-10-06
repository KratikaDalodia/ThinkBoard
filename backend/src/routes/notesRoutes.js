import express from 'express';
import auth from '../middleware/auth.js'
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from '../controllers/notesController.js';
const router = express.Router();
router.get("/",auth ,getNotes)
router.get("/:id", auth ,getNoteById)
router.post("/",auth, createNote)
router.put("/:id", auth, updateNote)
router.delete("/:id", auth, deleteNote)
export default router;