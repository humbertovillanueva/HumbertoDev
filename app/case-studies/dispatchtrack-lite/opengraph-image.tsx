import { ogCard, ogContentType, ogSize } from "../../og-card";

export const alt = "DispatchTrack Lite case study by Humberto Villanueva";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogCard({
    lines: ["DISPATCHTRACK", "LITE"],
    lineSize: 112,
    label: "CASE STUDY · HUMBERTO VILLANUEVA",
    description: "A delivery workflow demo with driver assignments, exception recovery, and a separate Java API.",
  });
}
