# BookedAway Ad Studio

A small self-hosted app that does the "creative studio" half of what tools
like RapidAds do: turn a product photo into a batch of ready-to-run
Facebook/Instagram ad creatives.

**This app never talks to Facebook.** Publishing (creating the actual
Campaign → Ad Set → Ads in Ads Manager) happens by handing the generated
images to Claude, which is connected to **Meta's official Ads MCP server**
(`mcp.facebook.com/ads`). That split is deliberate - see "Why no built-in
Facebook publishing?" below.

If you just want plain-language, step-by-step instructions, read
**[GUIDE.md](./GUIDE.md)** instead - this file is the technical reference.

## What it does

1. **Upload a product photo** - one JPEG/PNG/WebP image.
2. **Generate creatives** - pick a headline, subheadline, CTA and brand color;
   the app crops your photo into every Facebook ad size (1:1 feed, 4:5 feed,
   9:16 story/reel) and burns in one of three overlay templates for each,
   producing a batch of variations in one click (via `sharp` + SVG
   compositing - no external AI API or budget needed). A fourth
   "No Overlay (Resize Only)" template is available for creatives you've
   already finished elsewhere - it only crops/resizes, no text is added,
   and no headline is required when it's the only one selected.
3. **Hand off** - pick the winners, download the images (or copy the
   auto-generated brief), and paste them to Claude in chat. Claude creates
   the real Campaign/Ad Set/Ads through the official Meta MCP, paused by
   default so nothing spends until you review it.

## Why no built-in Facebook publishing?

An earlier version of this app called the Meta Marketing API directly with
its own Facebook App + OAuth flow. That works, but it means yet another
piece of software holding a live `ads_management` token and making raw API
calls - exactly the kind of unfamiliar-integration traffic that can trip
Meta's automated enforcement. Routing every write (campaign/ad set/ad/image
upload) through **Meta's own hosted MCP server** instead means:

- No custom app credentials, no OAuth flow to maintain, no token stored on
  disk here.
- Every publish action is Meta's own sanctioned client, not a third-party
  wrapper or proxy.
- The creative-generation half (the part Meta has no equivalent for) stays
  local, free, and fast.

## Architecture

```
src/
  app/
    page.tsx                    2-step wizard UI (client component)
    api/
      assets/                   upload/list product photos
      creatives/                generate/list ad creative variations
  lib/
    creative-studio/
      templates.ts                3 SVG overlay templates + a no-overlay passthrough + word-wrapping
      compose.ts                   sharp: crop photo to each ad size + composite overlay
    store.ts                     tiny JSON-file database (data/db.json) - assets + creatives only
```

Uploaded photos live in `public/uploads/`, generated creatives in
`public/generated/`, and records of what was generated live in
`data/db.json`. All three are gitignored.

## Setup

```bash
cd ad-studio
npm install
npm run dev                  # http://localhost:3000
```

No environment variables or Facebook App are required to run this app - it
only ever writes local files.

## Publishing (outside this app)

1. Connect Meta's official Ads MCP (`https://mcp.facebook.com/ads`) as a
   custom connector in Claude, and authorize it against the ad account/Page
   you actually manage - this needs `ads_management` on your own account,
   which is Standard Access and needs no App Review.
2. In this app, generate and select your creatives (Step 2's "Hand off to
   Claude" panel gives you a ready-made brief).
3. Attach the downloaded image(s) to your chat with Claude (or, if this app
   is deployed somewhere public, give Claude the image URLs) along with the
   campaign name/budget/targeting/destination URL.
4. Claude creates the Campaign → Ad Set → Ad(s) via the MCP, paused by
   default.

## Production notes

- Local disk storage for images should move to S3/Cloud Storage (or the app
  should be deployed somewhere public) if you want Claude to fetch creative
  images by URL instead of by file attachment.
- No multi-user auth - this is a single-operator internal tool.
- Ad creative generation is template-based (deterministic, fast, free). If
  you want AI-generated backgrounds/upscaling, that's a separate pluggable
  step you'd add in `lib/creative-studio/` - the rest of the pipeline does
  not need to change.
