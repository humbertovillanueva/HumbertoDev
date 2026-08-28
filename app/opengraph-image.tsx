import { ImageResponse } from "next/og";

export const alt = "Humberto Villanueva — Software Engineer portfolio in a retro 1993 football stadium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const countries = ["PER", "ARG", "BRA", "ESP", "FRA", "JPN", "MAR", "KOR"];
const countryColors = ["#e7472f", "#075d24", "#087fc1", "#f5e42b", "#6f4baf", "#ef8b24", "#e7472f", "#075d24"];
const crowdColors = ["#ef3f36", "#18afd0", "#f1d928", "#eae8ce", "#28a24b"];

function ArcadeLine({ children, size: fontSize }: { children: string; size: number }) {
  const lineStyle = {
    position: "absolute" as const,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    fontFamily: "Arial Black, Arial, sans-serif",
    fontSize,
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: -6,
  };

  return (
    <div style={{ position: "relative", width: "100%", height: fontSize, display: "flex" }}>
      <div style={{ ...lineStyle, top: 11, color: "#000000" }}>{children}</div>
      <div style={{ ...lineStyle, top: 6, color: "#f5e42b" }}>{children}</div>
      <div style={{ ...lineStyle, top: 0, color: "#12b8db" }}>{children}</div>
    </div>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        color: "#fff5c8",
        background: "#090b09",
        border: "12px solid #fff5c8",
        fontFamily: "Courier New, monospace",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 54,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          color: "#fff5c8",
          background: "#090b09",
          borderBottom: "5px solid #12c3d6",
          fontSize: 17,
          fontWeight: 900,
          letterSpacing: 2,
        }}
      >
        <div style={{ display: "flex" }}>HUMBERTO_07 // PORTFOLIO</div>
        <div style={{ display: "flex", color: "#f5e42b" }}>1993 MODE · PLAYER ONE</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 54,
          left: 0,
          right: 0,
          height: 286,
          display: "flex",
          overflow: "hidden",
          background: "#0a0d0c",
          borderBottom: "9px solid #000000",
          boxShadow: "inset 0 12px 0 #303a35, inset 0 -10px 0 #303a35",
        }}
      >
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={`light-${index}`}
            style={{
              position: "absolute",
              top: 24,
              left: 44 + index * 148,
              width: 42,
              height: 14,
              display: "flex",
              background: "#e9f1d9",
              boxShadow: "inset 0 -6px 0 #80948a",
            }}
          />
        ))}
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={`beam-a-${index}`}
            style={{
              position: "absolute",
              top: 42,
              left: 36 + index * 158,
              width: 8,
              height: 220,
              display: "flex",
              background: "#3f4a44",
              transform: "rotate(-28deg)",
              opacity: 0.8,
            }}
          />
        ))}
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={`beam-b-${index}`}
            style={{
              position: "absolute",
              top: 42,
              left: 126 + index * 158,
              width: 8,
              height: 220,
              display: "flex",
              background: "#27312c",
              transform: "rotate(28deg)",
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          zIndex: 4,
          top: 79,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ArcadeLine size={108}>HUMBERTO</ArcadeLine>
        <ArcadeLine size={98}>VILLANUEVA</ArcadeLine>
      </div>

      <div
        style={{
          position: "absolute",
          zIndex: 5,
          top: 340,
          left: 0,
          right: 0,
          height: 64,
          display: "flex",
          alignItems: "center",
          padding: "6px 0",
          background: "#6b2e16",
          borderTop: "6px solid #090b09",
          borderBottom: "6px solid #090b09",
        }}
      >
        {countries.concat(countries).map((country, index) => (
          <div
            key={`${country}-${index}`}
            style={{
              height: 46,
              minWidth: 74,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: countryColors[index % countryColors.length] === "#f5e42b" ? "#090b09" : "#fff5c8",
              background: countryColors[index % countryColors.length],
              border: "3px solid #fff5c8",
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            {country}
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 404,
          left: 0,
          right: 0,
          height: 118,
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          overflow: "hidden",
          padding: "5px 10px",
          background: "#282a24",
          borderBottom: "7px solid #fff5c8",
        }}
      >
        {Array.from({ length: 240 }, (_, index) => (
          <div
            key={`fan-${index}`}
            style={{
              width: 6,
              height: 6,
              display: "flex",
              margin: 4,
              background: crowdColors[index % crowdColors.length],
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          zIndex: 6,
          top: 420,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "9px 17px",
            color: "#f5e42b",
            background: "#073a85",
            border: "4px solid #fff5c8",
            boxShadow: "5px 5px 0 #000000",
            fontSize: 17,
            fontWeight: 900,
            letterSpacing: 2,
          }}
        >
          SOFTWARE ENGINEER · AI + FULL STACK
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 12,
            padding: "10px 17px",
            color: "#fff5c8",
            background: "#090b09",
            border: "3px solid #fff5c8",
            boxShadow: "5px 5px 0 #000000",
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          DEPENDABLE SOFTWARE FOR THE REAL WORLD.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 522,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          overflow: "hidden",
          background: "#087a28",
          borderTop: "7px solid #fff5c8",
        }}
      >
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={`stripe-${index}`}
            style={{
              width: 150,
              height: "100%",
              display: "flex",
              background: index % 2 === 0 ? "#079d2a" : "#087a28",
            }}
          />
        ))}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 5, display: "flex", background: "#fff5c8" }} />
        <div style={{ position: "absolute", top: 11, left: "50%", width: 108, height: 108, display: "flex", transform: "translateX(-50%)", border: "5px solid #fff5c8", borderRadius: "50%" }} />
      </div>

      <div
        style={{
          position: "absolute",
          zIndex: 8,
          right: 28,
          bottom: 24,
          display: "flex",
          padding: "10px 14px",
          color: "#090b09",
          background: "#f5e42b",
          border: "4px solid #090b09",
          boxShadow: "5px 5px 0 #000000",
          fontSize: 17,
          fontWeight: 900,
        }}
      >
        HUMBERTOVILLANUEVA.DEV
      </div>
    </div>,
    size,
  );
}
