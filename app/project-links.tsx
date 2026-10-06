import Link from "next/link";

export const demos: Record<string, string> = {
  "reality-commit": "https://reality-commit.vercel.app/",
  "dispatchtrack-demo": "https://humbertovillanueva.github.io/dispatchtrack-demo/",
  "aws-cloud-quest": "https://humbertovillanueva.github.io/aws-cloud-quest/",
};

export function ProjectLinks({ repo }: { repo: string }) {
  if (!repo) return null;
  const name = ({ "reality-commit": "Reality Commit", "dispatchtrack-demo": "DispatchTrack Lite", "aws-cloud-quest": "AWS Cloud Quest" } as Record<string, string>)[repo] ?? repo;
  return <div className="project-links">
    {demos[repo] && <a className="project-source" aria-label={`Try the demo: ${name}`} href={demos[repo]}>Try the demo ↗</a>}
    <a className="project-source" aria-label={`View source code: ${name}`} href={`https://github.com/humbertovillanueva/${repo}`}>View source code ↗</a>
    {repo === "reality-commit" && <Link className="project-source" aria-label={`Read the case study: ${name}`} href="/case-studies/reality-commit">Read the case study →</Link>}
    {repo === "dispatchtrack-demo" && <Link className="project-source" aria-label={`Read the case study: ${name}`} href="/case-studies/dispatchtrack-lite">Read the case study →</Link>}
    {repo === "aws-cloud-quest" && <Link className="project-source" aria-label={`Read the case study: ${name}`} href="/case-studies/aws-cloud-quest">Read the case study →</Link>}
  </div>;
}
