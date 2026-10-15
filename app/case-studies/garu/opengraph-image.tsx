import { ogCard, ogContentType, ogSize } from "../../og-card";

export const alt = "Garu case study by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["GARU"],
    lineSize: 190,
    label: "CASE STUDY · HUMBERTO VILLANUEVA",
    description: "An open-source runtime for always-on AI agents: a policy in front of every tool call, every run recorded and capped, approvals from your phone.",
  });
}
