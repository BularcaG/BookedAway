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

## Blocker: Custom Audiences Terms of Service

No custom audience can be created on this ad account until the Custom Audiences
ToS is accepted once, by the account owner:

    https://www.facebook.com/customaudiences/app/tos/?act=1149260060062188

Until then every create returns error 2663 ("Terms of service has not been
accepted").

## Why this is three audiences and not one

Meta will not mix pixel-sourced rules and Page/Instagram engagement-sourced
rules inside a single custom audience object - a website audience and an
engagement audience are separate objects. The "bundle them into one" step
therefore happens at the **ad set** level: one ad set includes both audiences
(which is an OR), and excludes purchasers once. Functionally identical to
describing it as one audience.

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

`15552000` seconds is 180 days, the maximum for a website audience. At current
traffic the all-visitors leg alone will be a few hundred thousand people, which
is broad for a retargeting budget - shortening that one leg to 30 or 60 days
while leaving AddToCart and InitiateCheckout at 180 is the usual tightening.

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
