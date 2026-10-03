// Public summary of my Specta work. Keep this at the approved public level:
// no customer names, internal code names, private metrics, or unreleased features.
export const spectaHighlights = [
  {
    title: "Model-portable AI assistant",
    text: "Built the provider layer that lets Specta’s AI assistant run on more than one model vendor, with tool calls working end to end.",
  },
  {
    title: "A document pipeline that fails loudly",
    text: "Hardened document ingestion so failures surface in the interface with a reason, rate-limited work is picked back up after restarts, and silent data loss gets caught instead of hidden.",
  },
  {
    title: "Commissioning issues on a real workflow engine",
    text: "Moved commissioning issues onto the platform’s native workflow engine with an in-place migration that keeps every record ID, then rebuilt the issues page as a filterable register with PDF export.",
  },
];

export const spectaArticle = { href: "/writing/designing-portable-ai-integrations", label: "How I design portable AI integrations" };
