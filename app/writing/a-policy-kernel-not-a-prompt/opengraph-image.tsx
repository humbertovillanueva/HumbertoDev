import { ogCard, ogContentType, ogSize } from "../../og-card";

export const alt = "A Policy Kernel, Not a Prompt | an engineering field note by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["A POLICY KERNEL,", "NOT A PROMPT"],
    lineSize: 92,
    label: "FIELD NOTE · HUMBERTO VILLANUEVA",
    description: "Allow, ask or block by tool and by argument, hidden tools, a sandbox, and the one thing none of it stops.",
  });
}
