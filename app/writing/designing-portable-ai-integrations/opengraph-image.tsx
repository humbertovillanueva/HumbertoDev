import { ogCard, ogContentType, ogSize } from "../../og-card";

export const alt = "Designing Portable AI Integrations | an engineering field note by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    eyebrow: "Field note · Applied AI",
    title: "Designing Portable AI Integrations",
    description: "Separating product behavior from model providers, handling capability differences, and keeping reliability visible.",
  });
}
