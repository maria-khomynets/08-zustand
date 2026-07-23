// app/notes/[id]/page.tsx
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getSingleNote, queryKey } from "@/lib/api";
interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}
export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await getSingleNote(id);
  const title = `${note.title} | NoteHub`;
  const description = note.content.slice(0, 150);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-iota-gold.vercel.app/notes/filter/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}
export default async function Notes({ params }: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [queryKey, id],
    queryFn: () => getSingleNote(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
