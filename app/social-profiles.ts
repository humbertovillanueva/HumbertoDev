export const professionalProfiles = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/humberto-villanueva-dev/" },
  { name: "GitHub", url: "https://github.com/humbertovillanueva" },
  { name: "DEV", url: "https://dev.to/humbertovillanueva" },
];

export const personalProfiles = [
  { name: "Instagram", url: "https://www.instagram.com/humbertovillanuevaaa/" },
  { name: "Facebook", url: "https://www.facebook.com/humbertoluis.villanuevacornejo" },
];

export const socialProfileUrls = [...professionalProfiles, ...personalProfiles].map(profile => profile.url);
