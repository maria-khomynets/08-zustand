import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes, queryKey } from "@/lib/api";
import NotesClient from "./Notes.client";
type NotesProps = {
  params: Promise<{ slug: string[] }>;
};
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
