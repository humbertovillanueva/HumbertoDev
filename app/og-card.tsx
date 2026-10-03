import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Social preview card (LinkedIn, X, Slack, iMessage…) in the 2026 look: dark studio background,
// violet/teal/lime glow, the lime H mark, and a big Geist title with the lime period.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "Geist-Regular.ttf")),
  readFile(join(fontDir, "Geist-SemiBold.ttf")),
  readFile(join(fontDir, "GeistMono-Medium.ttf")),
]);

type OgCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Large two-line name layout for the homepage card. */
  hero?: boolean;
};

export async function ogCard({ eyebrow, title, description, hero = false }: OgCardProps) {
  const [regular, semibold, mono] = await fonts;
  const words = title.split(" ");
  return new ImageResponse(
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", color: "#f4f4f5", fontFamily: "Geist",
      backgroundColor: "#08080a",
      backgroundImage: "radial-gradient(circle at 82% 18%, rgba(139,123,255,0.45), rgba(8,8,10,0) 45%), radial-gradient(circle at 62% 78%, rgba(45,226,196,0.22), rgba(8,8,10,0) 40%), radial-gradient(circle at 95% 85%, rgba(217,255,87,0.22), rgba(8,8,10,0) 35%)" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", opacity: 0.25,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 22px 10px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(14,14,17,0.7)" }}>
          <svg width="40" height="40" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#d9ff57" />
            <path d="M15 14h12v14h10V14h12v36H37V37H27v13H15z" fill="#0a0a0b" />
            <path d="M28 28h10l-4 9H24z" fill="#e54848" />
          </svg>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600 }}>Humberto Villanueva</div>
        </div>
        <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 20, color: "#a1a1aa", letterSpacing: 1 }}>humbertovillanueva.dev</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Geist Mono", fontSize: 20, color: "#d9ff57", letterSpacing: 3, textTransform: "uppercase" }}>
          <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: "#d9ff57" }} />
          {eyebrow}
        </div>
        {hero
          ? <div style={{ display: "flex", flexDirection: "column", marginTop: 18, fontSize: 132, fontWeight: 600, lineHeight: 0.9, letterSpacing: -7 }}>
              <div style={{ display: "flex" }}>Humberto</div>
              <div style={{ display: "flex", paddingLeft: 66 }}>Villanueva<span style={{ color: "#d9ff57", marginLeft: -6 }}>.</span></div>
            </div>
          : <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 1000, marginTop: 20, fontSize: title.length > 48 ? 64 : 80, fontWeight: 600, lineHeight: 1.0, letterSpacing: -3 }}>
              {words.map((word, index) => <span key={index} style={{ marginRight: index < words.length - 1 ? 18 : 0 }}>{word}{index === words.length - 1 ? <span style={{ color: "#d9ff57", marginLeft: -3 }}>.</span> : null}</span>)}
            </div>}
        <div style={{ display: "flex", maxWidth: 900, marginTop: 26, fontSize: 27, lineHeight: 1.4, color: "#a1a1aa" }}>{description}</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
