# Meta Ads MCP - Gotchas Worth Remembering

Hard-won findings from building real campaigns on ad account `1149260060062188`.
Each one cost a round trip or a rebuild.

## Always pass image_hash, never image_url

Passing `image_url` to `ads_create_creative` succeeds, and the creative looks
fine. But Meta fetches the image, generates a hash, and stores **both**, leaving
`link_data` with `picture` AND `image_hash`. The ad then fails publish validation:

    ObjectStorySpecRedundant (1443051): Only one of picture and image_hash
    should be specified in the field link_data of object_story_spec.

The error appears in the ad's `active_errors`, not on the creative create, so it
surfaces one step later than the mistake.

Recovery is cheap because the fetch already uploaded the image: read the bad
creative with `ads_get_creatives` asking for `image_hash`, then rebuild the
creative with `image_hash` and no `image_url`. Verify `link_data` in the returned
ad spec carries only `image_hash`.

Shopify `.webp` images are accepted by Meta - format was not the problem here.

## Always set instagram_user_id explicitly

`ads_create_creative` attaches it inconsistently: one creative picked up
`instagram_user_id: 17841471991833905` on its own, an identical later call did
not. A creative without it silently does not deliver on Instagram, which under
automatic placements costs roughly half the surfaces with no error anywhere.

Pass `instagram_user_id: "17841471991833905"` every time and confirm it comes
back in the returned spec. When set, Meta also adds `instagram_asset_id` and
`threads_user_id`.

## Duplicate catalog ads, never author their creative

Catalog (dynamic product) ads depend on `template_url_spec`, which
`ads_create_creative` does not expose:

    template_url_spec.web.url =
      https://bookedaway.shop/collections/all-products
        ?first={{product.url | urlencode}}
        &variant={{product.retailer_id | urlencode}}
        &limit=16

Use `source_ad_id` on `ads_create_ad` and omit `creative` entirely. Trying to
rebuild one by hand cannot reproduce the per-product links.

## Creatives are immutable, and deleting them is not available here

Any copy, image, link or CTA change requires a new creative AND a new ad.
`ads_update_entity` with `status: DELETED` does work on draft ads, so the
superseded ad can be removed. `ads_creative_delete` is **not rolled out** for
this ad account, so superseded creatives accumulate in the library unused -
harmless, since no ad references them.

Because of this, get the copy right before creating the creative. Every fix
doubles the object count.

## Draft ads marked DELETED still show in Ads Manager

A draft ad set to `status: DELETED` will not deliver or spend, but Ads Manager
still lists it in the draft editor. Three draft ads under one ad set looked like
a real misconfiguration to the advertiser. Prefer getting it right the first
time over cleaning up after.

## Website audience sizes read a placeholder 20

With `operation_status_code: 200` ("Normal") and `delivery_status: ACTIVE`,
website/pixel custom audiences still report
`approximate_count_lower_bound`/`upper_bound` of exactly 20 - including a
purchasers audience that must hold thousands. Engagement audiences report real
numbers (a Page engagers audience read 6,400-7,600, then 11,000-12,900 hours
later). Do not treat 20 as an empty audience or rebuild the rule on it; check
Ads Manager > Audiences instead.

## Other small ones

- `ads_create_ad_set` rejects `daily_budget` under a CBO parent campaign, and
  `promoted_object` needs `product_set_id` alongside the pixel for catalog ads.
- `destination_type` reads back as `UNDEFINED` on every ad set, so it cannot be
  used to tell a Shop-destination ad set from a website one. The Shop setting
  actually lives in the creative's
  `destination_spec.native_commerce_experience`.
- `ads_get_creatives` does not expose `asset_feed_spec`, so whether an existing
  ad has Collection format enabled cannot be read through it.
- Custom audiences require the account to accept the Custom Audiences ToS once
  (error 2663 until then), at
  https://www.facebook.com/customaudiences/app/tos/?act=1149260060062188
- Instagram audience creation is separately gated: the IG account can deliver
  ads but returns error 2654/1713140 on audience creation without the right
  permission.
