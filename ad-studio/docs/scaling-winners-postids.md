# Scaling campaign: winners by consistency (Nov 18, corrected)

Selection rule: **10+ lifetime purchases AND profitable across more than one
calendar month.** Measured month by month, because several candidates sit in
paused campaigns and would read as zero on 7d/30d windows.

> **Correction.** An earlier version of this file named `VARIANT URL Catalog Ad
> 2` (`$29` target, 172 purchases) as the all-time #1. It is third. The first
> `maximum`-window pull had its `sort` silently ignored by the API, so results
> came back in creation-time order; the biggest ads were created Aug 9-10 and
> sat on a page that was never fetched.

## All catalog ads are one creative

Every catalog creative in the account carries **identical body copy, identical
link, and the same product set** (`26107768175558888`, Cozy Mystery, 390
products). They are one concept in many ad sets. Their differing results trace
to the **bid strategy and budget of the ad set**, not the creative. Each has its
own post object, so each has its own pile of social proof - pick the ones with
the most delivery.

## The four to use

### 1. `VARIANT URL Catalog Ad 3` - all-time #1
- **Post ID:** `518476831357470_122190359684746577`
- Campaign `BID CAP Campaign 08/10` (`120254584166930110`)
- Ad set `$26 target` · Ad `120254584166900110` · **ACTIVE**
- Creative `2469983006830434`
- Lifetime: `$4,375.83` -> **222 purchases**, `$10,348.25`, **2.36 ROAS**

| Month | Spend | Purch | ROAS | CPC | CTR |
| --- | --- | --- | --- | --- | --- |
| Aug | `$1,997.23` | 111 | **2.63** | `$0.22` | 3.54% |
| Sep | `$2,202.17` | 107 | **2.21** | `$0.43` | 2.30% |
| Oct | `$174.32` | 4 | 1.27 | `$0.49` | 1.95% |
| Nov | `$2.11` | 0 | - | `$0.26` | 4.40% |

### 2. `VARIANT URL Catalog Ad` - most consistent ad ever run
- **Post ID:** `518476831357470_122181587342746577`
- Campaign `Cozy Mystery Catalog` (`120247211394610110`)
- Ad set `VARIANT URL All Products Catalog` · Ad `120249587181130110` · **ADSET_PAUSED**
- Creative `1258985669356260`
- Lifetime: `$2,009.85` -> **97 purchases**, `$4,580.65`, **2.28 ROAS**

| Month | Spend | Purch | ROAS | CPA |
| --- | --- | --- | --- | --- |
| May 11-31 | `$190.17` | 4 | 0.75 | `$47.54` |
| Jun | `$390.21` | 9 | **1.82** | `$43.36` |
| Jul | `$535.59` | 22 | **2.22** | `$24.35` |
| Aug | `$600.84` | 49 | **3.26** | **`$12.26`** |
| Sep | `$247.71` | 13 | **2.34** | `$19.05` |

Five consecutive months of spend, four profitable. August at 3.26 on a `$12.26`
CPA is the best month any ad in the account has ever had. Currently paused.

### 3. `3.3` - single image, discount hook
- **Post ID:** `518476831357470_122196922484746577`
- Campaign `Testing Campaign` (`120255230704660110`)
- Ad set `S3` (`120255362381060110`) · Ad `120255362549930110` · **ACTIVE**
- Creative `973159632496911`
- Copy: "Cozy Mystery Readers - This One's For You / Save 25% For A Limited Time!"
- Lifetime: `$1,143.38` -> 60 purchases, `$2,331.08`, **2.04 ROAS**

| Month | Spend | Purch | ROAS | CPC |
| --- | --- | --- | --- | --- |
| Oct | `$758.59` | 40 | **2.03** | `$0.35` |
| Nov 1-17 | `$377.55` | 20 | **2.10** | `$0.29` |

The only ad improving month over month at real volume.

### 4. `3.2` - single image, voice hook
- **Post ID:** `518476831357470_122200884098746577`
- Campaign `Testing Campaign` (`120255230704660110`)
- Ad set `S3 - Copy` (`120255814697320110`) · Ad `120255814697330110` · **ACTIVE**
- Creative `1704328048030581`
- Copy: "Nothing to worry about. / Just a charming little town. / You might want
  to update your will, though."
- Lifetime: `$1,481.96` -> 83 purchases, `$3,403.80`, **2.30 ROAS**
- Nov 1-17: `$1,465.48`, 80 purchases, 2.19, CPC `$0.33`, CPA `$18.32`

**Only one full month of history.** A genuinely different hook from 3.3, not a
duplicate.

## Combined

`$9,011.02` spend -> **462 purchases**, `$20,663.78` revenue, **2.29 blended**.

## The October break

Every catalog ad failed in the same month:

| Ad | Sep ROAS | Oct ROAS |
| --- | --- | --- |
| Catalog Ad 3 | 2.21 | 1.27 |
| Catalog Ad (Cozy Mystery) | 2.34 | no spend |
| Catalog Ad 2 (`$29`) | 2.08 | 1.57 |
| +SHOP Catalog Ad | 1.85 | 1.19 |
| Catalog Ad 20 | 1.60 | 0 |

Not five ads fatiguing independently. They share one line of copy - "Save 25%
For A Limited Time!" - and all stopped at once. Either the offer lost novelty or
its audience saturated.

**The winners split into two eras:**

- **Aug-Sep:** the catalog concept. 319 of the 462 purchases. Dead since October.
- **Oct-Nov:** single-image Murder Capital (3.3, 3.2). Working now.

Weight expectations on #3 and #4. Treat #1 and #2 as a test of whether the
catalog concept still has life - and consider changing the offer line if it does
not.

## Excluded, and why

| Ad | Purch | ROAS | Why not |
| --- | --- | --- | --- |
| Catalog Ad 2 (`$29` target) | 172 | 2.07 | Same creative as #1/#2; `WITH_ISSUES` |
| +SHOP Catalog Ad | 90 | 1.72 | Same creative; is the one live now |
| Catalog Ad 20 | 40 | 1.89 | Same creative |
| Catalog Ad 1 (`$26`+Shop) | 31 | 1.92 | Same creative |
| Catalog Ad - Retargeting | 24 | 1.45 | Same creative, warm audience |
| Catalog Ad 4 (`$23`) | 20 | 2.00 | Same creative, one month |
| Catalog Ad 35 | 20 | 1.78 | Erratic: 1.00 / 2.25 / 0.79 |
| Catalog Ad 3 (`$18`) | 14 | 1.98 | One good month, then 0.83 |
| `G2.3` | 16 | 1.63 | Different creative, declining 2.05 -> 1.50 |

## Mechanics

- **Catalog ads do have post IDs.** Every catalog creative returned an
  `effective_object_story_id`. The post ID keeps the ad dynamic because the
  creative carries its own `product_set_id`.
- Copying a post ID preserves accumulated social proof on that post object.
- New ads share an audience with the originals. Meta dedupes ads from one
  account before the auction, so they do not bid against each other, but the new
  campaign takes volume from the old rather than adding net-new.

## Budget warning

At a `$18`-`$22` CPA, `$25`/day buys about **one purchase per day for the whole
campaign**. Learning exit needs ~50 conversions a week; this delivers ~7. It will
sit learning-limited and stay unreadable for weeks. If the campaign is meant to
matter it wants `$75`-`$150`/day; at `$25` treat it as a social-proof parking spot.
