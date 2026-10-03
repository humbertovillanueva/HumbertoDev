// One scale for every skill so visitors can compare them at a glance.
export const DAILY = "DAILY AT WORK", SHIPPED = "SHIPPED IN PROJECTS", COMFORTABLE = "COMFORTABLE";

export const skills = [
  { name: "Fantom", context: DAILY }, { name: "Svelte 5", context: DAILY },
  { name: "TypeScript", context: DAILY }, { name: "LLM systems", context: DAILY },
  { name: "Semantic search", context: DAILY }, { name: "JavaScript", context: SHIPPED },
  { name: "Java", context: SHIPPED }, { name: "AWS", context: SHIPPED },
  { name: "REST APIs", context: SHIPPED }, { name: "Python", context: COMFORTABLE },
  { name: "SQL", context: COMFORTABLE }, { name: "Docker", context: COMFORTABLE },
];

export const skillGroups = [DAILY, SHIPPED, COMFORTABLE].map(level => ({
  level,
  items: skills.filter(skill => skill.context === level).map(skill => skill.name),
}));
