// app/notes/[id]/page.tsx
import NoteDetailsClient from "./NoteDetails.client";

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
