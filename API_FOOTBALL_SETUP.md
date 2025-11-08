# API-Football Setup Guide

## Overview
This guide explains how to integrate API-Football to show upcoming matches at each stadium.

## Step 1: Get API Key

1. Go to https://www.api-football.com/
2. Click "Get Started" or "Pricing"
3. Choose a plan:
   - **Free Tier**: 100 requests/day (good for testing)
   - **Basic**: $15/month - 3000 requests/day
   - **Pro**: $40/month - 10000 requests/day

4. Sign up and get your API key

## Step 2: Add API Key to Environment

Add to your `.env` file:
```
API_FOOTBALL_KEY=your_api_key_here
```

For Azure deployment, add to App Settings:
```bash
az webapp config appsettings set --name shovalstadiums --resource-group fdfa --settings API_FOOTBALL_KEY="your_api_key_here"
```

## Step 3: Features Available

The API provides:
- ✅ Upcoming fixtures (next matches)
- ✅ Live scores
- ✅ Match results
- ✅ Team lineups
- ✅ Match statistics
- ✅ Broadcast information (TV channels)
- ✅ Israeli Premier League (League ID: 383)

## Step 4: Implementation Status

### Endpoint Created
`GET /api/stadiums/:id/matches`

### Next Steps Required

1. **Team Name Mapping**: Map Hebrew team names to API-Football team IDs
   - Example: "מכבי תל אביב" → Team ID: 657
   - Example: "הפועל תל אביב" → Team ID: 4486

2. **Complete the API Integration** in `server/index.js`

3. **Add UI Component** to display matches in the overview tab

## API-Football Israeli Teams Examples

```javascript
const ISRAELI_TEAMS = {
  'מכבי תל אביב': 657,
  'הפועל תל אביב': 4486,
  'מכבי חיפה': 659,
  'הפועל באר שבע': 658,
  'בית"ר ירושלים': 4491,
  // ... add more teams
};
```

## Sample API Response

```json
{
  "fixture": {
    "id": 123456,
    "date": "2024-11-15T18:00:00+00:00",
    "venue": {
      "name": "Bloomfield Stadium"
    }
  },
  "league": {
    "name": "Ligat ha'Al",
    "logo": "https://..."
  },
  "teams": {
    "home": {
      "name": "Maccabi Tel Aviv",
      "logo": "https://..."
    },
    "away": {
      "name": "Hapoel Tel Aviv",
      "logo": "https://..."
    }
  },
  "broadcast": {
    "channels": ["Channel 5", "Sport 1"]
  }
}
```

## Cost Calculation

- Free: 100 requests/day = ~3000/month
- Each stadium page load = 1 request
- Estimated usage: 50-100 requests/day for small site
- **Recommendation**: Start with free tier

## Alternative: TheSportsDB (Free)

If cost is a concern, consider TheSportsDB:
- Free API (with Patreon support)
- Website: https://www.thesportsdb.com/
- Less comprehensive but free
- Israeli league coverage available

## Questions?

Contact API-Football support: https://www.api-football.com/contact
