import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import {
  sanityDataset,
  sanityProjectId,
  sanityStudioBasePath,
} from "./src/lib/sanity/env";
import { structure } from "./src/sanity/lib/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Riviera Compagnie",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: sanityStudioBasePath,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
