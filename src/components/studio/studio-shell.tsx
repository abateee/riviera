"use client";

import dynamic from "next/dynamic";

import config from "../../../sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((module) => module.NextStudio),
  {
    ssr: false,
  },
);

export function StudioShell() {
  return <NextStudio config={config} />;
}
