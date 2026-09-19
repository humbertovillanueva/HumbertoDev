# Weekly portfolio sync

## Current setup

- Owner/source: humbertovillanueva/HumbertoDev, production branch main.
- Live portfolio: https://humbertovillanueva.dev/.
- Verified Vercel dashboard: https://vercel.com/humberto-dev/humberto-dev.
- Shared home and /projects data: app/projects.json.
- Schedule: Sunday 03:00 America/Denver; UTC triggers at 09:00 and 10:00 with a DST-aware gate. GitHub may delay runs. GitHub may disable public-repository schedules after 60 days of repository inactivity.
- The computer and ChatGPT can be off. Outcomes are in GitHub Actions summaries; GitHub notification preferences control email/app delivery.

## Activation

The repository had no Actions secrets at setup. Cloud generation/publication cannot be verified until API access is added. Scheduled runs default to disabled until PORTFOLIO_SYNC_ENABLED is true.

1. Add an OpenAI API key as the repository Actions secret OPENAI_API_KEY in Settings → Secrets and variables → Actions. API usage is billed to the API account. Never commit the key or paste it into a chat.
2. Settings → Actions → General must allow Actions to create pull requests. Only the publish job requests contents/PR write permission. The workflow never approves its own PR review or bypasses branch protection.
3. Manually run Weekly portfolio sync with Publish unchecked. Confirm evidence collection, AI output and data validation. When content changes, inspect the build and desktop/mobile screenshot artifacts. No-change runs skip build/publication.
4. Test Publish checked when a real update exists. Verify Vercel preview, merge, production status and live content. Required human reviews must be honored.
5. Only after testing, set repository variable PORTFOLIO_SYNC_ENABLED to true. Set false to pause. No separate desktop schedule is needed.

## Behavior and limits

The official Codex action reads the skill and public evidence, emitting only schema-defined JSON in a read-only sandbox. Its API key is passed only to that action. A deterministic validator applies project data. Existing curated cards are immutable; managed cards can be revised and public projects added. Broader profile/site redesign is outside the weekly scope.

The collector follows pagination, excludes forks/archived/portfolio duplicates, and pins README/package evidence to a commit. It also reads the live homepage. It does not inspect every source file; sparse evidence should produce no new claims. Source projects are never executed.

Changed data passes unit tests, lint, build and Playwright checks for card content, links, overflow and runtime errors at desktop/mobile widths. A separate write job opens a PR, waits for Vercel status, merges the expected head only if main remains unchanged, and verifies production status/live text. Automation commits use the owner's existing Git author metadata and an explicitly automated commit message. Vercel author/account restrictions may still require configuration; a missing successful status stops publication.

Unmerged automated PRs block further updates. Production failures do not automatically roll back; inspect and revert only the affected change if necessary. Actions are pinned to commits; Playwright is locked. No Vercel API token is needed for the existing Git integration. Test changes with python3 automation/test_sync.py and site checks.
