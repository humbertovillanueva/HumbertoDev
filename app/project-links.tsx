import Link from "next/link";

export const demos: Record<string, string> = {
  garu: "https://garuagents.com/",
  "reality-commit": "https://reality-commit.vercel.app/",
  "dispatchtrack-demo": "https://humbertovillanueva.github.io/dispatchtrack-demo/",
  "aws-cloud-quest": "https://humbertovillanueva.github.io/aws-cloud-quest/",
};

// Garu's public address is its website; the other addresses open the app itself.
const demoLabels: Record<string, string> = { garu: "Visit the website" };

const names: Record<string, string> = { garu: "Garu", "reality-commit": "Reality Commit", "dispatchtrack-demo": "DispatchTrack Lite", "aws-cloud-quest": "AWS Cloud Quest" };

// Case-study page for each repository. The search index, the 2000 taskbar and the Projects page count read this too.
export const caseStudies: Record<string, string> = {
  garu: "/case-studies/garu",
  "reality-commit": "/case-studies/reality-commit",
  "dispatchtrack-demo": "/case-studies/dispatchtrack-lite",
  "aws-cloud-quest": "/case-studies/aws-cloud-quest",
};

export function ProjectLinks({ repo }: { repo: string }) {
  if (!repo) return null;
  const name = names[repo] ?? repo;
  const demoLabel = demoLabels[repo] ?? "Try the demo";
  return <div className="project-links">
    {demos[repo] && <a className="project-source" aria-label={`${demoLabel}: ${name}`} href={demos[repo]}>{demoLabel} ↗</a>}
    <a className="project-source" aria-label={`View source code: ${name}`} href={`https://github.com/humbertovillanueva/${repo}`}>View source code ↗</a>
    {caseStudies[repo] && <Link className="project-source" aria-label={`Read the case study: ${name}`} href={caseStudies[repo]}>Read the case study →</Link>}
  </div>;
}
