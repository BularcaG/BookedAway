# Scaling campaign: winners by consistency (Nov 18)

Selection rule: **10+ lifetime purchases AND profitable across more than one
calendar month.** Measured month by month, not on calendar windows, because
several candidates sit in paused campaigns and would read as zero.

## Key finding: four of the "winners" are the same ad

These four all carry **identical body copy, identical link, and the same
product set** (`26107768175558888`, Cozy Mystery, 390 products). They are one
creative concept in four different ad sets. Their different results came from
the **bid strategy and budget of the ad set**, not from the creative.

| Ad | Ad set | Purch | Lifetime ROAS |
| --- | --- | --- | --- |
| VARIANT URL Catalog Ad 2 | `$29` target | 172 | 2.07 |
| VARIANT URL Catalog Ad 20 | `$20` target | 40 | 1.89 |
| VARIANT URL Catalog Ad 1 | `$26` target + Shop | 31 | 1.92 |
| Catalog Ad+Shop+Browsing | Catalog 2 | 27 | 1.67 |

Putting more than one of these in the campaign is adding the same ad twice.
Pick the `$29` one: it has 4x the evidence of any other.

## The three to use

### 1. `3.3` - Murder Capital, discount hook
- **Post ID:** `518476831357470_122196922484746577`
- Ad `120255362549930110` / creative `973159632496911` / ad set `S3`
- Copy: "Cozy Mystery Readers - This One's For You / Save 25% For A Limited Time!"
- Lifetime: `$1,143.35` -> 60 purchases, `$2,331.08`, **2.04 ROAS**, CPA `$19.06`

| Month | Spend | Purch | ROAS | CPC |
| --- | --- | --- | --- | --- |
| Sep (from 29th) | `$7.21` | 0 | - | `$0.80` |
| Oct | `$758.59` | 40 | **2.03** | `$0.35` |
| Nov 1-17 | `$377.55` | 20 | **2.10** | `$0.29` |

The only ad in the account **improving** month over month at real volume. ROAS
up, CPC down. Strongest single candidate.

### 2. `3.2` - Murder Capital, voice hook
- **Post ID:** `518476831357470_122200884098746577`
- Ad `120255814697330110` / creative `1704328048030581` / ad set `S3 - Copy`
- Copy: "Nothing to worry about. / Just a charming little town. / You might want
  to update your will, though."
- Lifetime: `$1,481.13` -> 82 purchases, `$3,368.94`, **2.27 ROAS**, CPA `$18.06`

| Month | Spend | Purch | ROAS | CPC |
| --- | --- | --- | --- | --- |
| Oct (from 29th) | `$15.65` | 3 | 12.58 | `$0.40` |
| Nov 1-17 | `$1,465.48` | 80 | **2.19** | `$0.33` |

**Caveat: only one full month of history.** Highest-volume month any ad has had
since August, and holding at 2.19 seventeen days in, but less time-tested than
the raw numbers suggest.

Note this is a **genuinely different hook** from 3.3 - not a duplicate. Same
product, same link, completely different copy. Two working angles, not one.

### 3. `VARIANT URL Catalog Ad 2` - dynamic catalog
- **Post ID:** `518476831357470_122190770546746577`
- Ad `120254655086980110` / creative `1568799374788171` / ad set `$29 target`
- Product set `26107768175558888` (Cozy Mystery, 390 products)
- Lifetime: `$3,851.19` -> 172 purchases, `$7,976.23`, **2.07 ROAS**, CPA `$22.39`

| Month | Spend | Purch | ROAS | CPC | CTR |
| --- | --- | --- | --- | --- | --- |
| Aug 13-31 | `$1,492.63` | 72 | **2.27** | `$0.23` | 3.48% |
| Sep | `$1,749.36` | 79 | **2.08** | `$0.43` | 2.23% |
| Oct | `$609.20` | 21 | 1.57 | `$0.49` | 2.02% |
| Nov | `$0` | - | - | - | - |

The all-time #1 by a wide margin, three consecutive profitable months. **But it
is fatiguing**: ROAS 2.27 -> 2.08 -> 1.57, CPC doubled `$0.23` -> `$0.49`, CTR
cut from 3.48% to 2.02%. Expect it to open nearer 1.6 than 2.3.

**It is currently PAUSED with `effective_status: WITH_ISSUES`.** Find out what
the issue is before copying it.

## Combined evidence behind the three

`$6,475.67` spend -> **314 purchases**, `$13,676.25` revenue, **2.11 blended**.

## Deliberately excluded

| Ad | Purch | Why not |
| --- | --- | --- |
| Catalog Ad 20 / 1 / Catalog 2 | 40 / 31 / 27 | Same creative as #3 |
| Catalog Ad - Retargeting | 24 | Same creative as #3, and a warm audience |
| VARIANT URL Catalog Ad 35 | 20 | Erratic: 1.00 / 2.25 / 0.79 by month |
| VARIANT URL Catalog Ad 3 | 14 | One good month (Sep 1.96), then 0.83 |
| `G2.3` | 16 | Different creative but declining: Oct 2.05 -> Nov 1.50 |

Nothing else in the account has 10+ lifetime purchases.

## Mechanics

- **Catalog ads do have post IDs.** All four catalog creatives returned an
  `effective_object_story_id`. Using the post ID keeps the ad dynamic, since the
  creative carries its own `product_set_id`.
- Copying the post ID preserves accumulated social proof - likes, comments and
  shares keep landing on the same post object. That is the point of doing it
  this way.
- The new ads and the originals share an audience. Meta dedupes ads from one
  account before the auction so they do not literally bid against each other,
  but the new campaign takes volume from the old rather than adding net-new. At
  `$25`/day that is a small effect.

## Budget warning

At a `$18`-`$22` CPA, `$25`/day buys roughly **one purchase per day for the whole
campaign**. Learning exit needs ~50 conversions a week; this would deliver ~7.
The campaign will sit learning-limited indefinitely and its numbers will stay
noisy for weeks.

If this campaign is meant to matter, it needs `$75`-`$150`/day. If `$25` is the
cap, treat it as a social-proof parking spot and judge it on nothing for a month.
