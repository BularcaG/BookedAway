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

## Nov 17 (later) - George's changes, no Claude edits to the account

- **Back Catalog OFF.** Just Released stays on with a raised budget. Reframed
  deliberately as a discovery budget: George accepts a loss here, the job is to
  surface products with `$5`+ spend and sub-`$0.75` CPC to promote into their own
  ads. Claude had recommended cutting all of Discovery on ROAS - wrong lens for
  a discovery budget. Open: set a monthly ceiling, and a harvest cadence.
  Just Released holds 49 products, so the product_id breakdown should be close
  to complete there, unlike the 465-product main catalog.
- **Grid 3 raised `$15` -> `$25`** (not `$18`).
- **Grid 2**: G2.4 and G2.5 off (poor clicks over 4 days), G2.1 left running.
  G2.3 still off; George considering turning it back on.
- **Reader life**: Mystery Loves Company off, one other off. Left running:
  Consume more books (sold recently) and I'm With the Banned.

### Claude's read on those, for when we revisit

- **G2.3: leave off.** Lifetime `$418.55`, 1,460 clicks, **16 purchases**,
  `$26.16` CPA, **1.63 ROAS** - the only Grid 2 ad with a real sample, and it is
  below breakeven. Its 5.12 over 7 days is 2 sales on `$24.78` in its final two
  days. G2.1 is 1.83 lifetime on 3 purchases, not the 3+ the ad set shows (that
  figure is G2.3's residual spend; live ads only Grid 2 is 1.73).
- **I'm With the Banned**: CPC `$0.58` vs account `$0.45`, CTR 2.73% vs 2.14%.
  Mid on both, not "low CPC / high CTR". Letting it reach `$50`-`$75` before
  judging is still right.

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

## Budget tiers (agreed Nov 17)

Replaces percentage laddering at small budgets, where +20% of `$15` is `$3` and
decides nothing.

| Tier | Budget | Rule |
| --- | --- | --- |
| Test | `$15`/day, fixed | No laddering. Hold until 10+ purchases, then promote or kill. |
| Promote | one jump to `$50` | On 10+ purchases at 2.5+. Expect a 3-5 day dip; do not judge inside it. |
| Scale | `$50`+ | +25% every 3 days. Percentages start working once the base is real. |

Gate on **purchase count first, ROAS second**. At `$15`/day a 7-day ROAS is 4-5
data points, which is what misled on Sand, G2.5 and Navy.

George's open concern, which is partly right: a big jump destabilises an ad set
more at a small base than a large one, so `$50` -> `$100` feels safer than
`$12.50` -> `$50`. See the marginal-returns note below.

Why it matters structurally: at a `$22` CPA an ad set needs roughly `$155`/day to
reach the 50 conversions a week that exit learning. `$15`/day gives ~5. Ten ad
sets at `$15` are ten things that cannot learn. S3 - Copy at `$150`/day does 46
purchases a week and holds 2.15 - the only ad set with enough budget to
optimise, and the best performer.

## Sleeper test shortlist (Nov 17)

Ten designs to test as two ad sets of five. Selection rule: real Shopify sales
with almost no ad spend behind them (latent demand), or tiny spend that bought
abnormally cheap clicks (working hook, never funded).

Data: Meta `product_id` breakdown Aug 19 - Nov 17 (four pulls, 1,000-row cap)
joined to Shopify product sales 90d and variant sales 180d. No Clarity tool was
available in the session, so there is no heatmap input in this.

### Ad Set A - latent demand (never advertised)

| Design | Shopify 90d | Ad spend 90d | Colours |
| --- | --- | --- | --- |
| Rolling Ladder Bookshelf | 30 ord / `$979` | `$0.00` | Sand, Light Blue |
| I'm Sure It's Nothing | 20 ord / `$575` | `$0.13` | Black, Dark Chocolate |
| Book Club Gang | 8 ord / `$376` | `$0.00` | Sport Grey, Light Blue |
| Peaceful Village Murder | 10 ord / `$307` | `$0.00` | Sand, Light Blue |
| I've Been Framed | 8 ord / `$243` | `$0.86` | Black, Navy |

Book Club Gang carries the highest AOV in the store at `$46.23` - it sells in
pairs.

### Ad Set B - proven hook (micro-tested)

| Design | Shopify 90d | Spend | CPC | CTR | Colours |
| --- | --- | --- | --- | --- | --- |
| Steeped in Mystery | 13 ord / `$379` | `$5.84` | `$0.34` | 2.77% | Navy |
| Tea, Knitting and Mayhem | 10 ord / `$300` | `$26.44` | `$0.27` | 4.39% | Heather Indigo |
| Cozy Mystery Defined | 8 ord / `$224` | `$3.07` | `$0.19` | 6.72% | Black, Navy |
| Bookish Eye Chart | 8 ord / `$211` | `$2.92` | `$0.22` | 4.18% | Navy, Dark Heather |
| Small Village Warning | 6 ord / `$182` | `$5.36` | `$0.14` | 6.12% | Navy, Dark Heather |

Account baseline at the time: CPC `$0.45`, CTR 2.14%. Small Village Warning
bought clicks 3x cheaper; Cozy Mystery Defined nearly doubled the best-ever
account CTR. Both on under `$6`, so small samples.

### Colour rule found in the variant data

Colour comes from Shopify variant sales, never Meta clicks (Charcoal led every
Meta click metric on Charming Village and had sold one shirt in 90 days).

| Design character | Winning ground | Evidence |
| --- | --- | --- |
| Illustrative / cozy scene | Sand + Light Blue | Rolling Ladder: Sand 14, LB 10 of 33 |
| Text-heavy one-liner | Black + Dark Chocolate | I'm Sure It's Nothing: Black 10, DC 9 of 24 |
| Bold graphic statement | Navy | Steeped in Mystery: Navy 8 of 14 |
| Vintage / heathered | Heather Indigo | Tea Knitting: HI 6 of 10 |

Two have genuinely flat colour data and their colours are assigned by the rule
above, not their own sales - treat as unproven:

- Cozy Mystery Defined: Navy 2 / Black 2 / Military Green 2
- Bookish Eye Chart: Dark Heather 2 / Military Green 2 / Navy 2 / Black 2

Military Green appears twice in each and has never been pushed anywhere. If
either shows life, Military Green is the next variant to add.

### Build notes

- XL, L and 2XL carry nearly all of these. Catalog ads pick a variant image,
  not a size, so check L/XL/2XL are in stock.
- CBO will not split evenly across five products. Meta concentrates on whoever
  bites first, which suits a sleeper hunt, but a dud can absorb the ad set.
  Check the `product_id` breakdown at day 5-7 and prune.
- `$15`/day across five is ~`$3`/day each. At a `$12` CPA the **ad set** reaches
  the 10-purchase threshold in ~10 days; an individual **product** would take
  over a month. So judge the ad set on purchases, and judge products on the
  day 5-7 breakdown prune.

### Not a sleeper - do not put in these ad sets

**Cabot Cove Population Declining**: 33 orders, `$994` in 90 days on `$63.59`
spend, `$0.23` CPC, 3.67% CTR across 278 clicks. Navy 21 of 33, Black 11. That
is a funded-but-starved winner with a real sample. Belongs in Scaling - Winners
with Grid and Murder Capital, not in a `$15`/day test beside four unknowns.

### Caveat to carry forward

The revenue-per-ad-dollar ratios on these products are **not ROAS**. Anything
with `$0`-`$6` of spend earned nearly all its revenue through email, the
collection page and organic browsing. The thesis is "demand exists without paid
push," not "this converts at 70x." Expect first paid numbers well below the
ratio.
