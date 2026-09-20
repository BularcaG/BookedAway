# BookedAway Ad Console

A self-hosted workspace for building Facebook ad specs - campaign, ad set,
creative, budgets, bid caps, targeting - and handing them off to be published
through **Meta's official Ads MCP**.

**This app never talks to Facebook.** It has no Facebook credentials and makes
no Marketing API calls. It produces a complete, unambiguous brief; Claude then
creates the campaign/ad set/ads through Meta's own sanctioned connection. That
split is deliberate: you get a fast, purpose-built front-end without running a
second unofficial integration against your ad account.

For click-by-click instructions see **[GUIDE.md](./GUIDE.md)**.

## What it does

- **Ad Library** - every spec you've built, with status (Draft / Sent), budget,
  CBO-vs-ABO, bid strategy and format at a glance.
- **Duplicate** - clone any previous spec in one click and change only what's
  different. Most new ads are a proven ad with new creative or new copy, so this
  is the primary path, not an afterthought.
- **Builder** - one page covering everything:
  - *Campaign*: reuse an existing campaign or create a new one; objective;
    catalog campaign toggle; special ad category toggle; **campaign budget (CBO)
    vs ad set budget (ABO)**.
  - *Ad set*: budget (daily/lifetime), **bid strategy - highest volume, cost cap
    or bid cap, with the target/cap amount**; optimization goal (only the ones
    Meta accepts for the chosen objective); billing event; pixel + conversion
    event; countries; age range; Advantage+ Audience; manual placements.
  - *Ad & creative*: **single image / carousel / collection**; shop-surface
    toggle; primary text, headline, description; CTA; destination URL; page and
    Instagram account; creative file upload; Advantage+ creative enhancements
    (off by default); AI content disclosure.
- **Hand off** - builds the brief, validates it, and gives you a copyable brief
  plus a JSON payload whose field names match the Meta MCP tool parameters
  exactly, so submitting is transcription rather than interpretation.

### Defaults are opinionated

Enhancements and customizations are **off** unless you turn them on. The toggles
that are exposed are the ones that actually matter for this store; everything
else Meta offers is intentionally not surfaced. Sensible values (ad account,
page, pixid, $20/day, US 18-65, Advantage+ Audience on) are pre-filled from the
account's existing live ad sets so a new spec starts from what already works.

### Validation before anything reaches Facebook

The hand-off panel blocks on real problems rather than letting them through:
cost cap selected with no amount, carousel with fewer than two images,
conversion optimization with no pixel, missing destination URL, and so on.

## Architecture

```
src/
  app/
    page.tsx                 Ad Library - list, duplicate, delete
    builder/page.tsx         Builder route
    api/
      specs/                 CRUD + duplicate (POST with duplicateFromId)
      specs/[id]/brief/      GET builds brief+payload+validation, POST marks sent
      assets/                creative upload/list (stored as-is, no processing)
  components/
    Toggle.tsx               pill switch
    builder/                 Campaign / AdSet / Creative sections, Segmented, BriefPanel
  lib/
    types.ts                 AdSpec shape
    defaults.ts              objectives, goals, bid strategies, account defaults
    brief.ts                 spec -> brief text + MCP-shaped payload + validation
    store.ts                 JSON-file store (data/db.json)
```

No database server, no external APIs, no credentials. Specs live in
`data/db.json`, uploaded creatives in `public/uploads/` - both gitignored.

## Setup

```bash
cd ad-studio
npm install
npm run dev     # http://localhost:3000
```

No environment variables required.

## Production notes

- Single-operator tool. No auth - don't expose it beyond your own machine
  without adding some.
- Local disk storage for creatives; move to S3 if this is ever deployed.
- The spec library is local, so "duplicate" covers ads built *in this tool*. To
  seed it from campaigns that already exist in Ads Manager, ask Claude to read
  the live settings via MCP and fill in a spec once - after that it's duplicable
  like any other.
