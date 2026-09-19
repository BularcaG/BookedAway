# Ad Studio - Explain Like I'm 5

This is your own little machine that takes a photo of something you sell,
turns it into fancy ads, and puts those ads straight into Facebook so people
can see them. Here's how to use it, one baby step at a time.

## Part 1 - Turn the machine on (one time only)

You only do this part once, ever.

1. **Get a Facebook "App".** This is not an app you download - it's a free
   ID card that lets your own website talk to Facebook.
   1. Go to https://developers.facebook.com/apps and click **Create App**.
   2. Pick **"Other"** → **"Business"** as the type.
   3. Give it any name, like "BookedAway Ads".
   4. Once it's created, click **Add Product** and add **Marketing API**.
2. **Tell Facebook where your app lives.**
   1. In the left sidebar, find **Facebook Login for Business** → **Settings**.
   2. Under "Valid OAuth Redirect URIs" add:
      `http://localhost:3000/api/auth/facebook/callback` (for testing on your
      own computer) - and later your real website address + `/api/auth/facebook/callback`
      once this is hosted somewhere.
3. **Copy two secret codes.**
   1. Go to **App Settings → Basic**.
   2. Copy the **App ID** and **App Secret**.
4. **Put the codes in the app's settings file.**
   1. In the `ad-studio` folder, copy `.env.example` to a new file named `.env.local`.
   2. Paste your App ID into `FB_APP_ID=`.
   3. Paste your App Secret into `FB_APP_SECRET=`.
5. **Start the machine.**
   ```bash
   cd ad-studio
   npm install
   npm run dev
   ```
   Then open http://localhost:3000 in your browser. That's it - the machine is on.

> Don't want to do steps 1-4 at all? There's a shortcut for store owners who
> only ever advertise their own products - see **"The lazy shortcut"** at the
> bottom of this guide.

## Part 2 - Connect your Facebook ad account

This is Step 1 in the app.

1. Click **Connect Facebook**.
2. Facebook will ask "do you want to let this app manage your ads?" - click
   **Continue** and approve it. (You must already be an admin of the ad
   account and Page you want to use - this app can't grant you new access,
   it only uses access you already have.)
3. You'll land back on the page. Now pick:
   - **which ad account** money should come out of, and
   - **which Facebook Page** the ad should look like it's posted from.
4. Click **Save & Continue**.

You're connected. You won't have to do this again unless you disconnect.

## Part 3 - Upload one photo

This is Step 2.

1. Click the file picker and choose one clear photo of your product. A
   plain photo on a simple background works best - the machine crops it, so
   avoid photos where the important bit is right at the edge.
2. Wait a second for it to upload. It'll show up in a little gallery below.
3. Click on the photo to select it, then hit **Continue**.

## Part 4 - Make the ads

This is Step 3, and it's the fun part.

1. Type a **headline** - the big bold text on the ad. Example: "Cozy Fall Candles".
2. (Optional) Type a **subheadline** - a smaller line under it, like "Free shipping this week".
3. Type your **call to action** button text, like "Shop Now".
4. Pick a **brand color** - this colors the button and some of the design.
5. Leave all the **Templates** and **Formats** checkboxes checked the first
   time - this makes the widest variety to test:
   - Templates = different visual layouts (a bottom bar, a top banner, a framed badge).
   - Formats = different shapes Facebook needs (square feed, tall feed, and
     Stories/Reels).
6. Click **Generate**. In a few seconds you'll see a wall of thumbnails - all
   your photo, same headline, but laid out differently and sized differently.
7. Click the ones you actually like to select them (a blue border means
   selected). You can pick just one, or a bunch to test against each other.
8. Click **Continue**.

Don't like any of them? Just change the headline/color and click Generate
again - it doesn't erase your old ones, it adds more to pick from.

## Part 5 - Send it to Facebook

This is Step 4, the last step.

1. **Campaign name** - just a label for you, like "Fall Candle Launch".
2. **Objective** - what you want Facebook to optimize for. If you're not
   sure, pick **Traffic** (send people to your store) or **Sales**.
3. **Daily budget** - how many dollars a day you're okay spending.
4. **Countries** - where people should see the ad, e.g. `US, CA`.
5. **Destination URL** - the exact page people land on when they click, e.g.
   your product page link.
6. **Primary text** - the sentence that shows above the picture in the feed.
7. Leave **Ad headline** blank to reuse what you typed in Part 4, or type a
   different one.
8. **Publish as** - leave this on **Paused**. This means Facebook builds the
   whole campaign but does **not** spend any money yet, so you can go double
   check everything in Ads Manager first. Flip it to **Active** later inside
   Facebook when you're ready, or choose **Active** here if you're confident.
9. Click **Publish to Facebook Ads Manager**.

A few seconds later you'll see "🎉 Published!" with a button **Open in Ads
Manager** - click it to see your real, live (but paused) campaign sitting
inside Facebook, exactly as if you'd built it by hand.

## What actually happened, in plain words

Every ad on Facebook is built from 3 stacked boxes:

```
Campaign  (the big goal, e.g. "Sales")
   └── Ad Set  (who sees it, how much you spend per day)
          └── Ad  (the actual picture + text people see)
```

Your Ad Studio filled in all three boxes for you: it uploaded your generated
pictures to Facebook, wrapped each one into an "Ad", grouped them under one
Ad Set with your budget and country targeting, and put that Ad Set under one
Campaign with your chosen objective. That's the entire thing RapidAds (and
similar tools) do behind the scenes - this app just does it for you, for
free, on your own computer.

## The lazy shortcut (skip Facebook App setup entirely)

If you only ever want to run ads for **your own** store and don't want to
mess with creating a Facebook App:

1. Go to https://business.facebook.com → **Business Settings** → **Users** →
   **System Users**.
2. Click **Add**, name it anything (e.g. "Ad Studio Bot"), role **Admin**.
3. Click **Generate New Token**, pick your app (you still need one app to
   exist, but you skip building the login flow), check the boxes for
   `ads_management` and `pages_manage_ads`, and generate it.
4. Copy that long token into `FB_SYSTEM_USER_TOKEN=` in `.env.local`.
5. Restart the app (`npm run dev`). Step 1 in the wizard now shows you as
   already connected - just pick your ad account and Page and go.

This token doesn't expire the way a regular login does, so it's the better
option if you want this running unattended.
