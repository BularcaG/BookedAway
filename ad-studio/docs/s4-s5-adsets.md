# S4 + S5 - Charming Village colour test and Organic Winners

Staged as drafts in `Testing Campaign` (`120255230704660110`) on 2026-10-24.
Nothing live until published from Ads Manager.

## Why these two ad sets exist

Correlating Meta spend with Shopify sales over 90 days showed two things:

1. The catalog concentrates ~78% of its spend on the two products with the worst
   CPC and CPA (Murder Capital at $1.25 CPC / $27 CPA, Little Grey Cells at
   $0.92 / $33), while products converting at $5-15 CPA get $30-200.
2. Several products sell steadily with almost no ad support - Rolling Ladder
   Bookshelf (23 orders on $44 spend), I'm Sure It's Nothing (18 on $19),
   Steeped in Mystery (13 on $10), Book Club Gang (8 orders, highest AOV in the
   store at $45, on $6).

A product cannot win impressions against the algorithm's favourite inside the
same ad set, so each of these gets a single-image ad with its own budget.

## Colour decisions come from Shopify, never Meta

Meta's `product_id` breakdown is **variant level**, so it reports which variant
*image was clicked*, not what was bought - the shopper picks their own colour on
the product page. For Charming Village that difference is total:

| Colour | Shopify orders (90d) | Meta clicks |
| --- | --- | --- |
| Navy | **13** | ~0 |
| Sand | **11** | 6 |
| Military Green | **9** | 0 |
| Dark Chocolate | 4 | 105 |
| Black | 2 | 7 |
| Charcoal | **1** | **229** |

Charcoal led every Meta click metric and has sold one shirt in 90 days. Always
settle colour from `FROM sales SHOW orders GROUP BY product_variant_title`.

Also: XL is 40% of Charming Village orders, and the Shopify "negative inventory"
on Navy/XL (-6), Military Green/XL (-5) and Sand/M (-4) marks the *bestsellers*,
not a stock problem - Printify is made to order and Meta's catalog reports every
variant in stock.

## S4 - Charming Village colour test

Ad set `120255741520390110`. All five ads link to
`https://bookedaway.shop/products/charming-village-suspiciously-high-murder-rate-t-shirt`
and use headline `Charming Village T-Shirt`.

| Ad | ID | Creative | Image hash |
| --- | --- | --- | --- |
| 4.1 Navy | `120255741829030110` | `2552163135295175` | `0ec6877c3432d3a5c7446bd2b712ef01` |
| 4.2 Sand | `120255741829480110` | `1869533724044477` | `bb6c35528ae43e93de1e05dd5879e34c` |
| 4.3 Dark Chocolate | `120255741830260110` | `2217059092492219` | `56e6671367801f780d2cd38214b3f94d` |
| 4.4 Military Green | `120255741831230110` | `1636082674765479` | `7bba45c18b6ee4b4fb889c8c413c538b` |
| 4.5 Black | `120255741837530110` | `1100070182662995` | `97cefb4ea4490c7319553657f5d4f37a` |

## S5 - Organic Winners

Ad set `120255741521120110`. Each ad links to its own product page and uses that
product's best-selling colour.

| Ad | ID | Creative | Colour used | Link |
| --- | --- | --- | --- | --- |
| 5.1 Rolling Ladder Bookshelf | `120255741838440110` | `1519578086665030` | Sand (tied best with Light Blue, 8 each) | `/products/rolling-ladder-bookshelf` |
| 5.2 Im Sure Its Nothing | `120255741838670110` | `29181711398185827` | Dark Chocolate (8 orders) | `/products/i-m-sure-it-s-nothing-t-shirt` |
| 5.3 Steeped in Mystery | `120255741840290110` | `39358435410468860` | Navy (7 orders) | `/products/steeped-in-mystery-t-shirt` |
| 5.4 Book Club Gang | `120255741840590110` | `1788466825766926` | Sport Grey (6 orders) | `/products/book-club-gang-t-shirt` |

Note 5.1's handle has no `-t-shirt` suffix (`/products/rolling-ladder-bookshelf`)
while the other four do. All five handles were checked against Shopify and
resolve to `ACTIVE` products.

## Shared setup (both ad sets, copied from S3)

- $15/day each, ABO, `LOWEST_COST_WITHOUT_CAP`
- `OFFSITE_CONVERSIONS` / `IMPRESSIONS`
- `promoted_object: {pixel_id: 506614892042719, custom_event_type: PURCHASE}`
- US with `location_types: [frequently_in, home, recent]`, ages 18-65
- `targeting_automation.advantage_audience: 1`, `targeting_optimization: expansion_all`
- `attribution_spec`: 7-day click, 1-day view, 1-day engaged video view
- Automatic placements
- Standard primary text, no description, CTA `SHOP_NOW`
- `instagram_user_id: 17841471991833905` set explicitly on every creative

Every enhancement verified `OPT_OUT` / `DEFAULT_OFF` in all nine returned ad
specs, including `product_browsing`, `standard_enhancements_catalog`,
`media_type_automation`, `reveal_details_over_time`, `biz_ai`,
`contextual_multi_ads` and the whole `creative_sourcing_spec`.

## Why there is no description (and the rebuild)

The first nine ads were built with `description: "Printed in the USA"`. Every one
of them failed draft validation with:

    Creative Call To Action's Link Title and Link Description Are Deprecated (1815589)

`ads_create_creative` writes both `link_title` and `link_description` into
`call_to_action.value`, and Meta has deprecated them there. Only
`link_description` actually trips the error - a creative built without
`description` still carries `link_title` in the CTA and validates clean.

Creatives are immutable and an ad cannot be repointed at a new `creative_id`, so
the fix was nine new creatives without `description` and nine new ads on them.
All nine returned `active_errors: []`.

The nine originals are renamed `OLD-REMOVE ...` and set `PAUSED`. They cannot be
removed through the API - `status: DELETED` on a draft ad is rejected with
`Invalid adgroup status` (1487839) and leaves the draft unpublishable - so they
have to be deleted by hand in Ads Manager before publishing.

| Parked ad | ID |
| --- | --- |
| OLD-REMOVE 4.1 Navy | `120255741545240110` |
| OLD-REMOVE 4.2 Sand | `120255741545840110` |
| OLD-REMOVE 4.3 Dark Chocolate | `120255741546350110` |
| OLD-REMOVE 4.4 Military Green | `120255741546520110` |
| OLD-REMOVE 4.5 Black | `120255741547140110` |
| OLD-REMOVE 5.1 Rolling Ladder Bookshelf | `120255741547580110` |
| OLD-REMOVE 5.2 Im Sure Its Nothing | `120255741548200110` |
| OLD-REMOVE 5.3 Steeped in Mystery | `120255741548840110` |
| OLD-REMOVE 5.4 Book Club Gang | `120255741550670110` |

## S5 was missing its age cap

S4 staged with `age_max: 65`, S5 staged without it, which leaves the upper bound
open. Fixed by resending S5's whole `targeting` spec with `age_max: 65` - the
field replaces the entire spec, so `targeting_automation` and
`targeting_optimization` had to be carried forward unchanged.
