# Booked Away — ad account change log

Running record of what changed, when, and why. Claude maintains this; George
makes the changes in Ads Manager.

Account `1149260060062188` · timezone America/Chicago.
Meta's "today" is the Chicago day, which runs behind UTC.

## Standing rules we work to (WeScale protocol, ads ROAS only)

Account gate on the past 7 days, checked before any ad set:

| 7-day account ROAS | Action |
| --- | --- |
| below 1.8 | stop scaling, fix creative |
| 1.8 - 2.0 | scale cautiously |
| 2.2+ | healthy, proceed |

Then per ad set, every 2-3 days, never Mon/Tue:

| 7-day ROAS | Budget |
| --- | --- |
| 2.5+ | +20% |
| 2.2 - 2.4 | +15% |
| 2.0 - 2.2 | hold |
| 1.8 - 2.0 | hold |
| 1.6 - 1.8 | -15% |
| below 1.6 | -20% |

Before applying a cut, check ad-level spend share: an ad set's number is often
dragged down by an ad that is already paused.

## Nov 12

- Grid 3 budget `$40` -> `$15`. The `$40` day spent `$54.21` for 0 purchases
  and 2 add-to-carts. Note the `$15` level has not been tested since.
- Back Catalog (Discovery) running again, `$8.93`, 0 purchases.
- S5 Charming Village on watch: `$14.20`, 0 purchases, **0 add-to-carts**.
  George cuts it tomorrow if it produces nothing.

## Nov 11

- Grid 3 budget `$12.50` -> `$40` (acting on its 2.46 7-day ROAS).
- Grid 2 ad set reactivated at `$12.50` with G2.3 paused, leaving G2.1, G2.2,
  G2.4 and G2.5 to compete. Claude paused G2.3 (`120255741036190110`); George
  stopped the rest of that sequence.
- Paused: Frame Catalogs campaign, COST CAP Campaign 08/30.
- Paused ads: Charming Village White_Navy (S5), 3.2 (S3 - Copy Collection page).
- Draft built, not published: **Scaling - Winners** campaign
  `120256023439890110`, CBO `$25`/day, highest volume, one ad set `Winners`
  `120256023442620110` holding three ads on reused creative IDs:
  - W1 `120256023443760110` - Catalog Ad 3, creative `2469983006830434`
  - W2 `120256023446040110` - VARIANT URL Catalog Ad, creative `1258985669356260`
  - W3 `120256023447780110` - 3.2 single image, creative `1704328048030581`
  Outstanding: W1 and W2 still carry Advantage+ enhancements that have to be
  switched off by hand in Ads Manager; the MCP refuses that for catalog ads.

## Earlier

- S4 and S6 (Little Grey Cells) ad sets paused.
- Nine `OLD-REMOVE` draft ads from the S4/S5 rebuild still sit in the Ads
  Manager draft and have to be deleted by hand before that draft publishes.

## Known data quirks

- Meta under-reports purchases. Nov 11: Meta 16, Shopify 19 (-16%).
- `product_id` breakdowns are variant level and cap at 1,000 rows per request,
  so product analysis is always a partial sample.
- An ad set's 7-day ROAS keeps the spend of ads paused during that window for
  up to a week afterwards.
