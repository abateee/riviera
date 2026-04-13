import { createClient } from "next-sanity";

import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "@/lib/sanity/env";

export const sanityClient = createClient({
  apiVersion: sanityApiVersion,
  dataset: sanityDataset,
  projectId: sanityProjectId,
  useCdn: false,
  perspective: "published",
  stega: false,
});

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
) {
  return sanityClient.fetch<T>(query, params ?? {}, {
    next: { revalidate: 60 },
  });
}
