import { z } from "zod";

export const noteSchema = z.object({
  id: z.uuid(),
  title: z.string().optional(),
  content: z.string().optional(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),
});

export const pushNotesSchema = z.object({
  notes: z.array(noteSchema),
});
