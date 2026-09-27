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
| Catalog in use | `2180057345773467` ("Shopify Product Catalog") |
| Product set in use | `26107768175558888` ("Cozy Mystery", 280 products) |
| Instagram account | `17841471991833905` (delivery yes, audience creation denied) |
| Videos in the ad account | none |

There are two catalogs. `ads_catalog_list_catalogs` recommends
`1062467908981064`, but every live catalog creative uses product sets from
`2180057345773467` - `26107768175558888` ("Cozy Mystery") most recently. Build
against the one the working ads use, not the recommended one.

28-day pixel volume: PageView 93,200 / ViewContent 24,688 / AddToCart 2,850 /
InitiateCheckout 1,472 / Purchase 645.

## Status: audiences created 2026-09-27

Custom Audiences ToS was accepted, and all three audiences now exist.

| Audience | ID | Retention |
| --- | --- | --- |
| `Retarget - Site Visitors OR ATC OR Checkout (180d, minus purchasers)` | `120255330390980110` | 180d |
| `Retarget - FB Page Engagers (365d)` | `120255330394600110` | 365d |
| `Exclusion - Purchasers (180d)` | `120255330394310110` | 180d |

Sizes 16 minutes after creation: the Page audience had filled to 6,400-7,600 and
gone `delivery_status: ACTIVE`; the site-side pool still read a placeholder 20
with operation status 441. Backfill across six months of pixel history and eight
event rules takes longer than the Page one - allow up to 24 hours. Re-read it
before publishing, and treat a size still at 20 after a day as a broken rule
rather than slow backfill.

### Instagram engagers - blocked on a permission, not a connection

`ads_get_ig_accounts` returns an empty list, but the created catalog creative
carries `instagram_user_id: 17841471991833905`, so an Instagram account IS
attached and IS usable for delivery. Creating an audience from it fails with:

    error 2654 / subcode 1713140 - No permission on event source:
    Do not have audience creation permission on one or more event
    sources (Id 17841471991833905)

So the IG leg needs audience-creation permission granted on that Instagram
account, not a new connection. Once granted, add it as a fourth audience with
event source `{"type":"ig_business","id":"17841471991833905"}` at 365 days and
include it in the ad set alongside the other two.

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

## Staged campaign (draft, 2026-09-27)

Created through the Meta MCP in draft state - nothing is live until the campaign
is published from Ads Manager.

| Object | ID | Settings |
| --- | --- | --- |
| Campaign `Retargeting` | `120255330426190110` | `OUTCOME_SALES`, AUCTION, ABO (no campaign budget) |
| Ad set `Retargeting - All Warm (180d)` | `120255330427080110` | $25/day, `LOWEST_COST_WITHOUT_CAP`, `OFFSITE_CONVERSIONS`, `IMPRESSIONS`, destination `WEBSITE` |
| Creative `Retargeting - Cozy Mystery Catalog` | `2140508583526929` | catalog carousel on product set `26107768175558888` |
| Ad `R1.1 - Cozy Mystery Catalog` | `120255330427870110` | conversion domain `bookedaway.shop` |

Ad set targeting: US, 18-65, including audiences `120255330390980110` and
`120255330394600110`, excluding `120255330394310110`, with
`targeting_automation.advantage_audience: 0` so Advantage+ Audience is off and
delivery cannot expand past the retargeting pool.

Promoted object: `{"pixel_id":"506614892042719","custom_event_type":"PURCHASE"}`.

### Shop surface: off

Decided against the Shop destination on this ad set. Evidence from the account:

| Ad set | Spend | Purchases | ROAS | CPA |
| --- | --- | --- | --- | --- |
| VARIANT URL All Products Catalog | $1,406 | 84 | 2.65 | $16.73 |
| VARIANT URL All Products Catalog + SHOP + Multi | $1,163 | 53 | 1.84 | $21.94 |
| $26 target | $3,959 | 212 | 2.51 | $18.68 |
| $26 target + Shop | $166 | 9 | 2.26 | $18.48 |

Shop-on was about 31% worse on both ROAS and CPA in the comparable pair, though
that pair also differs by "+ Multi" so Shop is not cleanly isolated. Separately,
`omni_purchase` equals `website purchases` in every month of 2026, meaning no
recorded purchase has ever happened anywhere but the website - Shop is not
contributing a second conversion path.

### Two things Meta set on its own

- The creative enrolled `ad_formats: ["CAROUSEL","COLLECTION"]` with
  `optimization_type: FORMAT_AUTOMATION` and a `da_collection` format
  transformation, so the ad may render as a Collection. This is Meta's catalog-ad
  default and is a display format, unrelated to the Shop surface toggle.
- Every one of the ~85 Advantage+ creative enhancement features came back
  `enroll_status: OPT_OUT` / `DEFAULT_OFF`, so the creative runs unenhanced.

`self_ai_disclosure` was deliberately left unset - that declaration is the
advertiser's to make.

### Ad copy (draft, needs approval)

Primary text:

    📚 Still thinking it over?
    The one you had your eye on is still here — 25% off for a limited time.
    Shop: bookedaway.shop/sale

Headline `{{product.name}}` (pulled per product from the catalog), description
`Printed in the USA`, CTA `SHOP_NOW`. The headline and description match the
live catalog ads; the primary text is retargeting-specific and written for this
ad set.
