# Google Places API Integration for Israeli Stadiums

## 📋 Setup Steps

### 1. Google Cloud Setup:
- Create Google Cloud Project
- Enable Places API
- Generate API key
- Set up billing (required even for free tier)

### 2. API Key Configuration:
```javascript
// Environment variable
GOOGLE_PLACES_API_KEY=your-api-key-here

// Server-side usage only (for security)
const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
```

### 3. Stadium Coordinates (Required for Places API):
```javascript
const stadiumCoordinates = {
  'בלומפילד': { lat: 32.0535, lng: 34.7811 },
  'סמי עופר': { lat: 32.8088, lng: 34.9917 },
  'טדי': { lat: 31.7806, lng: 35.2044 },
  'טרנר': { lat: 31.2442, lng: 34.8090 },
  // ... add all stadiums
};
```

## 🔧 Implementation Code

### New API Endpoints:
```javascript
// Get nearby restaurants
GET /api/stadiums/:id/nearby/restaurants

// Get nearby bars  
GET /api/stadiums/:id/nearby/bars

// Get nearby parking
GET /api/stadiums/:id/nearby/parking

// Get nearby transit
GET /api/stadiums/:id/nearby/transit
```

### Sample Implementation:
```javascript
const axios = require('axios');

// Fetch nearby places for a stadium
async function getNearbyPlaces(lat, lng, type, radius = 1000) {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  
  try {
    const response = await axios.get(url, {
      params: {
        location: `${lat},${lng}`,
        radius: radius,
        type: type, // 'restaurant', 'bar', 'parking'
        key: process.env.GOOGLE_PLACES_API_KEY
      }
    });
    
    return response.data.results.map(place => ({
      name: place.name,
      rating: place.rating,
      price_level: place.price_level,
      vicinity: place.vicinity,
      place_id: place.place_id,
      types: place.types,
      distance: calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng)
    }));
  } catch (error) {
    console.error('Places API error:', error);
    return [];
  }
}

// Get detailed place information
async function getPlaceDetails(placeId) {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json';
  
  try {
    const response = await axios.get(url, {
      params: {
        place_id: placeId,
        fields: 'name,formatted_address,formatted_phone_number,website,opening_hours,photos,reviews,price_level',
        key: process.env.GOOGLE_PLACES_API_KEY
      }
    });
    
    return response.data.result;
  } catch (error) {
    console.error('Place details error:', error);
    return null;
  }
}
```

## 📊 Smart Caching Strategy:

### Cache Management:
- **Cache duration**: 24 hours (places don't change frequently)
- **Storage**: SQLite database tables
- **Update strategy**: Weekly refresh for all stadiums

### Benefits:
- **Reduced API calls** = Lower costs
- **Faster response** = Better user experience  
- **Offline capability** = Works even if API is down

## 🎯 Specific Features We Can Add:

### 1. **Restaurant Finder**:
```javascript
// Find kosher restaurants near בלומפילד
const kosherRestaurants = await findNearbyPlaces(
  stadiumId, 
  'restaurant', 
  { keyword: 'kosher', radius: 800 }
);
```

### 2. **Bar & Pub Locator**:
```javascript
// Find sports bars for pre-match atmosphere
const sportsBars = await findNearbyPlaces(
  stadiumId,
  'bar',
  { keyword: 'sports', openNow: true }
);
```

### 3. **Parking Finder**:
```javascript
// Find parking within 10-minute walk
const parking = await findNearbyPlaces(
  stadiumId,
  'parking',
  { radius: 600 } // ~10 minute walk
);
```

### 4. **Transit Information**:
```javascript
// Find bus stops and train stations
const transit = await findNearbyPlaces(
  stadiumId,
  ['bus_station', 'train_station', 'subway_station'],
  { radius: 1200 }
);
```

## 💡 Cost Optimization Tips:

1. **Batch requests** for all stadiums at once
2. **Cache results** for 24+ hours
3. **Filter by rating** (>3.5) to reduce irrelevant places
4. **Limit radius** to walking distance (500-1000m)
5. **Use specific types** instead of general searches

## 🚀 Quick Start Plan:

**Week 1**: Set up API, add coordinates to stadiums
**Week 2**: Implement restaurant and bar finder  
**Week 3**: Add parking and transit information
**Week 4**: Create enhanced UI with maps

**Estimated monthly cost**: $5-15 (well within free tier during development)

Would you like me to help you set up the Google Cloud project and start implementing this? We can begin with just one stadium (like בלומפילד) as a proof of concept!