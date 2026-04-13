import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StudioShell } from "@/components/studio/studio-shell";
import { isSanityEnabled } from "@/lib/sanity/env";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Studio",
    description: "Studio de contenu Riviera Compagnie.",
    path: "/studio",
    noindex: true,
  });
}

export default function StudioPage() {
  if (!isSanityEnabled) {
    notFound();
  }

  return <StudioShell />;
}
