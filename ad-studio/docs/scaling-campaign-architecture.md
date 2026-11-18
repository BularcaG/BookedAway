# SCALING - All Stars: the standing structure (Nov 18)

The permanent home for graduated winners. Everything else in the account is
testing. Winners are **copied in by post ID**; originals are never moved or
deleted.

## Campaign

| Setting | Value | Why |
| --- | --- | --- |
| Objective | Sales (`OUTCOME_SALES`) | Matches every winner |
| Budget | **CBO**, campaign level | One number to ladder |
| Bid strategy | **Highest volume** at launch | See below |
| Start budget | **`$75`/day** | At a `$19` CPA that is ~4 purchases/day |
| Ladder | +25% every 3 days while 30d ROAS >= 2.0 | Matches the agreed Scale tier |

### One ad set. Not a ladder, not one per winner.

In all four bid cap campaigns, **one ad set took 92-96% of the budget**:

| Campaign | Winning ad set | Share of campaign spend |
| --- | --- | --- |
| BID CAP 08/10 | `$26 target` | 95.9% |
| BID CAP 08/13 | `$29 target` | 91.9% |
| BID CAP 09/19 | `$26 target + Shop` | 96.3% |
| BID CAP 08/09 | `$23 target` | 95.3% |

Only two ad sets in account history ever reached learning SUCCESS - `S3 - Copy`
and `$26 target` - and both got there by absorbing nearly a whole campaign's
budget. Splitting budget across ad sets has failed **13 times out of 14**.

### Highest volume, not bid cap, at launch

1 of 14 bid cap ad sets ever worked. A cap binds the moment CPA rises above it
and delivery stalls - the opposite of what the revenue floor should do. Establish
the CPA in this structure first, then consider a **cost cap** (not a bid cap) at
~25-30% above the observed CPA as a guardrail.

## Ad set: `All Stars - US Broad`

Copy `S3 - Copy`'s settings exactly; it is the only learning-SUCCESS ad set
still running.

| Setting | Value |
| --- | --- |
| Geo | US only |
| Age | 18-65 |
| Location types | `frequently_in`, `home`, `recent` |
| Interests | **none** - all winners run no interest targeting |
| Advantage audience | **ON** (`advantage_audience: 1`, `expansion_all`) |
| Placements | All (Advantage+ placements) |
| Optimization | Conversions -> Purchase |
| Pixel | `506614892042719` |
| Attribution | **7-day click, 1-day view** |
| `promoted_object.product_set_id` | **`26107768175558888`** |

Two notes:

- **Attribution matters for comparison.** `S3 - Copy` uses 7d click / 1d view.
  The catalog ad sets add 1d engaged-video-view. Pick one - 7d click / 1d view -
  or the numbers are not comparable to the testing side.
- **The product set ID is required even though single-image ads are in here
  too.** Creative source is per-ad, not per-ad-set, so catalog and single-image
  ads coexist in one ad set - but the catalog ad needs `product_set_id` on the
  ad set's `promoted_object` to deliver.

## Launch roster: 3 ads

Only three distinct creatives clear the bar. Combined: **233 purchases.**

| Slot | Ad | Post ID | Purch | Lifetime | Nov |
| --- | --- | --- | --- | --- | --- |
| 1 | `3.2` Murder Capital, voice hook | `518476831357470_122200884098746577` | 83 | 2.30 | 2.19, CPA `$18.32` |
| 2 | `3.3` Murder Capital, discount hook | `518476831357470_122196922484746577` | 60 | 2.04 | 2.10, CPA `$18.88` |
| 3 | `+SHOP Catalog Ad` dynamic catalog | `518476831357470_122181500744746577` | 90 | 1.72 | 1.84, CPA `$20.25` |

Source locations:

- Slot 1: `Testing Campaign` / `S3 - Copy` / ad `120255814697330110`
- Slot 2: `Testing Campaign` / `S3` / ad `120255362549930110`
- Slot 3: `Cozy Mystery Catalog` / `VARIANT URL All Products Catalog + SHOP + Multi` / ad `120250379695950110`

**Why not the 222- and 97-purchase catalog ads.** They are the *same creative*
as slot 3 - identical copy, identical link, same product set. Slot 3 is the one
still converting. Three copies of one ad means Meta picks one anyway.

## Graduation rule

> **10+ purchases at 2.0+ ROAS in a testing ad set -> copy the post ID into All
> Stars.**

The existing 10-purchase bar, now with a destination. Current bench:

| Ad | Where | Purch | ROAS | Needs |
| --- | --- | --- | --- | --- |
| `Charming village White_Navy` | S5 | 8 | 2.12 | **2 more purchases** |
| `G3.6` | Grid 3 | 6 | 2.41 | **4 more purchases** |
| `G2.3` | Grid 2 | 16 | 1.63 | ROAS, not volume - declining 2.05 -> 1.50 |
| Cabot Cove one-product catalog | not built | 0 | - | 10 purchases |

Charming Navy is two purchases away and G3.6 four away. That is the near-term
pipeline, and it is the reason the Grid 3 prune and the Navy watch matter.

## Eviction rule

Without one the campaign silts up with dead ads - exactly what happened to the
catalog concept in October.

> **Evict when 30-day ROAS falls under 1.8 on 10+ purchases, OR the ad spends
> `$150`+ in 30 days under 1.5.**

**Pause, never delete.** The post keeps its social proof for a later revival.

## The copy-diversity rule

All five catalog ads died in the same month because they share one line:
*"Save 25% For A Limited Time!"*

> **No more than 2 ads in All Stars may share the same primary text.**

Otherwise one offer going stale takes out the whole campaign at once. This is
the single most expensive lesson in the account's history.

## Duplicate-spend trap

Once slots 1 and 2 are live and spending in All Stars, **pause `3.2` in
`S3 - Copy` and `3.3` in `S3`.**

Leave the ad objects in place - history and post intact, nothing moved or
deleted - but paused. Otherwise the two biggest ads each run against a clone on
the same broad US audience, and `S3 - Copy`'s `$150`/day funds a duplicate of
what All Stars is already doing. This is the one place where "leave the
originals alone" costs real money.

## Funding the `$75`/day

| Source | Frees |
| --- | --- |
| Discovery off (0.19 ROAS, `$184`/7d for `$34.86`) | ~`$26`/day |
| `S3 - Copy` `$150` -> `$100` once 3.2 moves | `$50`/day |

That covers it with room. Also worth archiving: the three bid cap and two cost
cap campaigns spent **`$26.66` combined over 7 days for zero purchases**, and
13 of their 14 ad sets never exited learning. They are set to `$125`/day
combined and could start spending unpredictably.

## First read

Do not judge it for **14 days**. At `$75`/day and a `$19` CPA that is ~55
purchases - enough to mean something. Before then the number is noise.
