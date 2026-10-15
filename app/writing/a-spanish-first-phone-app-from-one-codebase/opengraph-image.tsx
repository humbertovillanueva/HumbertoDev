import { ogCard, ogContentType, ogSize } from "../../og-card";

export const alt = "A Spanish-First Phone App From One Codebase | an engineering field note by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["SPANISH FIRST,", "ONE CODEBASE"],
    lineSize: 98,
    label: "FIELD NOTE · HUMBERTO VILLANUEVA",
    description: "One rule for every sentence, a test that fails on a missing translation, and agents that answer in the language of the email.",
  });
}
