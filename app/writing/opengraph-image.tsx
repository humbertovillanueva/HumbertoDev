import { ogCard, ogContentType, ogSize } from "../og-card";

export const alt = "Field notes by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["FIELD", "NOTES"],
    lineSize: 128,
    label: "WRITING · HUMBERTO VILLANUEVA",
    description: "Notes on software I'm building, decisions I've worked through, and things I've learned.",
  });
}
