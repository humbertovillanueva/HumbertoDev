import Link from "next/link";

const demos: Record<string, string> = {
  "reality-commit": "https://reality-commit.vercel.app/",
  "dispatchtrack-demo": "https://humbertovillanueva.github.io/dispatchtrack-demo/",
  "aws-cloud-quest.": "https://humbertovillanueva.github.io/aws-cloud-quest./",
};

export function ProjectLinks({ repo }: { repo: string }) {
  if (!repo) return null;
  return <div className="project-links">
    {demos[repo] && <a className="project-source" href={demos[repo]}>Try the demo ↗</a>}
    <a className="project-source" href={`https://github.com/humbertovillanueva/${repo}`}>View project ↗</a>
    {repo === "dispatchtrack-demo" && <Link className="project-source" href="/case-studies/dispatchtrack-lite">Read the case study →</Link>}
  </div>;
}
