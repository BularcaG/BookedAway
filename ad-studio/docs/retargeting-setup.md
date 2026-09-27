# Retargeting Setup - Consolidated Pool

The plan below follows the "bundle everyone into one retargeting asset" approach:
one ad set, every warm segment OR'd together, purchasers excluded, and the
cold-traffic catalog ad running inside it.

Account facts this was built against (read 2026-09-27):

| Thing | Value |
| --- | --- |
| Ad account | `1149260060062188` |
| Page | `518476831357470` |
| Pixel / dataset | `506614892042719` |
| Catalog | `1062467908981064` ("Shopify Product Catalog") |
| Product set | `29250912057841061` ("All Products", 95 products) |
| Instagram account linked for ads | none returned |
| Videos in the ad account | none |

28-day pixel volume: PageView 93,200 / ViewContent 24,688 / AddToCart 2,850 /
InitiateCheckout 1,472 / Purchase 645.

## Status: audiences created 2026-09-27

Custom Audiences ToS was accepted, and all three audiences now exist.

| Audience | ID | Retention |
| --- | --- | --- |
| `Retarget - Site Visitors OR ATC OR Checkout (180d, minus purchasers)` | `120255330390980110` | 180d |
| `Retarget - FB Page Engagers (365d)` | `120255330394600110` | 365d |
| `Exclusion - Purchasers (180d)` | `120255330394310110` | 180d |

Immediately after creation both retargeting audiences reported placeholder sizes
(exactly 20 and exactly 1,000) with operation status 441, and the Page audience
showed `delivery_status: INACTIVE`. That is expected while backfill runs. Re-read
them before launching; if the Page audience is still too small to deliver, launch
on the site-side pool alone.

## Why this is three audiences and not one

Page and Instagram engagement live in their own `ENGAGEMENT` audience object;
they cannot be rules inside a website audience. So the "bundle them into one"
step happens at the **ad set** level: one ad set includes both retargeting
audiences (including two audiences *is* the OR) and excludes purchasers once.
Functionally identical to describing it as one audience.

Note that Meta does mix some sources itself - see the Shops expansion below.

## Meta auto-expanded the site-side audience

The audience was created with three pixel rules. Meta saved eight, adding the
Facebook Shop as a second event source:

- `shopping_page` / `SHOPS_PAGE_VIEW`
- `shopping_page` / `VIEW_CONTENT`
- `shopping_page` / `SHOPS_COLLECTION_VIEW`
- `shopping_page` / `ADD_TO_CART`
- `shopping_page` / `InitiateCheckout`

All OR'd in alongside the pixel rules, all on the same 180-day window, with the
purchaser exclusion still applying. This is free extra pool from a surface the
pixel does not cover.

## 1. Site-side pool (WEBSITE subtype)

Name: `Retarget - Site Visitors OR ATC OR Checkout (180d, minus purchasers)`

```json
{
  "inclusions": {
    "operator": "or",
    "rules": [
      {
        "event_sources": [{ "type": "pixel", "id": "506614892042719" }],
        "retention_seconds": 15552000,
        "filter": { "operator": "and", "filters": [{ "field": "url", "operator": "i_contains", "value": "" }] },
        "template": "ALL_VISITORS"
      },
      {
        "event_sources": [{ "type": "pixel", "id": "506614892042719" }],
        "retention_seconds": 15552000,
        "filter": { "operator": "and", "filters": [{ "field": "event", "operator": "eq", "value": "AddToCart" }] },
        "template": "VISITORS_BY_URL"
      },
      {
        "event_sources": [{ "type": "pixel", "id": "506614892042719" }],
        "retention_seconds": 15552000,
        "filter": { "operator": "and", "filters": [{ "field": "event", "operator": "eq", "value": "InitiateCheckout" }] },
        "template": "VISITORS_BY_URL"
      }
    ]
  },
  "exclusions": {
    "operator": "or",
    "rules": [
      {
        "event_sources": [{ "type": "pixel", "id": "506614892042719" }],
        "retention_seconds": 15552000,
        "filter": { "operator": "and", "filters": [{ "field": "event", "operator": "eq", "value": "Purchase" }] },
        "template": "VISITORS_BY_URL"
      }
    ]
  }
}
```

`15552000` seconds is 180 days, the maximum for a website audience.

### Why 180 days and not 60

An earlier draft of this doc recommended shortening the all-visitors leg to 60
days to avoid paying warm-audience prices for stale browsers. That was wrong for
this account, because the stale tail it guards against does not exist yet.

Link clicks by month, 2026:

| Period | Spend | Link clicks |
| --- | --- | --- |
| Jan-Jul (7 months) | $3,086 | 3,680 |
| Aug | $5,074 | 16,281 |
| Sep (26 days) | $6,941 | 12,151 |

The account scaled around 2026-08-10; before that it ran near $15/day. About 88%
of the year's traffic falls in the last seven weeks. A 60-day window reaches back
to roughly 2026-07-29 and captures ~28,550 clicks' worth of visitors; 180 days
reaches back to roughly 2026-03-31 and adds only ~3,075 more, about 11%.

So the shorter window discards people for almost no benefit. Keep 180 days
everywhere for now.

**Revisit around February 2027**, when six months of post-scale history exists
and the 180-day pool genuinely is stale-heavy.

## 2. Engagement pool (ENGAGEMENT subtype)

Name: `Retarget - FB Page Engagers (365d)`

Event source `{"type":"page","id":"518476831357470"}`, retention `31536000`
(365 days), broadest page-engagement event.

The Instagram half of this needs an Instagram business account linked to the ad
account with `instagram_basic` granted. `ads_get_ig_accounts` currently returns
an empty list, so the IG leg cannot be built yet.

## 3. Purchaser exclusion (WEBSITE subtype)

Name: `Exclusion - Purchasers (180d)`

Same single Purchase rule as the exclusions block above, used as the ad set
level exclusion so it also covers the engagement pool.

## Not buildable: 75%+ video viewers

Two independent reasons:

1. `ads_get_ad_videos` returns nothing for this account - there are no videos,
   so a video-view audience would have nobody in it.
2. The audience rule schema available here supports pixel, page, Instagram
   business, shopping, lead-form and Instant Experience event sources. A
   video-view threshold segment is not among them.

This leg gets added later, once video creative is actually running.

## The ad set

One ad set ("one asset"):

- Included audiences: the site-side pool **and** the engagement pool (OR).
- Excluded audience: `Exclusion - Purchasers (180d)`.
- Objective `OUTCOME_SALES`, optimization `OFFSITE_CONVERSIONS`, event `PURCHASE`.
- Advantage+ Audience **off** - it would expand past the retargeting pool, which
  defeats the purpose.
- Budget: ABO is simplest while this is the only retargeting ad set. CBO only
  matters once there is more than one ad set to split across.
- Ads inside: the catalog / dynamic product ad off product set
  `29250912057841061`.

Budget amount and bid strategy are still to be decided.
