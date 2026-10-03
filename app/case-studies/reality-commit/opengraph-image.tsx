import { ogCard, ogContentType, ogSize } from "../../og-card";

export const alt = "Reality Commit case study by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["REALITY", "COMMIT"],
    lineSize: 128,
    label: "CASE STUDY · HUMBERTO VILLANUEVA",
    description: "A browser prototype for comparing site visits, reviewing changes, and keeping an asset history.",
  });
}
