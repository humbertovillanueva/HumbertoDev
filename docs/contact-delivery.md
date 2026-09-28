# Contact email delivery

The site sends plain-text contact messages through Resend to the existing portfolio inbox, `hachevillanueva99@gmail.com`. Visitors cannot choose a recipient. Their validated email is used only as Reply-To. No autoresponder is sent to visitors.

## Production configuration

Set these **server-only** environment variables for the HumbertoDev Vercel project's Production environment, then deploy:

- `RESEND_API_KEY`: Resend **Sending access**, scoped to `contact.humbertovillanueva.dev`.
- `CONTACT_FROM`: `HumbertoDev <website@contact.humbertovillanueva.dev>` after Resend verifies this domain.
- `CONTACT_ENABLED`: `true` after the domain and key are configured.
- `CONTACT_ORIGIN`: optional; defaults to `https://humbertovillanueva.dev`.

Never prefix the key with `NEXT_PUBLIC_`, put it in Git, print it in logs, or paste it in chat. Keep the Vercel project's OIDC token setting enabled for BotID. BotID is explicitly configured for Basic checks (free), not Deep Analysis.

Without complete configuration the GET endpoint reports sending unavailable and the UI retains email-draft and clipboard options. Setting `CONTACT_ENABLED=false` and redeploying disables direct sending.

## Domain

DNS is managed at Namecheap. Add only the records supplied for the `contact` subdomain in Resend; preserve the root website A record and existing email-forwarding records. Resend account setup and domain verification are separate from website deployment. Check the current Resend dashboard before copying DNS values.

## Request protections

- Same-origin JSON POST, with a 12 KB streamed request limit.
- Bounded strings, required fields, email syntax and header-injection checks.
- Honeypot and server-side BotID verification before sending; verification errors fail closed.
- Fixed recipient and plain-text output.
- Resend idempotency key derived from submission ID and normalized content, reused after an uncertain response. Resend retains idempotency keys for 24 hours.
- Provider and browser timeouts; no secrets, request bodies, or raw provider errors logged.

BotID Basic is not a per-person quota. Monitor usage and add a Vercel firewall rate-limit rule if traffic warrants it. Do not enable paid features without authorization.

## Checks

```sh
node --experimental-strip-types --test automation/contact.test.mjs
# Build first, then start an unconfigured local server in a second terminal:
CONTACT_ORIGIN=http://localhost:3016 npm start -- --port 3016
PREVIEW_URL=http://localhost:3016 node automation/contact.mjs
```

The browser test mocks provider success/failure and verifies local rejection paths; it never sends email. Before declaring production complete, submit one clearly labeled test from the real browser, verify Resend's delivered event, and confirm receipt in the configured inbox. API acceptance alone is not proof of inbox delivery.
