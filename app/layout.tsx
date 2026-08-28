import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Humberto Villanueva — Software Engineer",
  description:
    "Software engineer from Peru, based in Utah, building AI-native products, reliable data systems, and building intelligence—including Specta.",
  metadataBase: new URL("https://humbertovillanueva.dev"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Humberto Villanueva — Software Engineer",
    description:
      "AI systems, reliable data, and products built for the messy real world.",
    url: "/",
    siteName: "Humberto Villanueva — Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Humberto Villanueva — Software Engineer",
    description:
      "AI systems, reliable data, and products built for the messy real world.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
