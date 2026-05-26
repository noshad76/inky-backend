import { Note } from "./note.types";

export interface PushNotesResponse {
  success: true;
}

export interface PullNotesResponse {
  notes: Note[];
}

export interface NotesPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetNotesResponse {
  data: Note[];
  pagination: NotesPagination;
}
