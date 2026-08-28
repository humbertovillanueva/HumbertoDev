import { ImageResponse } from "next/og";

export const alt = "Humberto Villanueva — Software Engineer from Peru, building AI systems and reliable products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "54px 64px",
        color: "#11130f",
        background: "#8ec9e7",
        fontFamily: "Arial, sans-serif",
        border: "16px solid #11130f",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", padding: "12px 18px", background: "#d9ff57", border: "4px solid #11130f", fontSize: 24, fontWeight: 900, letterSpacing: 3 }}>
          PLAYER ONE · SOFTWARE ENGINEER
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 18px", background: "#f1eedf", border: "4px solid #11130f", fontSize: 23, fontWeight: 900 }}>
          <span>PER</span><span style={{ padding: "7px 10px", color: "#d9ff57", background: "#11130f" }}>4</span><span>:</span><span style={{ padding: "7px 10px", color: "#d9ff57", background: "#11130f" }}>1</span><span>FRA</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.78, letterSpacing: -7, fontWeight: 900 }}>
        <div style={{ display: "flex", fontSize: 118, color: "#f1eedf" }}>HUMBERTO</div>
        <div style={{ display: "flex", fontSize: 122, color: "#d9ff57", textShadow: "5px 5px 0 #11130f" }}>VILLANUEVA</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 28, borderTop: "8px solid #f1eedf" }}>
        <div style={{ display: "flex", maxWidth: 760, fontSize: 31, lineHeight: 1.25, fontWeight: 700 }}>
          AI systems, reliable data, and products built for the messy real world.
        </div>
        <div style={{ display: "flex", padding: "12px 16px", color: "#f1eedf", background: "#24713f", border: "4px solid #11130f", fontSize: 22, fontWeight: 900 }}>
          PERU → UTAH
        </div>
      </div>
    </div>,
    size,
  );
}
