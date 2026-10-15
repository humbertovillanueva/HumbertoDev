import { PreviewZoom } from "./preview-zoom";

const evidence: Record<string, { image: string; alt: string; captured: string; decision: string; limit: string }> = {
  garu: {
    image: "garu", alt: "Garu control room with one decision waiting: the agent Bea asks to draft an email reply, with approve, approve for 24 hours and decline buttons",
    captured: "October 2026",
    decision: "Put the policy in code between the model and every tool, never in the prompt. A tool no rule can allow is not shown to the model, and silence is a deny.",
    limit: "Runs on your own computer with any model; the phone app pairs to it over a private network. No hosted version, and the agents run only while that computer is on.",
  },
  "reality-commit": {
    image: "reality-commit", alt: "Reality Commit comparing before and after photographs in a sample pump-maintenance workspace",
    captured: "September 2026",
    decision: "Keep observations separate from conclusions. Reviewers verify proposed changes before saving a history entry.",
    limit: "Manual annotations, IndexedDB storage, and JSON export. No automated inspection or image diagnosis.",
  },
  "dispatchtrack-demo": {
    image: "dispatchtrack", alt: "DispatchTrack delivery dashboard showing fictional assignments, exceptions, and driver capacity",
    captured: "October 2026",
    decision: "Model delivery states explicitly. Require a driver before dispatch and a note when recording an outcome.",
    limit: "The public demo uses browser storage and fictional data. Shared accounts and a hosted Java API are not connected.",
  },
  "aws-cloud-quest": {
    image: "cloud-quest", alt: "AWS Cloud Quest start screen with 50 questions, randomized choices, and streak tracking",
    captured: "October 2026",
    decision: "Use immediate feedback and shuffled answers to turn passive study into active recall.",
    limit: "A dependency-free study game with 50 questions, not an official AWS exam or certification predictor.",
  },
};

export function ProjectPreview({ repo }: { repo: string }) {
  const item = evidence[repo];
  if (!item) return null;
  return <figure className="project-preview"><PreviewZoom src={`/projects/${item.image}.webp`} alt={item.alt} /><figcaption>Actual demo · sample data · {item.captured}</figcaption></figure>;
}

export function ProjectEvidence({ repo }: { repo: string }) {
  const item = evidence[repo];
  if (!item) return null;
  return <dl className="project-evidence"><div><dt>Engineering decision</dt><dd>{item.decision}</dd></div><div><dt>Scope &amp; limits</dt><dd>{item.limit}</dd></div></dl>;
}
