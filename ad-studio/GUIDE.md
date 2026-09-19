# Ad Studio - Explain Like I'm 5

This is your own little machine that takes a photo of something you sell and
turns it into fancy ads. It does **not** touch Facebook itself - once your
ads look good, you hand them to Claude, and Claude does the actual Facebook
part through Meta's own official connection. Here's how, one baby step at a
time.

## Part 1 - Turn the machine on (one time only)

1. **Install Node.js** if you don't have it: https://nodejs.org (the "LTS" button).
2. **Start the app.**
   ```bash
   cd ad-studio
   npm install
   npm run dev
   ```
3. Open http://localhost:3000 in your browser. That's it - no accounts, no
   API keys, nothing to configure. It only ever saves files on your own
   computer.

## Part 2 - Make the ads

### Step 1: Upload one photo

Click the file picker and choose one clear photo of your product. A plain
photo on a simple background works best - the machine crops it, so avoid
photos where the important bit is right at the edge. Click it in the little
gallery to select it, then hit **Continue**.

### Step 2: Generate creatives

1. Type a **headline** - the big bold text on the ad. Example: "Cozy Fall Candles".
2. (Optional) a **subheadline** - a smaller line, like "Free shipping this week".
3. Your **call to action** button text, like "Shop Now".
4. Pick a **brand color**.
5. Leave all the **Templates** and **Formats** boxes checked the first time -
   this makes the widest variety to test:
   - Templates = different visual layouts (a bottom bar, a top banner, a framed badge).
   - Formats = different shapes Facebook needs (square feed, tall feed, Stories/Reels).
6. Click **Generate**. A wall of thumbnails appears - your photo, same
   headline, laid out and sized differently.
7. Click the ones you like to select them (blue border = selected).

Don't like any of them? Change the headline/color and generate again - old
ones stay, new ones get added.

## Part 3 - Hand it to Claude to actually publish

As soon as you select at least one creative, a box appears: **"Hand off to
Claude to publish."** This is the bridge between the app and Facebook.

1. Click **Download image** under each creative you want to run.
2. Click **Copy brief** - this copies a ready-made message with the image
   details, headline, and blank fields for campaign name/budget/targeting.
3. Go to your chat with Claude. **Attach the downloaded image file(s)** to
   the message, paste the brief, and fill in the blanks (campaign name,
   daily budget, destination URL, countries).
4. Send it. Claude will:
   - Upload your image to your Facebook ad account's image library
   - Create the Ad Creative from it
   - Create the Campaign, Ad Set, and Ad
   - Leave everything **Paused** so nothing spends until you say go

That's it - open Ads Manager, review it, and flip it to Active when you're
ready.

## Why doesn't the app just publish for me?

Because Facebook is very sensitive to automated tools moving ad accounts
around, and you specifically don't want a custom, unofficial integration
touching your ad account. So instead of this app holding its own Facebook
login and making raw API calls, **all Facebook actions go through Meta's
own official Ads MCP** connected to Claude - the same trusted path Meta
built for exactly this. The app's only job is making the pictures.

## One-time setup for Claude's Facebook connection

You (or whoever manages your Facebook Business account) do this once, in
Claude's settings, not in this app:

1. In Claude's connector settings, choose **Add custom connector**.
2. Paste the URL: `https://mcp.facebook.com/ads`
3. Log into Facebook and approve access when prompted - you must already be
   an admin of the ad account and Page you want to use.
4. Make sure it's turned on for the chat/session you're using.

Once that's done, just talk to Claude like in Part 3 above, any time you
want to publish something.

## What actually happens on Facebook's side, in plain words

Every ad on Facebook is built from 3 stacked boxes:

```
Campaign  (the big goal, e.g. "Sales")
   └── Ad Set  (who sees it, how much you spend per day)
          └── Ad  (the actual picture + text people see)
```

Claude fills in all three boxes for you through the official Meta connection:
uploads your picture, wraps it into an "Ad", groups it under one Ad Set with
your budget and country targeting, and puts that Ad Set under one Campaign
with your chosen objective - paused, waiting for your final okay.
