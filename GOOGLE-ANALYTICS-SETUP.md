# Google Analytics 4 Setup Guide

## 1. Create GA4 Property (5 minutes)

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon bottom left)
3. Click "Create Property"
4. Fill in:
   - **Property name**: musikfürfirmen.de
   - **Reporting time zone**: (Europe/Berlin)
   - **Currency**: EUR
5. Click "Next" → Select industry & business size → Click "Create"
6. Accept terms of service
7. Choose "Web" platform
8. Add website details:
   - **Website URL**: https://musikfuerfirmen.de (or current URL)
   - **Stream name**: musikfürfirmen.de - Web
9. Click "Create Stream"

## 2. Get Measurement ID

You'll see a screen showing:
```
Measurement ID
G-XXXXXXXXXX
```

Copy this ID.

## 3. Add to Environment Variables

Create or update `.env.local`:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Replace `G-XXXXXXXXXX` with your actual Measurement ID!**

## 4. Deploy

The GoogleAnalytics component is already installed and will automatically load when the env var is set.

Redeploy:
```bash
git add .
git commit -m "Add Google Analytics 4 tracking"
git push origin main

# Then on Hetzner:
cd /opt/apps/musikfuerfirmen
git pull
docker compose down
docker compose up -d --build
```

## 5. Link Google Search Console (10 minutes)

This enables keyword tracking in GA4:

1. In GA4, go to **Admin** → **Product Links** → **Search Console Links**
2. Click "Link"
3. Select your Search Console property (or add one if needed)
4. Click "Next" → "Submit"

### If you don't have Search Console yet:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://musikfuerfirmen.de`
4. Verify ownership (DNS TXT record or HTML file upload)
5. Return to GA4 and link it

## 6. Verify Tracking (5 minutes)

1. In GA4, go to **Reports** → **Realtime**
2. Visit your website in another tab
3. You should see 1 active user in Realtime report within 30 seconds

## 7. Enable Enhanced Measurement

Already enabled by default, but verify:

1. In GA4, go to **Admin** → **Data Streams** → Click your web stream
2. Scroll to "Enhanced measurement"
3. Toggle ON (should already be on)
4. This tracks:
   - Page views ✓
   - Scrolls ✓
   - Outbound clicks ✓
   - Site search ✓
   - File downloads ✓

## What GA4 Tracks Automatically

✅ **Traffic Sources**: Organic search, direct, referral, social, email
✅ **Keywords**: Via Search Console integration (takes 24-48h)
✅ **Device Type**: Mobile, desktop, tablet
✅ **Location**: Country, city (approximate)
✅ **Page Views**: Which pages are most visited
✅ **User Behavior**: Session duration, bounce rate, conversions
✅ **Events**: Button clicks, form submissions, scroll depth

## Custom Event Tracking (Optional)

Already implemented in the lead capture form via Google Tag Manager events:
- `lead_captured` - When user submits email
- `pdf_download` - When PDF is downloaded

These will show up in **Reports** → **Engagement** → **Events**

## Important Notes

- **Data appears after 24-48 hours** for historical reports
- **Realtime shows immediate data** for debugging
- **Search Console data takes 48-72 hours** after linking
- **Cookie consent**: GA4 works without cookies in consent mode (already DSGVO-compliant)

## Troubleshooting

**"No data yet"**:
- Wait 24-48 hours
- Check env var is set correctly
- Verify site is deployed
- Check browser console for errors

**"Search keywords not showing"**:
- Link Search Console (see step 5)
- Wait 48-72 hours after linking
- Make sure site is indexed in Search Console

**"Can't verify ownership"**:
- Use DNS TXT record method (most reliable)
- Add this TXT record to your domain DNS:
  ```
  google-site-verification=XXXXXXXXXXXXXXXXXXXX
  ```
