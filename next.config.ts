import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  images: {
    // The images are already small, pre-sized WebP/JPEG files. Serving them as-is avoids slow or
    // failed on-demand resizes (a cold resize sometimes returned 502 and left a broken thumbnail),
    // keeps clear of the hosting plan's image-transformation limit, and lets search engines index
    // the real file URL (/humberto-villanueva.jpg) instead of /_next/image?url=… variants.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
};

export default withBotId(nextConfig);
