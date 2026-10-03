import { ogCard, ogContentType, ogSize } from "../og-card";

export const alt = "Experience and education of Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["CAREER +", "EDUCATION"],
    lineSize: 120,
    label: "HUMBERTO VILLANUEVA · EXPERIENCE",
    description: "From IT support to software engineering at kW Engineering.",
  });
}
