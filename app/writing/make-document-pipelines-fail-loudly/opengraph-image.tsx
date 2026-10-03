import { ogCard, ogContentType, ogSize } from "../../og-card";

export const alt = "Make Document Pipelines Fail Loudly | an engineering field note by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["MAKE PIPELINES", "FAIL LOUDLY"],
    lineSize: 104,
    label: "FIELD NOTE · HUMBERTO VILLANUEVA",
    description: "Honest failure states, visible reasons, retries that survive restarts, and tests that catch silent data loss.",
  });
}
