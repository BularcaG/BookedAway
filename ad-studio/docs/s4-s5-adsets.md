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
| 4.1 Navy | `120255741545240110` | `1765975538422422` | `0ec6877c3432d3a5c7446bd2b712ef01` |
| 4.2 Sand | `120255741545840110` | `823212080885951` | `bb6c35528ae43e93de1e05dd5879e34c` |
| 4.3 Dark Chocolate | `120255741546350110` | `2381679146003297` | `56e6671367801f780d2cd38214b3f94d` |
| 4.4 Military Green | `120255741546520110` | `2187694065503253` | `7bba45c18b6ee4b4fb889c8c413c538b` |
| 4.5 Black | `120255741547140110` | `28992019183769487` | `97cefb4ea4490c7319553657f5d4f37a` |

## S5 - Organic Winners

Ad set `120255741521120110`. Each ad links to its own product page and uses that
product's best-selling colour.

| Ad | ID | Colour used | Link |
| --- | --- | --- | --- |
| 5.1 Rolling Ladder Bookshelf | `120255741547580110` | Sand (tied best with Light Blue, 8 each) | `/products/rolling-ladder-bookshelf` |
| 5.2 Im Sure Its Nothing | `120255741548200110` | Dark Chocolate (8 orders) | `/products/i-m-sure-it-s-nothing-t-shirt` |
| 5.3 Steeped in Mystery | `120255741548840110` | Navy (7 orders) | `/products/steeped-in-mystery-t-shirt` |
| 5.4 Book Club Gang | `120255741550670110` | Sport Grey (6 orders) | `/products/book-club-gang-t-shirt` |

## Shared setup (both ad sets, copied from S3)

- $15/day each, ABO, `LOWEST_COST_WITHOUT_CAP`
- `OFFSITE_CONVERSIONS` / `IMPRESSIONS`
- `promoted_object: {pixel_id: 506614892042719, custom_event_type: PURCHASE}`
- US with `location_types: [frequently_in, home, recent]`, ages 18-65
- `targeting_automation.advantage_audience: 1`, `targeting_optimization: expansion_all`
- `attribution_spec`: 7-day click, 1-day view, 1-day engaged video view
- Automatic placements
- Standard primary text, description `Printed in the USA`, CTA `SHOP_NOW`
- `instagram_user_id: 17841471991833905` set explicitly on every creative

Every enhancement verified `OPT_OUT` / `DEFAULT_OFF` in all nine returned ad
specs, including `product_browsing`, `standard_enhancements_catalog`,
`media_type_automation`, `reveal_details_over_time`, `biz_ai`,
`contextual_multi_ads` and the whole `creative_sourcing_spec`.

## Note on the description field

`ads_create_creative` warns that `description` is stored but Facebook Feed does
not render it on single-image ads, and Instagram has no description line. It is
saved on all nine creatives for consistency with the rest of the account; do not
expect it to be visible on feed placements.
