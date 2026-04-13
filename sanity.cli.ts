import { defineCliConfig } from "sanity/cli";

import { sanityDataset, sanityProjectId } from "./src/lib/sanity/env";

export default defineCliConfig({
  api: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
  },
});
