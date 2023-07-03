import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose, { Document } from "mongoose";

export const findAllNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }
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
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid note id");
    }
    const note = await NoteModel.findById(id).exec();

    if (!note) {
      console.log(note);
      throw createHttpError(404, "Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface updateNoteParams {
  id: string;
}

interface updateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  updateNoteParams,
  unknown,
  updateNoteBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;
  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Not a valid ID");

    if (!title) throw createHttpError(400, "Note must have a title");

    const note = await NoteModel.findById(id).exec();
    if (!note) throw createHttpError(404, "Note not found");

    note.title = title;
    note.text = text;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deletNote: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, " Not a valid ID");
    }
    NoteModel.findByIdAndDelete(id).exec();

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
