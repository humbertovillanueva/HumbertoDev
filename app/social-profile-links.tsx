import { BrandIcon } from "./brand-icon";
import { personalProfiles, professionalProfiles } from "./social-profiles";

export function SocialProfileLinks() {
  return (
    <div className="social-profile-groups">
      {[{ label: "Professional", profiles: professionalProfiles }, { label: "Personal", profiles: personalProfiles }].map(group => (
        <section key={group.label} aria-label={`${group.label} profiles`}>
          <h3 className="social-group-label">{group.label}</h3>
          <div className="continue-options">
            {group.profiles.map(profile => (
              <a key={profile.name} className="social-icon-link" href={profile.url} target="_blank" rel="me noopener noreferrer" aria-label={`${profile.name} (opens in a new tab)`} title={profile.name}>
                <BrandIcon name={profile.icon} />
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
