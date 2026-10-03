import { ogCard, ogContentType, ogSize } from "../og-card";

export const alt = "About Humberto Villanueva, software engineer in Salt Lake City, Utah";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["ABOUT", "HUMBERTO"],
    lineSize: 128,
    label: "SOFTWARE ENGINEER · SALT LAKE CITY, UTAH",
    description: "I like understanding how things work, finding the problem, and building a fix.",
  });
}
