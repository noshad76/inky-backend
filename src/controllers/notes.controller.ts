import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { pushNotesSchema } from "../validation/note.schema";
import { getUserNotes, pullNotes, pushNotes } from "../services/notes.service";
import { asyncHandler } from "../utils/asyncHandler";
import {
  pullQuerySchema,
  getNotesQuerySchema,
} from "../validation/note-query.validation";
export const push = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = pushNotesSchema.parse(req.body);

  const result = await pushNotes(req.userId!, data.notes);

  res.json(result);
});

export const pull = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { since } = pullQuerySchema.parse(req.query);
  const sinceDate = since
    ? new Date(since)
    : new Date("1970-01-01T00:00:00.000Z");
  const notes = await pullNotes(req.userId!, sinceDate);

  res.json({ notes });
});

export const getNotes = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { page, limit, search } = getNotesQuerySchema.parse(req.query);

    const result = await getUserNotes(req.userId!, page, limit, search);

    res.json(result);
  },
);
