import axios from "axios";
import type { Note, CreateNote } from "../types/note";
export const queryKey = "noteKey";
axios.defaults.baseURL = "https://notehub-public.goit.study/api/";
interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}
interface FetchNotesParameters {
  search?: string;
  tag?: string;
  page?: number;
}

const perPage: number = 12;

const notesToken = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export async function fetchNotes({
  search,
  page,
  tag,
}: FetchNotesParameters): Promise<NotesHttpResponse> {
  const parameters = {
    params: {
      search: search,
      page: page,
      perPage: perPage,
      ...(tag && { tag }),
    },
    headers: {
      Authorization: notesToken,
      accept: "application/json",
    },
  };

  const response = await axios.get<NotesHttpResponse>("/notes", parameters);

  return response.data;
}

export async function createNote(note: CreateNote): Promise<Note> {
  const parameters = {
    headers: {
      Authorization: notesToken,
      accept: "application/json",
    },
  };

  const response = await axios.post<Note>("/notes", note, parameters);

  return response.data;
}
export async function deleteNote(id: string): Promise<Note> {
  const parameters = {
    headers: {
      Authorization: notesToken,
      accept: "application/json",
    },
  };

  const response = await axios.delete<Note>(`/notes/${id}`, parameters);

  return response.data;
}
export async function getSingleNote(id: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: notesToken,
      accept: "application/json",
    },
  });
  return response.data;
}
