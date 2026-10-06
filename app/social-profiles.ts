import type { BrandIconName } from "./brand-icon";

type Profile = { name: string; icon: BrandIconName; url: string };

export const professionalProfiles: Profile[] = [
  { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/humberto-villanueva-dev/" },
  { name: "GitHub", icon: "github", url: "https://github.com/humbertovillanueva" },
  { name: "DEV", icon: "dev", url: "https://dev.to/humbertovillanueva" },
];

export const personalProfiles: Profile[] = [
  { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/humbertovillanuevaaa/" },
  { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/humbertoluis.villanuevacornejo" },
];

export const socialProfileUrls = [...professionalProfiles, ...personalProfiles].map(profile => profile.url);
