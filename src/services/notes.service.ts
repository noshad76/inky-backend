import { db } from "../db";
import { notes } from "../db/schema";
import { eq, ilike, or, and, desc, sql, gt, isNull } from "drizzle-orm";
import {
  PushNotesResponse,
  GetNotesResponse,
} from "../types/note-response.types";
import { Note } from "../types/note.types";
import { PushNoteDTO } from "../types/note.dto";

export async function pushNotes(
  userId: string,
  incomingNotes: PushNoteDTO[],
): Promise<PushNotesResponse> {
  if (incomingNotes.length === 0) {
    return { success: true };
  }

  await db
    .insert(notes)
    .values(
      incomingNotes.map((note) => ({
        id: note.id,
        userId,
        title: note.title,
        content: note.content,
        updatedAt: new Date(note.updatedAt),
        deletedAt: note.deletedAt ? new Date(note.deletedAt) : null,
      })),
    )
    .onConflictDoUpdate({
      target: notes.id,
      set: {
        title: sql`excluded.title`,
        content: sql`excluded.content`,
        updatedAt: sql`excluded.updated_at`,
        deletedAt: sql`excluded.deleted_at`,
      },
      where: sql`excluded.updated_at > notes.updated_at`,
    });

  return { success: true };
}

export async function pullNotes(userId: string, since: Date): Promise<Note[]> {
  const result = await db
    .select()
    .from(notes)
    .where(and(eq(notes.userId, userId), gt(notes.updatedAt, since)))
    .orderBy(notes.updatedAt);

  return result;
}

export async function getUserNotes(
  userId: string,
  page: number,
  limit: number,
  search: string,
): Promise<GetNotesResponse> {
  const offset = (page - 1) * limit;

  const searchCondition = search
    ? or(ilike(notes.title, `%${search}%`), ilike(notes.content, `%${search}%`))
    : undefined;

  const whereCondition = and(
    eq(notes.userId, userId),
    isNull(notes.deletedAt),
    searchCondition,
  );

  const data = await db
    .select()
    .from(notes)
    .where(whereCondition)
    .orderBy(desc(notes.updatedAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(notes)
    .where(whereCondition);

  return {
    data,
    pagination: {
      page,
      limit,
      total: Number(count),
      totalPages: Math.ceil(Number(count) / limit),
    },
  };
}
