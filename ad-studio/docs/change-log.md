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

## Scaling campaign: abandoned, and why (Nov 18)

The `Scaling - Winners` draft (`120256023439890110`) no longer exists. The draft
list is empty and the campaign ID returns "not campaign entities in the
requested ad account." Nothing to resume.

**Decision: do not rebuild it.** The reasoning matters more than the decision.

By the 10-purchase rule, exactly one ad in the account is proven:

| Ad | Ad set | 30d purch | 7d purch | 7d ROAS | 7d CPA |
| --- | --- | --- | --- | --- | --- |
| 3.2 | S3 - Copy | 79 | 45 | 2.10 | `$18.81` |

Next best over 30d: Charming Navy 8, 3.1 7, G3.6 6, G3.9 4. All under the bar.

A CBO of "winners" fails both ways:

- **With 3.2 in it**: CBO funds whoever converts first, so 3.2 takes the budget.
  That re-runs the main ad in a second campaign, bidding into its own audience
  and splitting its learning signal. S3 - Copy is the **only ad set at learning
  SUCCESS** in the account. Do not fork it.
- **Without 3.2**: nothing proven is in it. A test ad set with a scaling label.

The real diagnosis: the account is stuck near `$300`/day because it has **one
engine**. A scaling campaign re-spends on the first engine instead of building a
second one.

## Ad set table, 7d (Nov 18)

| Ad set | Budget/day | Spend | Purch | ROAS | CPA | CTR | Learning |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Grid 2 - Murder Capital | `$12.50` | `$102.40` | 7 | **3.13** | **`$14.63`** | 3.65% | FAIL, 12 conv |
| S3 - Copy | `$150` | `$869.27` | 46 | 2.15 | `$18.90` | 2.14% | **SUCCESS** |
| S3 | `$20` | `$140.67` | 7 | 1.83 | `$20.10` | 1.97% | FAIL, 47 conv |
| Grid 3 | `$25` | `$145.51` | 4 | 1.76 | `$36.38` | 3.23% | LEARNING, 4 conv |
| Design Only | `$15` | `$74.56` | 2 | 1.67 | `$37.28` | 2.28% | LEARNING |
| S5 - Charming Village | `$15` | `$103.63` | 3 | 1.61 | `$34.54` | 2.17% | FAIL, 11 conv |
| S3 - Copy Collection page | `$25` | `$159.90` | 5 | 1.11 | `$31.98` | 1.72% | PAUSED |
| Reader life | `$15` | `$99.63` | 3 | 1.09 | `$33.21` | 2.12% | LEARNING |

Account 7d: `$2,183.44` spend -> `$3,838.16` revenue = **1.76 blended ads ROAS**.

## Advice given Nov 18 (George executes)

1. **Grid 2 - Murder Capital `$12.50` -> `$25`.** Best ROAS *and* best CPA in the
   account, on the smallest funded budget. Matches the tier rule (15 and under
   bumps first to 25). This **is** the scaling move; it already exists.
2. **Discovery off or capped to `$10`.** `$184.07` -> `$34.86` over 7d, 0.19
   ROAS, roughly `$26`/day of loss. Funds everything else here.
3. **Grid 3: prune, do not fund.** Grid 3 spent `$145.51` for 4 purchases /
   `$256.53`. G3.6 alone spent `$96.11` for **4 purchases / `$256.53`** -
   identical. The other `$49` produced zero. G3.6 alone is 2.67 ROAS; siblings
   drag the set to 1.76. Pause G3.8/G3.7/G3.10 so G3.6 gets the full `$25`. Do
   not raise the budget until the set's number reflects G3.6.
   Same spend-share trap as ad 3.2 in the Collection page set. Recurring in the
   grid ad sets.
4. **Cabot Cove: build it as a one-product catalog ad set, `$15`/day.** Catalog
   `2180057345773467` (same one the live Cozy Mystery set `26107768175558888`
   uses), product set filtered to Cabot Cove Population Declining only. Its 33
   orders came from catalog delivery, so this concentrates budget on the asset
   that already works - no new creative gamble, no missing post ID. The
   single-image version comes later as a creative test beside it.
   Caveat: a one-product catalog ad loses Meta's product-to-person matching and
   can come in under the broad catalog. It is a test.

Budget math: Discovery off frees ~`$26`/day; Grid 2 takes `$12.50`, Cabot Cove
`$15`. Net -`$1.50`/day, so no increase in total spend.

Deferred: the `$24`/`$28`/`$32` bid cap ABO ladder. The three live bid cap
campaigns spent `$26.66` combined over 7d for **zero purchases** - still priced
out. Worth doing, but after items 1-3.

## Correction to the Nov 17 sleeper note

I wrote "Navy is 21 of its 33 sales, Black is 11" for Cabot Cove Population
Declining as though Navy had won a colour contest. It had not: **the product
only exists in Black and Navy.** 12 catalog variants = 2 colours x 6 sizes, all
in stock and `eligible`.

Navy beating Black 2:1 is still real, but the missed point is the opportunity: a
design with 33 orders and a `$0.23` CPC is offered in only two colourways.
Adding **Dark Chocolate** and **Sand** - the grounds carrying the other proven
designs - is likely worth more than any ad-level change.

Feed checked for a price mismatch (a common silent killer): clean. `$39.99` list
/ `$29.99` sale, matching the store, so Meta shows a visible discount.

## Already built by George (Nov 18)

`Sleeper 1` and `Sleeper 2` ad sets are live at `$15`/day each, `$0` spent.
Leave them to spend; first read at day 5-7 on the `product_id` breakdown.

## Bid cap headroom pattern (Nov 19)

Every bid cap ad set ever run, by lifetime numbers:

| Cap | Campaign | Spend | Purch | CPA | ROAS |
| --- | --- | --- | --- | --- | --- |
| `$26` | 08/10 | `$4,375.89` | **222** | `$19.71` | **2.36** |
| `$29` | 08/13 | `$3,851.24` | **172** | `$22.39` | 2.07 |
| `$26` + Shop | 09/19 | `$758.72` | 31 | `$24.47` | 1.92 |
| `$23` | 08/09 | `$400.77` | **20** | `$20.04` | **2.00** |
| `$25` | 08/10 | `$118.67` | 9 | `$13.19` | 2.58 |
| `$28` | 08/13 | `$236.50` | 8 | `$29.56` | 1.70 |
| `$27`/`$24`/`$26`/`$22`/`$21`/`$20` | various | <`$75` ea | 0-3 | - | noise |

Four caps clear the 10-purchase bar: `$26`, `$29`, `$26`+Shop, `$23`. Three
cleared 2.0 ROAS.

### The finding: headroom predicts ROAS, monotonically

Sorted by the gap between the cap and the CPA actually achieved:

| Cap | CPA achieved | Headroom | ROAS |
| --- | --- | --- | --- |
| `$25` | `$13.19` | **47%** | 2.58 |
| `$26` | `$19.71` | 24% | **2.36** |
| `$29` | `$22.39` | 23% | 2.07 |
| `$23` | `$20.04` | 13% | 2.00 |
| `$26` + Shop | `$24.47` | 6% | 1.92 |
| `$28` | `$29.56` | **-6%** | 1.70 |

No exceptions. When the cap sits tight against what Meta can buy, delivery
scrapes the bottom of what is available at that price and ROAS falls with it.

Note `$28` achieved a CPA **above its own cap** (`$29.56`). A bid cap limits the
bid, not the realised CPA.

### Supersedes the `$24`/`$28`/`$32` ABO ladder

That earlier recommendation predates this audit and should not be used:

- A 3-rung ladder at `$20`/day each reproduces the fragmentation that left 13 of
  14 bid cap ad sets never exiting learning. The one that worked ran
  `$64`-`$73`/day.
- `$32` would never bind against a current achievable CPA of `$15`-`$20`. A cap
  that far above CPA is Highest Volume with extra steps.

### Current recommendation

**One ad set, cap `$26`, `$50`-`$75`/day.** `$26` has 222 purchases behind it and is
the only bid cap ad set that ever exited learning. Current CPAs (Grid 2
`$14.63`, +SHOP `$16.75`, 3.2 `$18.32`) are better than August's, so `$26` gives
more headroom now than it did then.

`$24` is the defensible tighter alternative. **Do not go above `$28`** - it is the
only funded cap that overshot its own ceiling, and `$29`'s 2.07 came with a
`$22.39` CPA.

Sequencing: run this after All Stars has had its 14-day read, not alongside it.

## Consolidated plan (Nov 19)

Detail lives in `scaling-campaign-architecture.md` and the Nov 18/19 entries
above. This is the running order.

### Now

1. **Launch All Stars.** One ad set, 4 ads, CBO `$75`/day, Highest Volume,
   7d click / 1d view, product set `26107768175558888` on the ad set.
   Post IDs verified Nov 19 against the API:
   - `518476831357470_122200884098746577` - 3.2, voice hook
   - `518476831357470_122196922484746577` - 3.3, discount hook
   - `518476831357470_122181500744746577` - +SHOP catalog
   - `518476831357470_122200221446746577` - G3.6, Book Lovers grid
2. **Fund it:** Discovery off (0.19 ROAS, ~`$26`/day), `S3 - Copy` `$150` -> `$100`.
3. **Pause the originals once All Stars spends:** 3.2 in `S3 - Copy`, 3.3 in
   `S3`, +SHOP in `Cozy Mystery Catalog`. Objects stay, just paused.
4. **Grid 2 - Murder Capital `$12.50` -> `$25`.** Best ROAS (3.13) and CPA
   (`$14.63`) in the account on its smallest budget.

### Then: 14 days, no changes

At `$75`/day that is ~55 purchases. Before that the number is noise.

### After the read: the bid cap

One ad set, **`$26` cap, `$50`/day, +SHOP creative only**
(`518476831357470_122181500744746577`). Not the old catalog post
(`518476831357470_122190359684746577`, dead since Oct, `$0.81` in 7 days - a cap
on a dead creative stalls on day one). Not two ad sets. Not a ladder.

Waiting is deliberate: the cap should be set from the CPA All Stars actually
achieves, not August's. `$17` CPA -> `$26` cap; `$22` CPA -> `$28`-`$30`.

### Parked, in order

- Grid 3 prune (G3.8, G3.7, G3.10, G3.1, G3.3 spend with zero purchases)
- Cabot Cove one-product catalog ad set, `$15`/day
- Archive old bid cap / cost cap campaigns (`$26.66`/7d for zero purchases,
  13 of 14 ad sets never learned, `$125`/day combined if they wake)

### Standing risk

Three of the four All Stars carry "Save 25% For A Limited Time!" - the line that
took out five catalog ads at once in October. 3.2 is the only hedge and is also
the highest-volume performer.

**Highest-value creative work for the next two weeks: a second ad with no
discount in the copy**, to separate whether 3.2 wins on the joke or on the
absence of the offer.

## Account review (Nov 19, 7d windows)

Account: `$2,192` -> `$3,936`, **1.80 blended** (up from 1.76 on Nov 18).
**Three ad sets at learning SUCCESS**, up from two.

### What moved since Nov 18

| Ad set | Budget | Nov 18 | Nov 19 | |
| --- | --- | --- | --- | --- |
| **S3** | `$20` | 7 purch, 1.83 | **10 purch, 2.48** | now SUCCESS |
| **+SHOP** (Cozy Mystery) | `$20` | 8 purch, 2.19 | **9 purch, 2.56** | SUCCESS |
| S3 - Copy | `$150` | 46 purch, 2.15 | 49 purch, 2.09 | flat |
| Grid 2 | `$12.50` | 7 purch, **3.13** | 5 purch, 2.17 | down |
| Grid 3 | `$25` | 4 purch, 1.76 | 4 purch, 1.66 | down |
| Reader life | `$15` | 3 purch, 1.09 | 3 purch, 1.00 | down |
| Discovery "Just Released" | `$15` | - | 1 purch, **0.28** | bleeding |

### The starvation problem

| Ad set | ROAS | CPA | Purch | Learning | Budget |
| --- | --- | --- | --- | --- | --- |
| +SHOP | **2.56** | **`$14.55`** | 9 | SUCCESS | ~`$20` |
| S3 | **2.48** | **`$14.28`** | 10 | SUCCESS | `$20` |
| S3 - Copy | 2.09 | `$18.58` | 49 | SUCCESS | `$150` |

`$150`/day on the weakest SUCCESS unit, `$40`/day on the two best. S3 crossed 10
purchases at 2.48 - it passes the graduation bar outright.

### Advised Nov 19 (George executes)

**Off:**
1. Discovery -> "Just Released": `$123.49` for 1 purchase, 0.28 ROAS, `$123` CPA.
   ~`$17.60`/day. Biggest single leak. (Back Catalog and Proven already paused.)
2. Reader life: `$108.58`, 3 purchases, 1.00 ROAS. Every ad inside 1.17-1.21.
   ~`$15.50`/day.

**Scale:**
1. S3 `$20` -> `$50`
2. Cozy Mystery Catalog `$20` -> `$40`
3. Grid 2 `$12.50` -> `$25` (advised Nov 18, still not done)

Funded by the two cuts (`$33`/day) plus S3 - Copy `$150` -> `$120`.

### Two misleading numbers

- **S5 - Charming Village reads 2.10** but all of it is from
  `Charming village black_Sand`, which is **paused**. The live ad, Navy, has
  spent `$10.79` with **zero purchases**. The Navy call has not validated. Same
  paused-ad-in-window quirk logged Nov 17.
- **Grid 3 reads 1.66** but G3.6 alone is **2.39 on `$107.48`** with all 4
  purchases. The drag is G3.4 and G3.2 spend lingering after pausing. Grid 3 is
  now essentially G3.6 and is fine.

### Structural: new ad sets cannot get delivery

Five for five, all created in the last three days:

| New ad set | Budget available 7d | Spent |
| --- | --- | --- |
| Sleeper 1 | ~`$105` | `$5.91` |
| Sleeper 2 | ~`$105` | `$6.06` |
| Scaling Campaign | ~`$75` | `$0.43` |
| Ad Set 17 | ~`$25` | `$0` |
| Ad Set 18 | ~`$25` | `$0` |

Established ads win the auctions; new creative cannot get enough delivery to
prove itself. **The sleeper test has effectively not run** - `Book Club Gang`
and `cozy mystery_Black` have zero impressions, `Small Village Warning` has
three.

Likely the same auction-dedupe mechanism as the Scaling Campaign clones
(1,270:1 against them). Not certain, but five-for-five is a pattern. Taking
`$33`/day of established delivery off the board should give new ad sets room.

Solve this before launching anything else new, or the next test repeats it.

`Ad Set 17` and `Ad Set 18` (`$12.50`/day each, `$0` spent) are George's; contents
unknown here.

## Nov 19 day review

**Profitable day, confirmed against Shopify.**

| | Meta | Shopify | Gap |
| --- | --- | --- | --- |
| Purchases | 15 | **20** | **-25%** |
| Revenue | `$808.33` | **`$1,000.63`** | -19% |
| ROAS on `$450.29` spend | 1.80 | **2.22** | -0.42 |

Wider under-report than the -16% logged Nov 11. **Every Meta ad-set ROAS is
understated by roughly 20%**, so break-even in Meta's numbers sits near 1.45,
not 1.8. Use that when judging ad sets.

**Spend `$450.29`, up ~44% from the ~`$313`/day prior average.**

### Standouts

**`Almost Idyllic_Sand`** (Ad Set 17) - the find of the day:
`$10.47` -> 2 purchases, `$126.83`, **12.11 ROAS, `$5.24` CPA**, CTR 3.70%.
Produced all of Ad Set 17's results on 60% of its budget. `$63.42` per order -
multi-item baskets. Two purchases is noise; watchlist, do not scale yet.

**S3 at `$40` - the raise worked with no dip:** `$50.73` -> 4 purchases,
**3.91 ROAS, `$12.68` CPA**, CTR 2.95%. The Nov 18 zero day was noise, exactly
as its CPC (`$0.27`, best of 8 days) and CTR (2.90%, highest) indicated.

**S5 - Charming Village:** `$19.05` -> 1 purchase at **`$119.96`**. 6.30 ROAS.
**Grid 3:** `$26.84` -> 2 purchases, 2.37, `$13.42` CPA, CTR 3.88%. Recovered
after the prune.

### Problems

1. **S3 - Copy worst day:** `$156.78` -> 5 purchases, **1.69 ROAS, `$31.36`
   CPA**, CTR down to **1.71%** from 2.1-2.3%, CPC up to `$0.58`. 35% of daily
   spend. CTR falling *and* CPC rising together is the decay signature, not the
   noise signature. Watch closely.
2. **Discovery "Just Released" still running:** `$17.85`, 0 purchases,
   **CPC `$1.98`** - 4-6x everything else. Flagged four times now.
3. **Grid 2 still at `$12.50`** with the **highest CTR in the account (4.07%)**.
   Flagged four times.

### The sleeper test is still not testing the sleepers

Delivery resolved once the Scaling Campaign was paused, but inside each ad set
one ad takes everything:

| Ad set | Ad taking the budget | Spend | Share |
| --- | --- | --- | --- |
| Sleeper 1 | `cozy mystery_Black` (now paused) | `$17.21` | **100%** |
| Sleeper 2 | `I read past my bedtime dark_Black` | `$17.64` | 97% |
| Ad Set 18 | `Bookmarks Are for Quitters_Black` | `$15.21` | 88% |

The shortlisted designs - **Rolling Ladder Bookshelf, Book Club Gang, Steeped in
Mystery, Small Village Warning, Tea Knitting, Peaceful Village Murder, I've Been
Framed** - all sit at **`$0` spent, 0-1 impressions**.

~`$35`/day is buying a test of two ads that were never on the shortlist, neither
of which converted. To read the actual sleepers they need ad sets where they
cannot be crowded out: far fewer ads per ad set, or one each.

### AOV recovery

**`$46.14`** on Nov 19, against `$39.40` during the squeeze and `$44.61` before
it. If it holds, CPA tolerance rises meaningfully above the `$18`-`$22` the
plans assume.

### Also live

- `Scaling Campaign` is CAMPAIGN_PAUSED - closed as advised.
- `Ad Set 19 Cabot Cove` built: `$9.26` over 3 ads, 0 purchases, too early.
- `Bid Cap 11/19` `$26`: `$3.97`, **CPC `$0.33`**, CTR 3.21%, 374 impressions,
  0 purchases. Spending but far under budget. Day 2 - check again ~Nov 22; if
  still under ~`$15`/day, raise the cap to `$28`-`$30`, do not kill it.

## Account review (Nov 21): multi-window

| Window | Meta spend | Meta ROAS | Shopify orders | Shopify rev | **Real ROAS** |
| --- | --- | --- | --- | --- | --- |
| 7d (14-20) | `$2,595` | 1.68 | 125 | `$5,425` | **2.09** |
| 3d (18-20) | `$1,257` | 1.86 | 65 | `$2,970` | **2.36** |
| Today (partial) | `$114` | 3.73 | 9 | `$535` | **4.71** |

**Trending up.** Daily revenue ~`$614`/day (Nov 14-17) -> ~`$990`/day
(Nov 18-20), **+61%**. Orders 12-18/day -> 20-24/day.

Tracking gap steady at **-18% orders, -20% revenue**. Break-even in Meta's
numbers ~1.45.

### Cut list - `$78`/day producing nothing

| Ad set | 7d spend | 7d purch | 7d ROAS | Last 3d |
| --- | --- | --- | --- | --- |
| Just Released (Discovery) | `$118.11` | **0** | - | `$50.93`, 0, CPC `$1.24` |
| Reader life | `$113.43` | 2 | 0.61 | `$44.27`, 1, 0.79 |
| Retargeting | `$103.46` | 2 | 1.00 | `$43.36`, 1, 0.80 |
| Design Only | `$101.03` | 3 | 0.92 | `$38.42`, 1, 0.91 |
| Sleeper 2 | `$58.29` | **0** | - | `$52.23`, **0** |
| Sleeper 1 | `$50.89` | **0** | - | `$44.98`, **0** |

`$545`/7d -> 7 purchases. ~1.0 even grossed up for tracking. Three have produced
**zero purchases in a week**. Sleepers: `$109` spent, zero purchases, still not
testing the shortlisted designs.

### Scale

**Grid 2 still `$12.50`** - flagged every session since Nov 18:

| | 7d | 3d |
| --- | --- | --- |
| ROAS | 2.60 | **3.42** |
| CPA | `$14.81` | **`$13.30`** |
| CTR | 3.39% | 3.66% |

**S3 at `$40` proves scaling works here:** 7d 3.09 / `$12.78`; 3d **3.36 /
`$12.40`**; today 5.64. Doubled on the 20th and got *better* - no dip at all.
Earned the next rung: **`$40` -> `$50`**.

### Correction: the S3 - Copy decay call was wrong

Called decay Nov 19 off a single 1.69 day. It recovered:

| | 7d | 3d |
| --- | --- | --- |
| ROAS | 2.03 | **2.41** |
| CPA | `$19.91` | **`$17.30`** |

Should have applied the own-rule (one day is noise) instead of reacting on the
account's biggest ad set. CTR *is* still drifting - 2.05% (7d) -> 1.90% (3d) ->
1.46% (today) - so keep watching that specifically, but leave the budget alone.

### New problem: +SHOP catalog has stopped converting

| | 7d | 3d |
| --- | --- | --- |
| Spend | `$134.44` | `$61.65` |
| Purchases | 4 | **0** |
| ROAS | 0.99 | - |

Was the best unit in the account two days ago (2.56, `$14.55` CPA). Now three
days at zero on `$62`. Same shape as the October catalog collapse. **One more
zero day = five days = done.**

### Bid cap is priced out - raise to `$28`

`Bid Cap 11/19` `$26`: **`$10.39` over 7 days** on `$50`/day (~`$1.50`/day).
CPC `$0.47`, CTR 2.53% both healthy - it just is not winning auctions. Textbook
priced-out: raise, do not kill.

Corroborating: the old **`$28 target`** did `$17.96` -> **2 purchases at `$8.98`
CPA** this week, `$9.21` -> 2 purchases in the last 3 days. `$28` is finding
what `$26` cannot.

### Also

- **AOV climbing:** `$34` (Nov 14-15) -> `$43`-`$46` (Nov 18-19) -> **`$55.63`
  today**. Nov 20 dipped to `$35.74`, so noisy, but the direction widens CPA
  tolerance.
- **Ad Set 17 / `Almost Idyllic`**: both purchases were Nov 19, nothing in the
  three days since. The 12.11 was a one-off. Leave running, do not act.

## Cadence change (Nov 21): daily / intraday for Black Friday week

George is moving to day-to-day and sometimes 2-3 changes per day through BF.
Demand started ramping ~Nov 18. Standing format from here:

**Each check pulls:** yesterday full day by ad set, today's partial, Shopify
daily for the real number, 7d for context. Meta under-reports ~20%, so always
reconcile against Shopify.

**Scale triggers (BF week):**
- 3+ purchases yesterday at 3.0+ real ROAS -> +50-100% that morning
- Spending at or near cap -> raise regardless, volume is being left behind
- Afternoon re-check: pacing at or above yesterday's ROAS -> another +25-30%

**Kill trigger (tighter than normal):** zero purchases on `$25`+ over 48h ->
pause. Opportunity cost during BF outweighs the usual patience.

**Post-BF warning:** fast scaling works now because rising demand masks the
usual post-raise dip. When demand drops the elevated budgets remain. **Diarise
~Dec 2 to walk everything back to what its ROAS then justifies.**

## Nov 19-21 daily

| | Spend | Meta purch | Shopify orders | Shopify rev | **Real ROAS** |
| --- | --- | --- | --- | --- | --- |
| Nov 19 | `$450.29` | 15 | 20 | `$1,000.63` | **2.22** |
| Nov 20 | `$378.71` | 17 | 24 | `$969.75` | **2.56** |
| Nov 21 (to ~10am) | `$117.02` | 8 | 9 | `$534.73` | **4.57** |
| 7d context | `$2,595` | 103 | 125 | `$5,425` | 2.09 |

Spent `$72` *less* on the 20th than the 19th and held revenue - efficiency
improving, not just volume.

### S3 is the scale candidate

| | Spend | Purch | ROAS | CPA |
| --- | --- | --- | --- | --- |
| Nov 19 | `$50.73` | 4 | 3.91 | `$12.68` |
| Nov 20 | `$38.71` | 5 | **4.55** | `$7.74` |
| Nov 21 | `$13.19` | 2 | 5.44 | `$6.60` |

On a `$40` budget, spending `$38`-`$50` - not even hitting its cap.
**Advised `$40` -> `$80`.**

### Grid 2 Nov 20: `$11.47` -> 3 purchases, **11.91 ROAS**, CTR 4.13%

Still `$12.50`. **Advised `$12.50` -> `$30`.**

### S3 - Copy recovered: 1.69 -> 2.12 -> **7.59**

Confirms the Nov 19 decay call was wrong. But **CTR keeps sliding: 1.70% ->
1.86% -> 1.53%**. Revenue fine, attention is not. Watch, do not cut.

### Retargeting woke up - reversing yesterday's cut advice

`$5.72` -> **2 purchases, 17.43 ROAS, CTR 3.46%** today after two days at zero.
Almost certainly the email George sent landing. **Keep it on.**

### Cut list: `$210` over three days for zero purchases

| Ad set | 3d spend | Purchases |
| --- | --- | --- |
| +SHOP catalog | `$45.95` | **0** |
| Just Released | `$38.10` | **0** |
| Sleeper 2 | `$37.67` | **0** |
| Sleeper 1 | `$32.05` | **0** |
| Cabot Cove | `$28.81` | **0** |
| Design Only | `$27.40` | **0** |

~`$70`/day during the best demand window of the year. **+SHOP is confirmed dead**
- fifth zero day after being the account's best unit on Nov 19.

### Data quirk worth remembering

`filtering` on `amount_spent` combined with `time_increment` corrupts the daily
rows - big ad sets came back as `$0` on days they spent hundreds. **Use
`object_ids` instead of `filtering` whenever pulling a daily breakdown.** Same
class of bug as `sort` being silently ignored (logged Nov 18).

## Nov 21 (afternoon): George's changes + funnel analysis

### Changes George made

- **Cut:** Sleeper 1, Sleeper 2, Design Only, Ad Set 19 Cabot Cove (~`$60`/day)
- **S3 `$40` -> `$80`**
- **Kept +SHOP** - his main catalog, discovery function, 17 add-to-carts
- **Kept Just Released** - watching whether new designs get attention, small budget
- **Kept Retargeting** - low-hanging fruit, may build a second one
- **Grid 2 held at `$12.50`** - correctly noting the 11.91 came from a single day
  with 3 purchases. Applying the one-day rule; right call.

Net budget: -`$60` cut, +`$40` to S3 = **~`$20`/day headroom unused.**

### Funnel by ad set, Nov 19-21 - the key table

| Ad set | Spend | ATC | Checkout | Purch | ATC->Purch | Cost/ATC |
| --- | --- | --- | --- | --- | --- | --- |
| S3 | `$103.74` | 25 | 17 | 11 | **44%** | `$4.15` |
| S3 - Copy | `$340.54` | 43 | 24 | 17 | **40%** | `$7.92` |
| Retargeting | `$36.89` | 4 | 3 | 2 | 50% | `$9.22` |
| Ad Set 17 | `$31.50` | 7 | 4 | 2 | 29% | `$4.50` |
| `$28 target` | `$11.31` | 7 | 3 | 2 | 29% | **`$1.62`** |
| S5 | `$39.73` | 7 | 2 | 1 | 14% | `$5.68` |
| **+SHOP** | `$46.14` | **17** | **6** | **0** | **0%** | **`$2.71`** |
| Grid 3 | `$59.61` | 2 | 1 | 2 | - | **`$29.81`** |
| Just Released | `$38.84` | **1** | 0 | 0 | - | **`$38.84`** |

### CORRECTION: +SHOP is not dead - its checkout is broken

Second-cheapest add-to-carts in the account (`$2.71`) and **zero** conversions.
**17 ATC -> 6 initiated checkouts -> 0 purchases.** Every other ad set converts
50-71% of initiated checkouts; this one converts **0 of 6**.

Not a creative or audience problem. Something breaks at checkout. Leading
suspect: it is the only ad set using the **Facebook Shop destination**.

**Action: George to tap his own +SHOP ad, add to cart, attempt purchase.** If it
breaks he has been paying `$15`-`$20`/day for traffic that cannot convert, right
before BF.

I was wrong to group this with the dead ad sets on Nov 20-21. George's instinct
to keep it was correct.

### But Just Released is a different case

`$38.84` -> **1 ATC**, 0 checkouts, 0 purchases. `$38.84` per add-to-cart.
+SHOP finds interest; Just Released finds nothing. Three days as a discovery
catalog produced one cart click. **Give it until Monday, then cut.**

### Grid 3 is now the weakest funded ad set

CTR 3.30% (healthy) but **`$29.81` per ATC** and **1.07 ROAS** on `$25`/day -
double Grid 2's budget. People click and do not want the product. This is the
budget Grid 2 could use.

### `$28` bid cap keeps showing up

`$1.62` per ATC - cheapest in the account - converting at 29% on `$11.31`.
Second independent signal for `$28`. Strengthens the case for taking
`Bid Cap 11/19` from `$26` -> `$28`.

### Bid cap raised (Nov 21)

`Bid Cap 11/19` ad set `$26` -> **`$28`**. Edited in place rather than rebuilt -
0 conversions and `$13.60` lifetime spend meant no learning state to protect.

Prior state: ~`$4.50`/day on a `$50`/day budget, 0 ATC, 0 purchases, CPC
`$0.52`, CTR 2.54%.

**Read it at 48h (Nov 23):**
- Spend climbs above ~`$15`/day -> it was priced out, let it run
- Still under ~`$15`/day -> the cap is not the problem, the **creative** is.
  Swap the ad to the +SHOP post `518476831357470_122181500744746577` to inherit
  90 purchases of social proof instead of a fresh post with none.

Supporting the second path: the old `$28 target` runs the *established* catalog
creative and gets ATCs at `$1.62` converting at 29% - same cap, proven creative,
works fine. The new ad set's problem is most likely zero social proof.

## Open watch list (as of Nov 21 evening)

1. **+SHOP checkout test** - George to buy from his own ad. 17 ATC / 6 checkouts
   / 0 purchases. Highest priority.
2. **S3 at `$80`** - raised from `$40` today after 3 days at 3.9+. Did it hold?
3. **Grid 2 at `$12.50`** - held deliberately; a second producing day is the
   trigger to raise.
4. **Bid cap `$28`** - read Nov 23 per above.
5. **Just Released** - cut Monday unless ATCs start (1 ATC in 3 days).
6. **Grid 3** - weakest funded ad set: `$29.81`/ATC, 1.07 ROAS, on `$25`/day.
7. **~`$20`/day headroom** still unallocated after the cuts.
8. **S3 - Copy CTR sliding** - 1.70% -> 1.86% -> 1.53%. Revenue fine. Watch only.
9. **~Dec 2** - walk elevated budgets back once BF demand stops masking dips.

## Nov 23-24: best day of the run, and three cut calls retracted

| Date | Meta spend | Shopify orders | Shopify rev | **Real ROAS** | AOV |
| --- | --- | --- | --- | --- | --- |
| Nov 20 | `$379` | 24 | `$969.75` | 2.56 | `$35.74` |
| Nov 21 | `$367` | 23 | `$1,098.29` | 2.99 | `$43.52` |
| Nov 22 | `$490` | 23 | `$891.67` | **1.82** | `$34.16` |
| **Nov 23** | **`$399`** | **27** | **`$1,213.34`** | **3.04** | `$40.79` |
| Nov 24 (partial) | `$135` | 8 | `$367.15` | 2.72 | `$42.24` |

**George's refusal to judge on Nov 22 was correct.** It bounced to the best day
of the run on lower spend. Nov 22 also revised up (`$856.81` -> `$891.67`) as
late attributions landed - a second reason not to judge a day the morning after.

### George's changes

- Created `Ad Set 20 Black Friday` (4 ads to test) and `Bid Cap 11/23`
  (`$28` cap, best ad, `$50`/day)
- **S3 - Copy `$150` -> `$180`**, **S3 `$80` -> `$120`** (both ~3 ROAS)
- Kept the `$28` bid cap rather than cutting it
- Started a site-wide sale

### Budget bumps justified, but both are delivery-constrained

Nov 23, before the raise: S3 - Copy **3.09** on `$135.69` of a `$150` budget;
S3 **3.05** on `$86.64` of `$120`. **Neither was hitting its cap**, so the raise
to `$180`/`$120` will not force more spend by itself. Do not read a flat result
as the raise failing. **No further raise to S3 until it actually uses `$120`.**

### George was right on the bid cap

| | Spend | Purch | ROAS |
| --- | --- | --- | --- |
| Nov 21 | `$64.34` | 3 | 1.57 |
| Nov 22 | `$43.80` | 1 | **0.66** |
| Nov 23 | `$38.90` | 3 | **3.64** |

3 days: `$147`, 7 purchases, 1.85 and climbing. I would have cut it on the 0.66.

### Standout: `Ad Set 20 Black Friday`

| | Spend | ATC | Purch | ROAS | CTR |
| --- | --- | --- | --- | --- | --- |
| Nov 23 | `$8.59` | 1 | 0 | - | **6.96%** |
| Nov 24 | `$5.73` | 1 | 1 | **6.61** | **5.21%** |

**5-7% CTR against an account average of 2-3%** - best attention signal seen in
this account. On `$12.50`/day. **Advised `$12.50` -> `$25`.**

### RETRACTION: the Just Released / Reader life / Grid 3 cut calls were wrong

All three produced on Nov 23:

| | Spend | ATC | Purch | ROAS |
| --- | --- | --- | --- | --- |
| Grid 3 | `$7.06` | 3 | 1 | **10.20** |
| Reader life | `$5.87` | 4 | 1 | **5.94** |
| Just Released | `$0` (Nov 24) | **7** | 1 (`$72`) | delayed attribution |

**Just Released converts on a lag** - zero spend Nov 24 but 7 ATCs and a `$72`
purchase attributed from earlier clicks. Same-day numbers were the wrong lens.

**Those cut calls were made on pre-BF economics.** Rising demand lifted ad sets
that looked dead. **Hold all three.**

Lesson to carry: during a demand ramp, raise the bar for cutting, not lower it.
A dead-looking ad set in a rising market may just be lagging.

### Current calls

- **Cut:** Ad Set 17 (`$12.65`, 0 ATC, 0 purch) and Ad Set 18 (`$3.53`, 0, 0).
  The only two with genuinely nothing on Nov 23.
- **Bump:** `Ad Set 20 Black Friday` `$12.50` -> `$25`.
- **Hold:** everything else, including the three retracted above.
- **Watch:** `Bid Cap 11/23` has spent **`$2.03` over two days** on a `$50`
  budget - the same priced-out pattern the last one started with. If still at
  `$1`-`$2`/day tomorrow, raise the cap or it idles all week.

## Nov 22-26: the ceiling, and two failed raises

### The headline finding: revenue is flat at ~`$1,100`/day regardless of spend

| Date | Spend | Orders | Revenue | **Real ROAS** | **Blended CPA** |
| --- | --- | --- | --- | --- | --- |
| Nov 21 | `$367` | 23 | `$1,098` | 2.99 | `$15.96` |
| Nov 22 | `$490` | 23 | `$892` | 1.82 | `$21.30` |
| **Nov 23** | **`$399`** | **27** | **`$1,213`** | **3.04** | **`$14.78`** |
| Nov 24 | `$454` | 26 | `$1,056` | 2.33 | `$17.46` |
| **Nov 25** | **`$601`** | 25 | `$1,122` | **1.87** | **`$24.04`** |

Spend rose 64% (`$367` -> `$601`). Revenue did not move. Versus Nov 23, Nov 25
spent **`$202` more and made `$91` less**, and blended CPA went above the 90-day
average of `$21.27` for the first time this week.

**Current ceiling is around `$400`/day.** Past that the extra money reaches the
same buyers more expensively.

### Both Nov 24 raises failed

**S3 `$120` -> `$200`:**

| | Budget | Spend | Purch | ROAS | CPA |
| --- | --- | --- | --- | --- | --- |
| Nov 24 | `$120` | `$120.52` | **9** | **3.30** | **`$13.39`** |
| Nov 25 | `$200` | `$219.18` | 7 | **1.59** | **`$31.31`** |

An extra `$99` bought **two fewer purchases**.

**Ad Set 20 `$35` -> `$100`:** `$63.64` spent, 1 ATC, **zero purchases**. At
`$35` it was doing 3 purchases at an `$8.22` CPA. The raise reset learning to 0
conversions and it never recovered - two days, `$85`, nothing.

### THE RULE (learned the expensive way)

> **Raise a budget only when the ad set is hitting its cap.**
> Not hitting the cap means budget is not the constraint - delivery is - so a
> raise buys nothing and costs the learning reset.

Nov 24 evidence: S3 spent `$120.52` of `$120` (capped -> raise justified).
Ad Set 20 spent `$24.67` of `$35` (not capped -> raise was wrong).

**Corollary:** keep raises **under ~20-25%** to stay below the significant-edit
threshold that resets learning. This is why the agreed tier rule is "+25% every
3 days" - it was always a reset-avoidance rule, not just a pacing one.

### Cheapest acquisition is in the smallest ad sets

Nov 25:

| | Budget | Spend | Purch | ROAS | **CPA** |
| --- | --- | --- | --- | --- | --- |
| Retargeting | `$15` | `$14.34` | 2 | **8.91** | **`$7.17`** |
| Grid 2 | `$25` | `$27.43` | 3 | **3.38** | **`$9.14`** |
| S3 - Copy | `$180` | `$197.06` | 10 | 2.18 | `$19.71` |
| S3 | `$200` | `$219.18` | 7 | 1.59 | `$31.31` |

Both small ones at or over cap at a third of S3's cost per purchase.

### 90-day benchmarks (Aug 27 - Nov 24)

Ad spend `$22,865.69`. Meta: 938 purchases, `$41,169`, 1.80 ROAS, `$24.38` CPA.
Shopify: **1,075 orders, `$47,053`, 2.06 real ROAS, `$21.27` blended CPA.**
Meta misses **12.7%** of orders over 90 days (wider, ~18-20%, on recent days).

Supporting: AOV `$39.59` · CPC `$0.43` · CTR 2.43% · cost per ATC `$6.29` ·
clicks->order **2.03%** · ATC->order **29.6%** · ~50 clicks and ~3.4 ATCs per
order.

### Other resolved items

- **Just Released passed its ATC test** (threshold was 3+, it got **7** plus a
  purchase at 7.03 on `$10.24`). It converts on a **lag** - same-day numbers
  hid it. The earlier cut call was wrong. Keep.
- **+SHOP paused deliberately** by George, not accidentally. Its lifetime
  ATC->purchase was a normal **22.2%**, so the recent 17 ATC / 0 purchases is a
  *recent* break, consistent with his theory that Facebook changed how Shop
  sends traffic to the site. Revisit in December.
- **Catalog reignition was the right call.** `VARIANT URL All Products Catalog`
  beats +SHOP on every lifetime metric: 97 vs 91 purchases, `$4,581` vs `$3,560`
  revenue, **2.28 vs 1.64 ROAS**, `$20.74` vs `$23.87` CPA, `$0.34` vs `$0.46`
  CPC, 3.68% vs 2.49% CTR - on `$160` less spend.
- **Catalog CBO is starving all three** reignited ad sets (~`$13`/day total
  across them). Either raise that campaign's budget or narrow to VARIANT URL.
- **`Bid Cap 11/23` is dead at `$28`** - four days, ~`$4.37` on a `$50` budget.
  Turn off and revisit in December.
- **Ad Set 17 and 18 cut** (Nov 23).

### Changes made Nov 26

- **S3 `$200` -> `$150`**
- **Ad Set 20 Black Friday `$100` -> `$50`**

Pending suggestions not yet actioned: Grid 2 `$25` -> `$31`, Retargeting `$15`
-> `$19` (both capped, both single-digit CPA, both sized to stay under the
reset threshold).

## Nov 27 (Black Friday) - morning check, 9:11am Chicago

Account timezone is **America/Chicago**. All pacing below is at 38% through the day.

### Nov 26 was the week's worst day

`$511.56` spend · 23 orders · `$918.57` · **1.80 real ROAS** · **`$22.24` CPA**.
Both below the 90-day benchmarks (2.06 / `$21.27`). The budget cuts made that
evening came too late to change the day.

### Nov 27 opened strong

`$83.37` spend · 11 orders · `$424.09` · **5.17 real ROAS** · **`$7.46` CPA** -
about a third of normal acquisition cost. Meta showed 8 purchases / `$317.51`,
missing **27%**.

**Black Friday CPMs landed as expected:** `$19.84` vs ~`$11.70` on Nov 26
(+70%). CPC `$0.73` vs the `$0.43` 90-day average (+70%). But CTR rose too
(2.71% vs 2.43%) and conversion carried the day. Paying more per click, getting
more per click.

### Nothing was capping

| Ad set | Budget | Spent | % used |
| --- | --- | --- | --- |
| BF MC2 | `$15` | `$5.44` | 36% |
| BF Mix | `$25` | `$8.67` | 35% |
| Ad Set 20 BF | `$50` | `$12.82` | 26% |
| BF MC1 | `$25` | `$6.03` | 24% |
| BF Frame | `$25` | `$5.16` | 21% |
| Retargeting | `$15` | `$2.54` | 17% |
| BF Grids | `$25` | `$3.43` | 14% |
| Grid 2 | `$25` | `$3.30` | 13% |
| **S3** | `$150` | `$14.38` | **10%** |
| **S3 - Copy** | `$180` | `$13.57` | **8%** |

S3 and S3 - Copy hold `$330` of the `$535` ABO total and spent `$27.95` between
them. Account-wide: 12.7% of budget at 38% of the clock. **Per THE RULE, no
raise was justified** - delivery, not budget, was the constraint.

### Today's early winners

| Ad set | Spent | Purch | ROAS | CPC | CTR |
| --- | --- | --- | --- | --- | --- |
| **BF MC1** | `$6.03` | **2** | **16.54** | `$0.55` | **5.39%** |
| Retargeting | `$2.54` | 1 | 14.91 | `$0.64` | 4.26% |
| Cozy Mystery Catalog | `$2.80` | 1 | 12.45 | `$0.93` | 1.89% |
| Grid 2 | `$3.30` | 1 | 10.56 | `$0.66` | 4.31% |
| S3 | `$14.38` | 2 | 5.24 | `$0.44` | 2.82% |
| BF Mix | `$8.67` | 1 | 4.02 | `$1.45` | 2.97% |

**BF MC1** is the best new ad set in weeks: `$3.02` CPA, 2 of 2 checkouts
converted. **BF MC2** holds the account's highest CTR (5.66%) at a `$0.60` CPC
with no purchase yet - a working hook, needs room. The catalog reignition is
confirmed paying at 12.45 ROAS.

### `Bid Cap 11/19` ($28) is settled - cut it

| | Spend | Purch | Revenue | ROAS |
| --- | --- | --- | --- | --- |
| Nov 26 | `$44.11` | 1 | `$28.87` | **0.65** |
| Nov 27 | `$3.38` | 0 | - | - |

`$47.49` spent for `$28.87` back. The `$26` -> `$28` raise on Nov 25 did unlock
delivery, which proved the cap was binding - **and the delivery loses money.**
Final answer on that ad set: the cap was never the problem, the ad was.

### THE RULE, second half

> The ~25% ceiling protects **established** ad sets (S3, S3 - Copy, Grid 2,
> Retargeting) that hold accumulated learning. On a **brand-new ad set still in
> early learning** (1-2 lifetime conversions), double the budget freely - there
> is no learning to destroy.

Derived from George raising BF Grids, BF Mix and BF MC1 from `$12.50` to `$25`
(+100%). Normally a reset risk; here it cost nothing, because all three were at
1-2 conversions and already in LEARNING.

### Changes Nov 27

- **BF Grids `$12.50` -> `$25`**
- **BF Mix `$12.50` -> `$25`**
- **BF MC1 `$12.50` -> `$25`**
- BF MC2 at `$15`, BF Frame at `$25` (both new, unchanged today)

### Watch list for the rest of the day

- **BF Frame** - `$15.62` over two days, **zero purchases, `$2.58` CPC** (3.5x
  the account average). Creative isn't earning the click. Cut if no ATC by noon.
- **BF Grids** - 3 ATCs, 0 purchases, `$1.72` CPC. Give it the day.
- **6-8pm Chicago is the decision point.** US Black Friday peaks in the evening;
  that is when caps hit and when a raise actually buys volume.

### Nov 27 intraday - the morning number was inflated

Two snapshots of the same day, 9:11am and 3:34pm Chicago:

| Window | Spend | Orders | Revenue | **Real ROAS** | **CPA** |
| --- | --- | --- | --- | --- | --- |
| Morning (to 9:11am) | `$83.37` | 11 | `$424.09` | **5.09** | **`$7.58`** |
| Afternoon (9:11am-3:34pm) | `$213.77` | 16 | `$560.12` | **2.62** | **`$13.36`** |
| Cumulative to 3:34pm | `$297.14` | 27 | `$984.21` | 3.31 | `$11.01` |

**Lesson for next year: a morning intraday ROAS reads roughly 2x the day's
true rate.** Early orders carry attribution from the previous day's clicks, and
morning auction prices are cheaper. The afternoon window (2.62) is the honest
number; the cumulative figure stays inflated until late evening.

Meta under-reported **41%** today (16 of 27 orders) - far wider than the 12.7%
90-day average, as expected on a high-volume day.

### The one-ad-carries-the-ad-set pattern

Ad-level pull at 3:34pm found **five ads with `$51.95` spent, zero purchases,
and in four cases zero add-to-carts** - each with a sibling in the SAME ad set
converting on less money:

| Ad set | Dead ad | Spend | ATC | CPC | Sibling |
| --- | --- | --- | --- | --- | --- |
| Ad Set 20 BF | `1` | `$12.76` | 0 | `$2.13` | `2` -> 1 purch, 2.33, 6 ATC |
| Grid 2 | `G2.1` | `$10.81` | 0 | `$1.08` | `G2.2` -> 1 purch on `$0.54` |
| BF Grids | `02-06-black-friday` | `$10.72` | 3 | `$1.53` | `02-38_final` -> 1 purch on `$2.56` |
| S3 - Copy | `3.3` | `$9.11` | 0 | `$0.65` | dedupe loss to S3's `3.3` |
| BF Frame | `Black Friday Frame` | `$8.55` | 0 | `$1.43` | `...Frame Clean` -> **6.26 ROAS** on `$6.05` |

17% of the day's spend producing nothing. This confirms George's instinct from
Nov 24 ("there is a ad that is doing better but i think there is another that is
spending most").

**`S3 - Copy`'s `3.3` is auction dedupe again** - same creative as S3's `3.3`,
which took `$69.28` and 4 purchases while the copy took `$9.11` and none. Same
mechanism as the All Stars clones (1,270:1).

**Turning off one ad inside a multi-ad ad set is not a significant edit** and
does not reset the ad set's learning. Safe at any time.

### Ad set standings at 3:34pm

| Ad set | Budget | Spend | % | Purch | ROAS | CPA |
| --- | --- | --- | --- | --- | --- | --- |
| **BF MC1** | `$25` | `$17.33` | 69% | 2 | **5.75** | **`$8.67`** |
| Catalog +SHOP | - | `$10.38` | - | 1 | 3.36 | `$10.38` |
| Grid 2 | `$25` | `$11.35` | 45% | 1 | 3.07 | `$11.35` |
| **BF MC2** | `$15` | `$13.19` | **88%** | 1 | 2.64 | `$13.19` |
| BF Frame | `$25` | `$14.60` | 58% | 1 | 2.59 | `$14.60` |
| Retargeting | `$25` | `$14.82` | 59% | 1 | 2.55 | `$14.82` |
| BF Grids | `$25` | `$14.06` | 56% | 1 | 2.27 | `$14.06` |
| BF Mix | `$25` | `$17.49` | 70% | 1 | 1.99 | `$17.49` |
| S3 | `$150` | `$71.69` | 48% | 4 | 1.96 | `$17.92` |
| Ad Set 20 BF | `$50` | `$30.92` | 62% | 1 | 1.22 | `$30.92` |
| **S3 - Copy** | `$180` | `$62.94` | **35%** | 2 | **1.16** | **`$31.47`** |

BF MC1's result is one ad: **`BF-01-v2`, `$11.95`, 2 purchases, 8.34 ROAS,
7.65% CTR, `$0.41` CPC** - the account's best single ad today.

**Only BF MC2 (88%) is capping.** Recommended `$15` -> `$25`: it meets both
halves of THE RULE (at cap, and new enough that the +67% has no learning to
destroy).

**S3 - Copy's budget was deliberately left alone.** It is the worst ad set and
the biggest budget, but it used 35% of it - so the `$180` is academic, and a cut
would change no real spend while risking a reset on a learning-SUCCESS ad set.
**When an ad set is not spending its budget, the budget number is irrelevant.**

### New campaigns built Nov 27 (George's structure)

- **`BID CAP Campaign BF 11/27`** - CBO, rungs at `$28`, `$30`, `$31`, `$32`
- **`COST CAP Campaign BF 11/27`** - CBO, rungs at `$16`, `$18`, `$20`

Day-one delivery: `$31`->`$2.05`, `$30`->`$0.44`, `$28`->`$0.52`,
**`$32`->`$0`**, and **all three cost caps at `$0`**. Expected during the initial
ramp, but **if the cost caps are still at `$0` tomorrow morning it is a setup
problem, not the market.** The `$32` sitting at zero while the `$31` delivers
also contradicts the CBO-feeds-the-top-rung pattern - worth re-checking.

### AOV is falling fast and it changes the cap math

`$40.65` (Nov 25) -> `$35.41` (Nov 26) -> **`$31.46` (Nov 27)**. Down **23%** in
two days.

Print cost is **fixed per shirt**, not a percentage of price, so margin per
order falls harder than AOV does. At a ~`$15` print+ship cost, margin per order
goes from ~`$25` to ~`$16` - a **36%** cut, not 23%.

**Therefore the acceptable CPA today is LOWER than the 90-day number, not
higher.** The `$32` bid cap and `$20` cost cap tops were both sized against a
`$39.59` AOV and are too loose at `$31.46`. **If this AOV holds through the
weekend: pull the bid cap top rung to `$26-28` and the cost cap top to `$16`.**
Needs George's real COGS to settle.

### Nov 27, 3:45pm - two bumps, with the test pre-registered

Both raised going into the evening peak (George's historically strongest buying
window, and ahead of a 5pm email send).

**Baseline at the moment of the bump** - this is what the later analysis must
measure against:

| | BF MC2 | BF MC1 |
| --- | --- | --- |
| Budget | **`$15` -> `$30`** | **`$25` -> `$40`** |
| Spent | `$13.23` | `$17.74` |
| **Left in tank** | **`$1.77` (88% used)** | **`$7.26` (71% used)** |
| Purchases | 1 | 2 |
| ROAS | 2.63 | **5.62** |
| CTR | **6.44%** | **6.26%** |
| CPC | `$0.53` | `$0.49` |
| ATC | 5 | 1 |
| Initiated checkout | 3 | 3 |
| Learning | early (1 conv) | early (2 conv) |

**Why these two and nothing else:** they were the only ad sets both at 2.5+ ROAS
AND close to their cap. Grid 2 had a better ROAS (3.03) but sat at 46% of
budget - per THE RULE a raise buys nothing there.

### The increment test - judge the new money, not the blended day

Pre-registering the bar so the result cannot be rationalised afterwards. Measure
**only the spend above the baseline** and the purchases above the baseline.

At today's `$31.46` AOV and a ~`$15` print+ship cost, margin per order is
roughly `$16`. So:

| Incremental CPA | Verdict |
| --- | --- |
| **under `$16`** | **good move - repeat this pattern** |
| `$16-20` | marginal - held the line, no gain |
| **over `$20`, or zero incremental purchases** | **bad move - the S3 failure again** |

Worked example: if BF MC1 ends the day at `$38` spend and 3 purchases, the
increment is `$20.26` for 1 purchase = a `$20.26` CPA = marginal.

### Why these raises are not the Nov 24 S3 mistake

S3 **was** capping on Nov 24 (`$120.52` of `$120`) and the raise to `$200` still
failed. So "it is at its cap" is necessary but not sufficient.

**The missing variable is the absolute size of the increment.** S3 took an extra
**`$80`** onto a large, saturated ad set, and the audience that `$80` reached was
far worse than the audience the first `$120` reached. These two bumps add
**`$15` each** to small ad sets still finding their core audience, both with
elite CTR and CPC.

> **THE RULE, third part:** a raise needs the ad set at its cap AND a small
> absolute increment. A `$15` step on a `$25` ad set is not the same risk as an
> `$80` step on a `$120` one, even at the same percentage.

### Still outstanding as of 3:45pm

The five dead ads were **not** turned off yet. They continue to burn through the
evening peak: `1` (Ad Set 20), `G2.1` (Grid 2), `02-06-black-friday` (BF Grids),
`3.3` (S3 - Copy), `Black Friday Frame` (BF Frame) - `$51.95` so far, zero
purchases, four of the five with zero add-to-carts.
