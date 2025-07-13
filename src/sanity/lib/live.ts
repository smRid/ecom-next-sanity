import "server-only";

import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

// Get the read token for live preview
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN - required for draft mode");
}

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Ensure we're using the authenticated client for live preview
    token,
    useCdn: false, // Always disable CDN for live preview
    perspective: 'published', // Use 'previewDrafts' for draft content
  }),
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0, // Disable caching for live data
  },
});