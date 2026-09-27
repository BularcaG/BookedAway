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

## Staged campaign (draft, rebuilt 2026-09-27)

The first attempt was deleted: it accumulated three draft ads (creatives are
immutable, so each copy fix meant a whole new ad) and the surviving one did not
match what was built. Rebuilt in one pass by **duplicating a live ad** instead of
authoring a creative.

| Object | ID |
| --- | --- |
| Campaign `Retargeting` | `120255330621980110` |
| Ad set `Retargeting - All Warm (180d)` | `120255330622970110` |
| Ad `VARIANT URL Catalog Ad - Retargeting` | `120255330623420110` |

Draft verified: exactly one ad, `validation_status: VALIDATED`, no active errors.

### Duplicate the ad, never author the creative

Source ad: `120254655086980110` ("VARIANT URL Catalog Ad 2") from ad set
`120254655086990110` ("$29 target") in campaign `120254655086910110`
("BID CAP Campaign 08/13") - $2,992 spent, 138 purchases, 2.15 ROAS.

Pass `source_ad_id` to `ads_create_ad` and omit `creative` entirely. This is the
only way to get the real setup, because the live creative depends on a field
`ads_create_creative` does not expose:

    template_url_spec.web.url =
      https://bookedaway.shop/collections/all-products
        ?first={{product.url | urlencode}}
        &variant={{product.retailer_id | urlencode}}
        &limit=16

with `template_data.link` = `https://bookedaway.shop/collections/all-products`.
That pair is the "VARIANT URL" mechanism: a collection base URL plus the product's
own URL injected per card. It cannot be reconstructed by guessing, and the earlier
notes in this doc about clearing the link field were chasing the wrong thing.

### What the live creative actually carries

Confirmed in the duplicated draft:

- `body` = the standard primary text; `name` = `{{product.name}}`;
  `description` = `Printed in the USA`; CTA `SHOP_NOW`
- `product_set_id` `26107768175558888`, `media_type: CAROUSEL`
- `instagram_user_id` `17841471991833905`, `threads_user_id` `17841444020950013`
- **Shop is off**: `destination_spec.native_commerce_experience` has both
  `product_browsing` and `shop` at `OPT_OUT`
- `contextual_multi_ads: OPT_OUT`
- `format_transformation_spec: [{data_source: ["none"], format: "da_collection"}]`
  - present but inert, and notably NOT the `FORMAT_AUTOMATION` /
    `ad_formats: ["CAROUSEL","COLLECTION"]` enrollment that a freshly authored
    creative gets
- Three enhancements are **ON** in the winning ad and were carried over as-is:
  `media_type_automation`, `standard_enhancements_catalog`,
  `reveal_details_over_time`. Everything else is `OPT_OUT`.

### Ad set settings, copied from `120254655086990110`

- `optimization_goal: OFFSITE_CONVERSIONS`, `billing_event: IMPRESSIONS`
- `promoted_object: {pixel_id: 506614892042719, custom_event_type: PURCHASE,
  product_set_id: 26107768175558888}` - the product set belongs here too, not
  only on the creative
- `geo_locations: {countries: [US], location_types: [home, recent]}`, ages 18-65
- `attribution_spec`: 7-day click, 1-day view, 1-day engaged video view
- Automatic placements (no placement fields sent)

Two deliberate deviations from the source, both required by the task:

| Setting | Source | Here | Why |
| --- | --- | --- | --- |
| Bid strategy / budget | CBO $50/day, Bid cap ($26-$29 per ad set) | ABO $25/day, `LOWEST_COST_WITHOUT_CAP` | Explicitly chosen; a cap set for cold prospecting would mis-price a warm pool |
| `targeting_automation.advantage_audience` | `1` (on) | `0` (off) | On, Meta treats the custom audiences as suggestions and expands past them, which is not retargeting |

The source also carries `targeting_optimization: "expansion_all"`; it is omitted
here for the same reason.

### Audience sizes: 20/20 is a placeholder, not a count

Over an hour after creation, with `operation_status_code: 200` ("Normal") and
`delivery_status: ACTIVE`, both website audiences report
`approximate_count_lower_bound` and `upper_bound` of exactly 20 - including
`Exclusion - Purchasers (180d)`, which must hold thousands (645 purchases in 28
days alone). The Page engagers audience reported a real 6,400-7,600.

So website/pixel audiences do not surface real sizes through this API path while
engagement audiences do. Do not read 20 as a broken rule and do not rebuild on it.
Check sizes in Ads Manager > Audiences instead.
