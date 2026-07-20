// Усю клієнтську логіку(отримання даних нотатки за допомгою useQuery та їх відображення)
// винесіть в окремий файл компонента app / notes / [id] / NoteDetails.client.tsx.
//  Для отримання динамічного id в клієнтському компоненті використовуйте хук useParams().
"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";
import { getSingleNote, queryKey } from "@/lib/api";
export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>

            <p className={css.date}>{formattedDate}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
