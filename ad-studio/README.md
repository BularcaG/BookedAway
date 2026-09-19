# BookedAway Ad Studio

A small self-hosted app that does what tools like RapidAds do: turn a product
photo into a batch of ready-to-run Facebook/Instagram ad creatives, then
publish them directly into Facebook Ads Manager as a real Campaign → Ad Set →
Ads, via the Meta Marketing API.

If you just want plain-language, step-by-step instructions, read
**[GUIDE.md](./GUIDE.md)** instead - this file is the technical reference.

## What it does

1. **Connect Facebook** - OAuth into your own Facebook Business account (or
   paste a System User token) so the app can call the Marketing API on your
   behalf. You pick which ad account and Page it should publish through.
2. **Upload a product photo** - one JPEG/PNG/WebP image.
3. **Generate creatives** - pick a headline, subheadline, CTA and brand color;
   the app crops your photo into every Facebook ad size (1:1 feed, 4:5 feed,
   9:16 story/reel) and burns in one of three overlay templates for each,
   producing a batch of variations in one click - this is the "creative
   studio" part of RapidAds, done with template compositing (`sharp` + SVG)
   instead of a generative model, so it needs no external AI API or budget.
4. **Publish** - pick the winners, set a campaign name/objective/budget/
   destination URL/targeting, and hit publish. The app uploads each image to
   Facebook's image library, creates an Ad Creative from it, then a Campaign,
   an Ad Set, and one Ad per creative - all through the Marketing API. New
   campaigns are created **paused** by default so nothing spends until you
   review it yourself in Ads Manager.

## Architecture

```
src/
  app/
    page.tsx                    4-step wizard UI (client component)
    api/
      auth/facebook/            OAuth start/callback/status
      facebook/meta/            list + save ad account & Page selection
      assets/                   upload/list product photos
      creatives/                generate/list ad creative variations
      campaigns/                publish/list Facebook campaigns
  lib/
    facebook/
      graph.ts                  thin Graph API fetch wrapper (JSON + multipart)
      auth.ts                   OAuth login URL, token exchange/refresh, /me, ad accounts, pages
      campaigns.ts               createCampaign / createAdSet / createAd
      creatives.ts               uploadAdImage / createAdCreative
    creative-studio/
      templates.ts                3 SVG overlay templates + word-wrapping
      compose.ts                   sharp: crop photo to each ad size + composite overlay
    store.ts                     tiny JSON-file database (data/db.json) - connections, assets, creatives, campaigns
```

No database server, no queue, no external AI API required to run the MVP.
Uploaded photos live in `public/uploads/`, generated creatives in
`public/generated/`, and everything else (the Facebook connection, and
records of what was generated/published) lives in `data/db.json`. All three
are gitignored - this is designed to run as one small server process for one
store, not a multi-tenant SaaS.

## Setup

```bash
cd ad-studio
npm install
cp .env.example .env.local   # fill in FB_APP_ID / FB_APP_SECRET, see GUIDE.md
npm run dev                  # http://localhost:3000
```

### Facebook App requirements

- A Meta App with the **Marketing API** product added (developers.facebook.com).
- A **Valid OAuth Redirect URI** on that app matching `FB_REDIRECT_URI` exactly.
- The person connecting must be an admin/advertiser on the ad account and an
  admin on the Page you want to publish through. Using `ads_management` on
  your **own** ad account is "Standard Access" and needs no App Review.
- Alternative to OAuth: generate a long-lived **System User token** in Meta
  Business Suite (Business Settings → System Users) with `ads_management` +
  `pages_manage_ads` on your ad account/Page, and set `FB_SYSTEM_USER_TOKEN`
  in `.env.local`. The app then skips the Connect step entirely - the
  recommended setup for unattended/automated use on your own store.

## Production notes (not done in this MVP, on purpose)

- Local disk storage for images should move to S3/Cloud Storage before this
  runs anywhere but your own machine/server.
- The Facebook access token is stored in plaintext in `data/db.json`; encrypt
  it at rest (or move to a secrets manager) before exposing this app to more
  than one trusted operator.
- No multi-user auth - this is a single-operator internal tool. Add a login
  if more than one person will use the same deployment.
- Ad creative generation is template-based (deterministic, fast, free). If
  you want AI-generated backgrounds/upscaling like some competitors offer,
  that's a separate pluggable step you'd add in `lib/creative-studio/` -
  the rest of the pipeline (formats, publishing) does not need to change.
