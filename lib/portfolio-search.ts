import projects from '../app/projects.json';
import { caseStudies } from '../app/project-links';
const entries = [
  { title: 'About Humberto', href: '/about', category: 'Profile', description: 'Software engineer in Utah. Education, family, football and professional links.' },
  { title: 'Specta at kW Engineering', href: '/projects', category: 'Work', description: 'An AI assistant that runs on more than one model vendor, a document pipeline that fails loudly, and commissioning issues on a native workflow engine. Fantom, Svelte 5, LLM systems.' },
  { title: 'Experience at kW Engineering', href: '/experience', category: 'Experience', description: 'Specta, AI integrations, document processing, data reliability and career history.' },
  { title: 'A policy kernel, not a prompt', href: '/writing/a-policy-kernel-not-a-prompt', category: 'Writing', description: 'Engineering notes on AI agents: rules in code between the model and its tools, allow, ask or block by argument, hidden tools, a sandbox, and what none of it stops.' },
  { title: 'What a decline should teach an agent', href: '/writing/what-a-decline-should-teach', category: 'Writing', description: 'Engineering notes on approvals for unattended AI agents: declines that carry a note, approvals that write the policy, silence as a no.' },
  { title: 'A Spanish-first phone app from one codebase', href: '/writing/a-spanish-first-phone-app-from-one-codebase', category: 'Writing', description: 'Engineering notes on localization: one rule for every sentence, a test that fails on a missing translation, agents that write in Spanish, Svelte and Capacitor on three screens.' },
  { title: 'Make document pipelines fail loudly', href: '/writing/make-document-pipelines-fail-loudly', category: 'Writing', description: 'Engineering notes on data reliability: failure states, visible reasons, retries that survive restarts, and silent data loss.' },
  { title: 'Designing portable AI integrations', href: '/writing/designing-portable-ai-integrations', category: 'Writing', description: 'Engineering notes on provider boundaries, validation and reliable integrations.' },
  ...projects.map(project => ({ title: project.title, category: 'Project', description: `${project.text} ${project.stack}`, href: caseStudies[project.repo] ?? '/projects' })),
];
export function searchPortfolio(query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return entries.map(entry => ({ entry, score: terms.reduce((score, term) => score + (entry.title.toLowerCase().includes(term) ? 3 : `${entry.description} ${entry.category}`.toLowerCase().includes(term) ? 1 : 0), 0) }))
    .filter(({entry}) => terms.every(term => `${entry.title} ${entry.description} ${entry.category}`.toLowerCase().includes(term)))
    .sort((a,b) => b.score-a.score).slice(0,8).map(({entry})=>entry);
}
