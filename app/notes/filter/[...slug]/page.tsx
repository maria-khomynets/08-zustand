import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes, queryKey } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};
export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === "all" ? "All" : slug[0];
  const title = `Notes - ${category} | NoteHub`;
  const description = `Viewing notes in "${category}".`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-iota-gold.vercel.app/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Filtered notes",
        },
      ],
    },
  };
}
export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [queryKey, "", tag, 1],
    queryFn: () =>
      fetchNotes({
        search: "",
        tag,
        page: 1,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
