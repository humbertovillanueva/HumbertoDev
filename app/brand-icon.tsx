import { faDev } from "@fortawesome/free-brands-svg-icons/faDev";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";

// Brand marks for the profile links, from Font Awesome Free (icons CC BY 4.0, https://fontawesome.com/license/free).
// Each brand's own mark, used only to label a link to that profile.
const icons = { linkedin: faLinkedin, github: faGithub, dev: faDev, instagram: faInstagram, facebook: faFacebook } satisfies Record<string, IconDefinition>;

export type BrandIconName = keyof typeof icons;

export function BrandIcon({ name, className = "brand-icon" }: { name: BrandIconName; className?: string }) {
  const [width, height, , , path] = icons[name].icon;
  return <svg className={className} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false"><path fill="currentColor" d={Array.isArray(path) ? path.join(" ") : path} /></svg>;
}
