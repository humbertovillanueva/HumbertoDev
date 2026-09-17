import { ImageResponse } from "next/og";

export const alt = "Designing Portable AI Integrations — an engineering field note by Humberto Villanueva";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "58px 68px",
        color: "#fff5c8",
        background: "#071b42",
        border: "14px solid #090b09",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: 360, height: 630, display: "flex", background: "#10b8cf", transform: "skewX(-14deg) translateX(100px)" }} />
      <div style={{ position: "absolute", top: 0, right: 42, width: 86, height: 630, display: "flex", background: "#f4df22", transform: "skewX(-14deg)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 20, fontWeight: 900, letterSpacing: 4 }}>
        <div style={{ display: "flex", width: 18, height: 18, background: "#b8e33b", border: "4px solid #090b09" }} />
        ENGINEERING FIELD NOTE · 01
      </div>
      <div style={{ width: 900, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", color: "#b8e33b", fontSize: 24, fontWeight: 900, letterSpacing: 3, marginBottom: 18 }}>APPLIED AI · SOFTWARE ARCHITECTURE</div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 950, lineHeight: 0.96, letterSpacing: -3 }}>DESIGNING PORTABLE AI INTEGRATIONS</div>
        <div style={{ display: "flex", width: 760, marginTop: 22, fontSize: 25, lineHeight: 1.35 }}>Provider boundaries, capability differences, local models, and reliable product behavior.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", fontSize: 20, fontWeight: 900 }}>
        <div style={{ display: "flex" }}>HUMBERTO VILLANUEVA</div>
        <div style={{ display: "flex", marginRight: 120, color: "#090b09", background: "#f4df22", padding: "10px 16px", border: "4px solid #090b09" }}>HUMBERTOVILLANUEVA.DEV</div>
      </div>
    </div>,
    size,
  );
}
