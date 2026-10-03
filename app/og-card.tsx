import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";
import { ImageResponse } from "next/og";

// Social preview card (LinkedIn, X, Slack, iMessage…) drawn in the 1986 edition's look, the one
// visitors see first: teal field, striped edges, the black scoreboard bar, the outlined italic
// name, the blue label plate and the yellow ticker.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "Geist-Regular.ttf")),
  readFile(join(fontDir, "Geist-BlackItalic.ttf")),
  readFile(join(fontDir, "GeistMono-Bold.ttf")),
]);

const c = { field: "#073a50", cyan: "#12b8db", deep: "#0792b8", yellow: "#f5e42b", cream: "#fff5c8", black: "#090b09", red: "#b82e20", lime: "#b9ef32", plate: "#102f86" };

// The site draws the name with a yellow outline and a hard black shadow. Satori has no text
// stroke, so the outline is eight yellow copies around the cyan fill.
function OutlinedLine({ text, size, fill = c.cyan }: { text: string; size: number; fill?: string }) {
  const o = Math.max(3, Math.round(size / 26));
  const layer = (dx: number, dy: number, color: string, key: string): ReactNode => (
    <div key={key} style={{ position: "absolute", left: dx, right: -dx, top: dy, display: "flex", justifyContent: "center", color }}>{text}</div>
  );
  const ring = [[-o, 0], [o, 0], [0, -o], [0, o], [-o, -o], [o, -o], [-o, o], [o, o]];
  return <div style={{ position: "relative", display: "flex", width: "100%", height: size * 0.98, fontFamily: "Geist Black", fontStyle: "italic", fontSize: size, lineHeight: 1, letterSpacing: -size * 0.045 }}>
    {layer(o * 2.6, o * 2.6, c.black, "shadow")}
    {ring.map(([dx, dy], index) => layer(dx, dy, c.yellow, `ring-${index}`))}
    {layer(0, 0, fill, "fill")}
  </div>;
}

type OgCardProps = {
  /** Text on the blue plate. */
  label: string;
  /** Lines drawn in the outlined italic style. */
  lines: string[];
  lineSize: number;
  description: string;
};

export async function ogCard({ label, lines, lineSize, description }: OgCardProps) {
  const [regular, black, mono] = await fonts;
  const ticker = ["HUMBERTOVILLANUEVA.DEV", "SOFTWARE ENGINEERING", "AI SYSTEMS", "BUILDING INTELLIGENCE", "FULL-STACK"];
  return new ImageResponse(
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", background: c.field, color: c.cream, fontFamily: "Geist" }}>
      {/* Scoreboard bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, padding: "0 28px", background: c.black, borderBottom: `5px solid ${c.cream}`, fontFamily: "Geist Mono", fontSize: 15, letterSpacing: 2 }}>
        <div style={{ display: "flex", padding: "6px 12px", border: `2px solid ${c.cream}`, borderRadius: 6 }}>1986</div>
        <div style={{ display: "flex", gap: 34 }}>
          {["PROJECTS", "CAREER", "SKILLS", "PROFILE", "WRITING"].map(item => <div key={item} style={{ display: "flex" }}>{item}</div>)}
        </div>
        <div style={{ display: "flex", padding: "8px 18px", color: c.black, background: c.lime, border: `3px solid ${c.cream}` }}>CONTACT</div>
      </div>

      {/* Field */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 70px" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14, display: "flex", backgroundImage: `repeating-linear-gradient(135deg, ${c.cyan} 0px, ${c.cyan} 8px, ${c.deep} 8px, ${c.deep} 16px)` }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 14, display: "flex", backgroundImage: `repeating-linear-gradient(135deg, ${c.cyan} 0px, ${c.cyan} 8px, ${c.deep} 8px, ${c.deep} 16px)` }} />
        <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 6 }}>
          {lines.map((line, index) => <OutlinedLine key={line} text={line} size={lineSize} fill={index % 2 ? c.deep : c.cyan} />)}
        </div>
        <div style={{ display: "flex", marginTop: 26, padding: "12px 22px", color: c.yellow, background: c.plate, border: `4px solid ${c.cream}`, boxShadow: `5px 5px 0 ${c.black}`, fontFamily: "Geist Mono", fontSize: 21, letterSpacing: 2 }}>{label}</div>
        <div style={{ display: "flex", maxWidth: 900, marginTop: 22, fontSize: 27, lineHeight: 1.4, textAlign: "center", justifyContent: "center" }}>{description}</div>
      </div>

      {/* Ticker */}
      <div style={{ display: "flex", alignItems: "center", gap: 26, height: 58, padding: "0 30px", overflow: "hidden", background: c.yellow, borderTop: `5px solid ${c.black}`, color: c.black, fontFamily: "Geist Mono", fontSize: 17, letterSpacing: 2, whiteSpace: "nowrap" }}>
        {ticker.map(item => <div key={item} style={{ display: "flex", alignItems: "center", gap: 26 }}><span>{item}</span><div style={{ display: "flex", width: 10, height: 10, background: c.red, transform: "rotate(45deg)" }} /></div>)}
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist Black", data: black, weight: 900, style: "italic" },
        { name: "Geist Mono", data: mono, weight: 700, style: "normal" },
      ],
    },
  );
}
