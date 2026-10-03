import { ogCard, ogContentType, ogSize } from "../../og-card";

export const alt = "Make Document Pipelines Fail Loudly | an engineering field note by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    eyebrow: "Field note · Data reliability",
    title: "Make Document Pipelines Fail Loudly",
    description: "Honest failure states, visible reasons, retries that survive restarts, and tests that catch silent data loss.",
  });
}
