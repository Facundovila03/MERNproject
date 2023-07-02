import { RequestHandler } from "express";
import NoteModel from "../models/note";

export const findAllNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    const newNote = await NoteModel.create({
      title,
      text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await NoteModel.findById(id).exec();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};