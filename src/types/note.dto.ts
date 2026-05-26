export interface PushNoteDTO {
  id: string;
  title?: string;
  content?: string;
  updatedAt: string;
  deletedAt?: string | null;
}
