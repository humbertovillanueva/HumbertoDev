import { ogCard, ogContentType, ogSize } from "../og-card";

export const alt = "Software projects by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["SELECTED", "PROJECTS"],
    lineSize: 128,
    label: "HUMBERTO VILLANUEVA · PORTFOLIO",
    description: "Web applications, mobile apps, APIs, and AI integrations, with my role in each.",
  });
}
