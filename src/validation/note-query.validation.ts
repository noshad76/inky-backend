import { z } from "zod";
export const pullQuerySchema = z.object({
  since: z.iso.datetime().optional(),
});

export const getNotesQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  search: z.string().optional().default(""),
});
