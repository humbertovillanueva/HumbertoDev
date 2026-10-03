import { ogCard, ogContentType, ogSize } from "./og-card";

export const alt = "Humberto Villanueva, software engineer in Salt Lake City, Utah";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["HUMBERTO", "VILLANUEVA"],
    lineSize: 128,
    label: "SOFTWARE ENGINEER · AI + FULL STACK",
    description: "I build web applications, connect AI tools, and help people make sense of building data.",
  });
}
