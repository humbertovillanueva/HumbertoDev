import { ogCard, ogContentType, ogSize } from "./og-card";

export const alt = "Humberto Villanueva, software engineer in Salt Lake City, Utah";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    hero: true,
    eyebrow: "Software engineer · Salt Lake City, Utah",
    title: "Humberto Villanueva",
    description: "I build web applications, connect AI to real work, and help people make sense of building data.",
  });
}
