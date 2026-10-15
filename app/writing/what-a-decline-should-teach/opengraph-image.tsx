import { ogCard, ogContentType, ogSize } from "../../og-card";

export const alt = "What a Decline Should Teach an Agent | an engineering field note by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["WHAT A DECLINE", "SHOULD TEACH"],
    lineSize: 98,
    label: "FIELD NOTE · HUMBERTO VILLANUEVA",
    description: "A decline with a note, approvals that write the policy, and an approval flow that assumes the owner is asleep.",
  });
}
