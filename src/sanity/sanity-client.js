import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "e0j0x06r",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-03-08",
});
