import { ogCard, ogContentType, ogSize } from "../../og-card";

export const alt = "AWS Cloud Quest case study by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["AWS CLOUD", "QUEST"],
    lineSize: 120,
    label: "CASE STUDY · HUMBERTO VILLANUEVA",
    description: "A browser study game for AWS Cloud Practitioner review: shuffled questions, instant feedback, and streaks.",
  });
}
