# Ad Console - How To Use It

This is where you build your ads. You fill in everything here, it hands you a
brief, you paste that to Claude, and Claude creates the real thing in Facebook
through Meta's official connection.

## Start it up

```bash
cd ad-studio
npm install
npm run dev
```

Open http://localhost:3000. No login, no API keys, nothing to configure.

## The fast path: duplicate an ad that already works

This is how you'll make most ads.

1. On the **Ad Library** screen, find the ad you want to copy.
2. Click **Duplicate**. You get a full copy of every setting - budget, bid cap,
   targeting, pixel, campaign, copy, everything.
3. Change only what's different (usually the creative image and the headline).
4. Click **Build brief**, then hand it off (see below).

That's it. No re-entering budgets or targeting you've already decided once.

## The long path: build one from scratch

Click **+ New ad**. You get one page with four blocks.

### Top block - the basics
- **Ad name** - what it's called in Ads Manager (e.g. `3.1`).
- **Launch as** - leave on **Paused** so you can review before it spends.

### Campaign
- **Add to existing campaign** (type the name, and the ID if you have it) or
  **Create new campaign** (name + objective).
- **Catalog campaign** - off unless you're running dynamic product ads.
- **Special ad category** - off unless it's housing/employment/credit/politics.
- **Who holds the budget**:
  - *Ad set budget (ABO)* - each ad set gets its own budget. Best for testing.
  - *Campaign budget (CBO)* - one budget, Meta splits it across ad sets.

### Ad set
- **Budget** - daily or lifetime, and the amount.
- **Bid strategy**:
  - *Highest volume* - autobid, no cap. The default.
  - *Cost cap* - you set a target cost per result; Meta aims to stay near it.
  - *Bid cap* - a hard ceiling on each individual bid.
  - Pick cost cap or bid cap and an amount field appears - fill it in or the
    hand-off panel will flag it.
- **Optimization goal** - only the goals Meta actually accepts for your
  objective are listed, so you can't pick an invalid combination.
- **Pixel + conversion event** - pre-filled with your pixel and `PURCHASE`.
- **Countries, age range**.
- **Advantage+ Audience** - on by default (matches your live ad sets).
- **Manual placements** - off by default, meaning automatic placements. Only
  turn it on if you want to restrict where ads run.

### Ad & creative
- **Format** - Single image (default), **Carousel**, or **Collection**.
  Carousel needs 2+ images; select them in order and they're numbered.
- **Shop surface** - off by default; turn on for the shop strip under the ad.
- **Primary text** - the block of copy above the image.
- **Headline** - bold line under the image.
- **Description** - small grey line under the headline.
- **Call to action**, **Destination URL**, **Page ID**, optional **Instagram ID**.
- **Creative files** - upload the finished image(s) and click to select.
- **Advantage+ creative enhancements** - off by default, so your creative runs
  exactly as you made it.
- **AI content disclosure** - your call; only matters in certain regions.

### Notes for Claude
Anything unusual - "match ad set S1 exactly", "hold until Friday", whatever.

## Handing it off

1. Click **Build brief** in the right-hand panel.
2. If anything's missing it tells you exactly what, in plain words. Fix it and
   build again.
3. Click **Copy brief**.
4. Download the creative image(s) with the download links in the panel.
5. Go to your chat with Claude, **attach the image file(s)**, paste the brief,
   and send.
6. Claude creates the Campaign → Ad Set → Ad through Meta's official
   connection, paused unless you said otherwise, and sends you back the
   Ads Manager link.
7. Come back and click **Mark as sent** so the library shows what's done.

## Why doesn't the app just publish it itself?

Because a custom app holding Facebook credentials and making its own Marketing
API calls is exactly the kind of unofficial integration that puts an ad account
at risk - which you specifically wanted to avoid. So this app does the part
that's safe and tedious (building a complete, correct spec) and Meta's own
sanctioned connection does the part that touches your account.
