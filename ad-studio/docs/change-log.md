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

## Nov 17

- **S5 Charming Village reversed**: Navy back ON, Sand OFF. Monitoring restarts
  today. Whole-run numbers that justify it:

  | Ad | Spend | Clicks | Purch | CPA | ROAS |
  | --- | --- | --- | --- | --- | --- |
  | Navy | `$186.74` | 417 | 8 | `$23.34` | **2.23** |
  | Sand | `$106.93` | 199 | 3 | `$35.64` | 1.26 |

  Navy was paused on Nov 11 off a bad 7-day window (0.80) while Sand showed
  3.44 on one purchase and `$10.14` of spend. Claude endorsed that call and
  under-weighted the small sample. Navy was the better ad throughout.
  The 4.75 Navy currently shows over 7 days is residual spend from before the
  pause, not a signal.
  **Decision point: ~Dec 1**, when Navy should reach 10 purchases at `$15`/day.

- Since Nov 13, George also: raised S3 - Copy `$100` -> `$150` (held at 2.15,
  `$18.90` CPA over 46 purchases), paused S3 - Copy Collection page, paused
  VARIANT URL All Products Catalog, added the `Design Only` and `Reader life`
  ad sets.

- 7-day account read: `$2,184.88` spend, 90 purchases, ROAS **1.76** headline /
  **1.84** live ads only / **2.02** excluding Discovery.
  Discovery is the bleed: Just Released `$113.19` for 1 sale (0.31), Back
  Catalog `$70.88` for 0.

- Grid 2 experiment result: G2.1 delivered (2.01 on `$46.78`), G2.5 did not
  (`$10.58`, zero purchases). The ad set's 3.13 headline is G2.3's residual
  spend; live ads only it is 1.73.

### Standing rule added

Do not judge an individual **ad** on fewer than ~10 purchases (roughly
`$250`-`$350` of spend at current CPAs). At `$15`/day one ad produces 4-5
purchases a week, so a 7-day window is 4-5 data points and one sale shifting
days swings ROAS by half. Ad **set** level reaches 10 purchases far sooner and
has been the more reliable read.

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
