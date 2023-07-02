import express from "express";
import { createNote, findAllNotes, getNote } from "../Controllers/note";

const router = express.Router();

router.get("/", findAllNotes);
router.post("/", createNote);
router.get("/:id", getNote);

export default router;
