"use client";

import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";

import { createNote, queryKey } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import type { CreateNote } from "@/types/note";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const createMutation = useMutation({
    mutationFn: createNote,

    onSuccess: async () => {
      clearDraft();

      await queryClient.invalidateQueries({
        queryKey: [queryKey],
      });

      router.push("/notes/filter/all");
    },

    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const note: CreateNote = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as CreateNote["tag"],
    };

    createMutation.mutate(note);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          defaultValue={draft.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDraft({ title: e.target.value })
          }
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDraft({ content: e.target.value })
          }
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setDraft({
              tag: e.target.value as CreateNote["tag"],
            })
          }
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
