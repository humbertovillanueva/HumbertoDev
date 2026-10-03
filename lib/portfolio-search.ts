import projects from '../app/projects.json';
const entries = [
  { title: 'About Humberto', href: '/about', category: 'Profile', description: 'Software engineer in Utah. Education, family, football and professional links.' },
  { title: 'Experience at kW Engineering', href: '/experience', category: 'Experience', description: 'Specta, AI integrations, document processing, data reliability and career history.' },
  { title: 'Designing portable AI integrations', href: '/writing/designing-portable-ai-integrations', category: 'Writing', description: 'Engineering notes on provider boundaries, validation and reliable integrations.' },
  ...projects.map(project => ({ title: project.title, category: 'Project', description: `${project.text} ${project.stack}`, href: project.repo === 'reality-commit' ? '/case-studies/reality-commit' : project.repo === 'dispatchtrack-demo' ? '/case-studies/dispatchtrack-lite' : '/projects' })),
];
export function searchPortfolio(query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return entries.map(entry => ({ entry, score: terms.reduce((score, term) => score + (entry.title.toLowerCase().includes(term) ? 3 : `${entry.description} ${entry.category}`.toLowerCase().includes(term) ? 1 : 0), 0) }))
    .filter(({entry}) => terms.every(term => `${entry.title} ${entry.description} ${entry.category}`.toLowerCase().includes(term)))
    .sort((a,b) => b.score-a.score).slice(0,8).map(({entry})=>entry);
}
