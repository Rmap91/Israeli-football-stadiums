const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_BASE_URL = 'https://places.googleapis.com/v1/places:searchNearby';

// Simple middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, '..', 'database', 'stadiums.db');
console.log('Database path:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in meters
}

// Function to get real places from Google Places API
async function getNearbyPlaces(lat, lng, type, radius = 1000) {
  if (!GOOGLE_PLACES_API_KEY) {
    console.warn('Google Places API key not configured');
    return [];
  }

  try {
    console.log(`Fetching real ${type} places from Google Places API (NEW) for ${lat}, ${lng}`);
    console.log(`Using API key: ${GOOGLE_PLACES_API_KEY.substring(0, 10)}...`);
    
    // Map types to new API included types
    const typeMapping = {
      'restaurant': 'restaurant',
      'bar': 'bar',
      'parking': 'parking',
      'bus_station': 'bus_station',
      'transit_station': 'transit_station'
    };
    
    const includedType = typeMapping[type] || type;
    
    const requestBody = {
      includedTypes: [includedType],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng
          },
          radius: radius
        }
      },
      languageCode: 'he'
    };
    
    const response = await axios.post(GOOGLE_PLACES_BASE_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.types,places.primaryType,places.websiteUri,places.googleMapsUri,places.currentOpeningHours,places.regularOpeningHours'
      },
      timeout: 5000
    });
    
    console.log(`Google API (NEW) response received with ${response.data.places?.length || 0} places`);
    
    if (!response.data.places || response.data.places.length === 0) {
      console.log('No results found near this location');
      return [];
    }
    
    const places = response.data.places.map(place => {
      const distance = place.location ? 
        Math.round(calculateDistance(lat, lng, place.location.latitude, place.location.longitude)) : 0;
      
      // Extract opening hours
      const openingHours = place.currentOpeningHours || place.regularOpeningHours;
      const weekdayText = openingHours?.weekdayDescriptions || [];
      const openNow = openingHours?.openNow;
      
      return {
        name: place.displayName?.text || place.displayName || 'שם לא זמין',
        address: place.formattedAddress || 'כתובת לא זמינה',
        rating: place.rating || 0,
        distance_meters: distance,
        price_level: 0,
        types: place.types || [],
        website: place.websiteUri || null,
        google_maps_url: place.googleMapsUri || null,
        place_id: place.id || null,
        latitude: place.location?.latitude || null,
        longitude: place.location?.longitude || null,
        opening_hours: weekdayText,
        open_now: openNow
      };
    });
    
    // Sort by distance
    places.sort((a, b) => a.distance_meters - b.distance_meters);
    
    console.log(`Successfully got ${places.length} real places from Google Places API (NEW)`);
    console.log(`Sample distances: ${places.slice(0, 3).map(p => p.distance_meters + 'm').join(', ')}`);
    return places.slice(0, 8);
    
  } catch (error) {
    console.error('Google Places API error:', error.message);
    if (error.response) {
      console.error('API response status:', error.response.status);
      console.error('API response data:', JSON.stringify(error.response.data));
    }
    return [];
  }
}

// Simple API to test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Get all stadiums
app.get('/api/stadiums', (req, res) => {
  console.log('Getting all stadiums');
  
  const sql = 'SELECT * FROM stadiums ORDER BY name_hebrew';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    
    console.log(`Found ${rows.length} stadium entries`);
    
    // Group stadiums by name_hebrew to merge duplicates
    const stadiumMap = new Map();
    
    rows.forEach(row => {
      const key = row.name_hebrew.trim();
      
      if (stadiumMap.has(key)) {
        // Stadium already exists, merge the clubs
        const existing = stadiumMap.get(key);
        
        // Merge clubs_playing
        const existingClubs = existing.clubs_playing ? existing.clubs_playing.split(',').map(c => c.trim()) : [];
        const newClubs = row.clubs_playing ? row.clubs_playing.split(',').map(c => c.trim()) : [];
        const allClubs = [...new Set([...existingClubs, ...newClubs])]; // Remove duplicates
        existing.clubs_playing = allClubs.join(', ');
        
        // Use coordinates from any entry that has them
        if (!existing.latitude && row.latitude) {
          existing.latitude = row.latitude;
          existing.longitude = row.longitude;
          existing.address = row.address;
        }
        
        // Use the higher capacity
        if (row.capacity && (!existing.capacity || row.capacity > existing.capacity)) {
          existing.capacity = row.capacity;
        }
        
      } else {
        // New stadium, add to map
        stadiumMap.set(key, { ...row });
      }
    });
    
    // Convert map to array
    const mergedStadiums = Array.from(stadiumMap.values());
    
    console.log(`Merged into ${mergedStadiums.length} unique stadiums`);
    res.json(mergedStadiums);
  });
});

// Get stadium details
app.get('/api/stadiums/:id/details', (req, res) => {
  const { id } = req.params;
  
  console.log(`Getting details for stadium ${id}`);
  
  // First get the stadium name by ID
  db.get('SELECT name_hebrew FROM stadiums WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    
    if (!row) {
      console.log(`Stadium ${id} not found`);
      return res.status(404).json({ error: 'Stadium not found' });
    }
    
    const stadiumName = row.name_hebrew.trim();
    console.log(`Found stadium name: ${stadiumName}, fetching all entries...`);
    
    // Now get all entries with this name to merge teams
    db.all('SELECT * FROM stadiums WHERE TRIM(name_hebrew) = ?', [stadiumName], (err, rows) => {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: err.message });
      }
      
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: 'Stadium not found' });
      }
      
      // Merge all teams from different rows
      const stadium = rows[0]; // Use first row as base
      const allClubs = rows
        .map(r => r.clubs_playing)
        .filter(Boolean)
        .join(', ')
        .split(',')
        .map(c => c.trim())
        .filter((club, index, arr) => arr.indexOf(club) === index); // Remove duplicates
      
      stadium.clubs_playing = allClubs.join(', ');
      stadium.id = id; // Keep the original requested ID
      
      console.log(`Merged stadium with ${allClubs.length} teams: ${allClubs.join(', ')}`);
      
      // Add mock counts
      stadium.restaurant_count = 5;
      stadium.bar_count = 3;
      stadium.parking_count = 2;
      stadium.transit_count = 4;
      
      res.json(stadium);
    });
  });
});

// Get nearby places
app.get('/api/stadiums/:id/nearby/:type?', async (req, res) => {
  const { id, type } = req.params;
  
  console.log(`Getting nearby ${type || 'all'} for stadium ${id}`);
  
  try {
    // Get stadium info first to get coordinates
    const stadium = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM stadiums WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!stadium) {
      return res.status(404).json({ error: 'Stadium not found' });
    }
    
    let places = [];
    let source = 'mock_data';
    
    // Try to get real Google Places data if coordinates exist
    if (stadium.latitude && stadium.longitude) {
      console.log(`Stadium ${stadium.name_hebrew} has coordinates: ${stadium.latitude}, ${stadium.longitude}`);
      
      try {
        places = await getNearbyPlaces(stadium.latitude, stadium.longitude, type);
        
        if (places && places.length > 0) {
          source = 'google_places';
          console.log(`Successfully got ${places.length} real places from Google Places`);
        } else {
          console.log('Google Places returned no results - returning empty array (no fake data)');
          places = [];
          source = 'google_places_empty';
        }
      } catch (apiError) {
        console.error('Google Places API failed:', apiError.message);
        places = [];
        source = 'google_places_error';
      }
    } else {
      console.log(`Stadium ${stadium.name_hebrew} has no coordinates - cannot fetch places`);
      places = [];
      source = 'no_coordinates';
    }
    
    res.json({
      stadium: stadium.name_hebrew,
      coordinates: stadium.latitude && stadium.longitude ? 
        { lat: stadium.latitude, lng: stadium.longitude } : null,
      places: places,
      source: source
    });
    
  } catch (error) {
    console.error('Error in nearby places endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

// API-Football configuration
const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;
const API_FOOTBALL_BASE_URL = 'https://v3.football.api-sports.io';

// Israeli team ID mapping (Hebrew name -> API-Football team ID)
// Updated with correct IDs from API-Football 2025 season
const ISRAELI_TEAMS = {
  'מכבי תל אביב': 604,
  'מכבי תל-אביב': 604,
  'הפועל תל אביב': 4501,
  'הפועל תל-אביב': 4501,
  'מכבי חיפה': 4195,
  'הפועל באר שבע': 563,
  'בית"ר ירושלים': 657,
  'הפועל חיפה': 2253,
  'מכבי נתניה': 4505,
  'הפועל פתח תקווה': 4488,
  'הפועל פתח-תקווה': 4488,
  'בני סכנין': 4481,
  'עירוני קריית שמונה': 4510,
  'מכבי בני ריינה': 6186,
  'אשדוד': 4507,
  'מ.ס. אשדוד': 4507,
  'הפועל קטמון': 4486,
  'עירוני טבריה': 6181,
  // Additional teams
  'בני יהודה תל-אביב': 4508,
  'הפועל חדרה': 4500,
  'הפועל ירושלים': 4486, // Same as Hapoel Katamon (renamed)
  'הפועל כפר סבא': 4497,
  'הפועל כפר שלם': 6160,
  'הפועל נוף-הגליל': 4487, // Hapoel Nazareth Illit
  'הפועל עכו': 4482,
  'הפועל עפולה': 4483,
  'הפועל ראשון-לציון': 4491,
  'הפועל רמת-גן / גבעתיים': 4489,
  'הפועל רעננה': 4509,
  'מ.ס. כפר קאסם': 4493,
  'מ.ס. מכבי קריית-ים / מועדון ספורט קריית־ים': 20105,
  'מ.ס. קריית-ים': 20105,
  'מכבי הרצליה': 4503,
  'מכבי יפו': 6192, // Maccabi Kabilio Jaffa
  'מכבי פתח-תקווה': 4495
};

// Get upcoming matches for a stadium
app.get('/api/stadiums/:id/matches', async (req, res) => {
  const stadiumId = parseInt(req.params.id);
  
  try {
    // First get stadium name by ID
    const stadiumRow = await new Promise((resolve, reject) => {
      db.get('SELECT name_hebrew FROM stadiums WHERE id = ?', [stadiumId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!stadiumRow) {
      return res.status(404).json({ error: 'Stadium not found' });
    }

    const stadiumName = stadiumRow.name_hebrew.trim();
    
    // Get all entries with this stadium name to merge teams
    const stadiumRows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM stadiums WHERE TRIM(name_hebrew) = ?', [stadiumName], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    if (!stadiumRows || stadiumRows.length === 0) {
      return res.status(404).json({ error: 'Stadium not found' });
    }

    if (!API_FOOTBALL_KEY) {
      return res.json({ 
        matches: [],
        message: 'API-Football key not configured',
        stadium: stadiumName
      });
    }

    // Get all unique teams from all rows
    const allTeams = stadiumRows
      .map(r => r.clubs_playing)
      .filter(Boolean)
      .join(', ')
      .split(',')
      .map(t => t.trim())
      .filter((team, index, arr) => arr.indexOf(team) === index); // Remove duplicates
    
    console.log(`Stadium ${stadiumName} has teams:`, allTeams);
    
    // Get team IDs from mapping
    const teamIds = allTeams.map(team => ISRAELI_TEAMS[team]).filter(Boolean);
    
    if (teamIds.length === 0) {
      return res.json({
        stadium: stadiumName,
        teams: allTeams,
        matches: [],
        message: 'No team IDs found for this stadium'
      });
    }

    // Create reverse mapping (API team ID -> Hebrew name)
    const teamIdToHebrew = {};
    allTeams.forEach(hebrewName => {
      const teamId = ISRAELI_TEAMS[hebrewName];
      if (teamId) {
        teamIdToHebrew[teamId] = hebrewName;
      }
    });
    
    // Fetch upcoming matches for each team from Israeli leagues
    const allMatches = [];
    
    // Israeli league IDs: 383 = Ligat Haal (Premier), 382 = Liga Leumit (Second)
    const israeliLeagues = [383, 382];
    
    for (const teamId of teamIds) {
      try {
        console.log(`Fetching fixtures for team ID: ${teamId} from Israeli leagues`);
        
        // Fetch fixtures from both Israeli leagues
        for (const leagueId of israeliLeagues) {
          // Get only upcoming matches
          const response = await axios.get(`${API_FOOTBALL_BASE_URL}/fixtures`, {
            headers: { 
              'x-apisports-key': API_FOOTBALL_KEY,
              'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            params: {
              league: leagueId,
              team: teamId,
              next: 10,
              timezone: 'Asia/Jerusalem'
            }
          });

          console.log(`Upcoming matches for team ${teamId} in league ${leagueId}:`, response.data.results);

          if (response.data && response.data.response) {
            // Filter only upcoming matches (not started yet) at this stadium (home team)
            const now = Date.now() / 1000; // Convert to seconds
            const teamMatches = response.data.response
              .filter(match => {
                const isUpcoming = match.fixture.timestamp > now;
                const isHomeMatch = match.teams.home.id === teamId;
                const notFinished = !match.fixture.status.short.includes('FT') && 
                                   !match.fixture.status.short.includes('AET') &&
                                   !match.fixture.status.short.includes('PEN');
                return isHomeMatch && isUpcoming && notFinished;
              })
              .map(match => ({
                id: match.fixture.id,
                date: match.fixture.date,
                timestamp: match.fixture.timestamp,
                venue: match.fixture.venue.name,
                league: {
                  name: match.league.name,
                  logo: match.league.logo,
                  round: match.league.round
                },
                home: {
                  id: match.teams.home.id,
                  name: match.teams.home.name,
                  nameHebrew: teamIdToHebrew[match.teams.home.id] || match.teams.home.name,
                  logo: match.teams.home.logo
                },
                away: {
                  id: match.teams.away.id,
                  name: match.teams.away.name,
                  logo: match.teams.away.logo
                },
                status: match.fixture.status.long,
                // Broadcast data not available for Israeli leagues in API-Football
                broadcast: null
              }));

            allMatches.push(...teamMatches);
          }
        }
      } catch (apiError) {
        console.error(`Error fetching matches for team ${teamId} in Israeli leagues:`, apiError.message);
      }
    }

    // Sort by date (soonest first)
    allMatches.sort((a, b) => a.timestamp - b.timestamp);
    
    // For stadiums with multiple teams, get 3 matches per team
    let upcomingMatches;
    if (allTeams.length > 1) {
      // Group matches by home team and get 3 per team
      const matchesByTeam = {};
      allMatches.forEach(match => {
        const teamName = match.home.name;
        if (!matchesByTeam[teamName]) {
          matchesByTeam[teamName] = [];
        }
        if (matchesByTeam[teamName].length < 3) {
          matchesByTeam[teamName].push(match);
        }
      });
      
      // Combine all matches and sort again
      upcomingMatches = Object.values(matchesByTeam).flat().sort((a, b) => a.timestamp - b.timestamp);
    } else {
      // Single team - just get next 3 matches
      upcomingMatches = allMatches.slice(0, 3);
    }

    res.json({
      stadium: stadiumName,
      teams: allTeams,
      matches: upcomingMatches,
      count: upcomingMatches.length
    });

  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});