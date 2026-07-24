import axios from "axios";
import type { Note, CreateNote } from "../types/note";

export const queryKey = "noteKey";

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const notehubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    accept: "application/json",
  },
});

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParameters {
  search?: string;
  tag?: string;
  page?: number;
}

const perPage = 12;

export async function fetchNotes({
  search,
  page,
  tag,
}: FetchNotesParameters): Promise<NotesHttpResponse> {
  const response = await notehubApi.get<NotesHttpResponse>("/notes", {
    params: {
      page,
      perPage,
      search: search || undefined,
      tag: tag || undefined,
    },
  });

  return response.data;
}

export async function createNote(note: CreateNote): Promise<Note> {
  const response = await notehubApi.post<Note>("/notes", note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await notehubApi.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function getSingleNote(id: string): Promise<Note> {
  const response = await notehubApi.get<Note>(`/notes/${id}`);
  return response.data;
}
