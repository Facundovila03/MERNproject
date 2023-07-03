import express from "express";
import {
  createNote,
  deletNote,
  findAllNotes,
  getNote,
  updateNote,
} from "../Controllers/note";

const router = express.Router();

router.get("/", findAllNotes);
router.post("/", createNote);
router.get("/:id", getNote);
router.patch("/:id", updateNote);
router.delete("/:id", deletNote);
export default router;
