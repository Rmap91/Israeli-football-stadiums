# Israeli Football Stadiums Database

# Israeli Football Stadiums Database 🏟️

A comprehensive web application featuring all Israeli football stadiums with advanced search functionality, nearby places integration, and enhanced matchday information.

## ✨ Features

### Core Stadium Database
- **30+ Israeli Football Stadiums** - Complete database with official names in Hebrew and English
- **Advanced Search** - Real-time search by stadium name, city, or partial matches  
- **Smart Filtering** - Filter by city and capacity ranges
- **Responsive Design** - Mobile-first approach for all devices

### Enhanced Matchday Experience 🎯
- **Nearby Restaurants** - Discover dining options around each stadium
- **Bars & Pubs** - Find the best spots for pre-match drinks
- **Parking Information** - Locate convenient parking near stadiums
- **Public Transportation** - Access to transit stations and routes
- **Interactive Maps** - Direct integration with Google Maps
- **Distance Calculations** - Precise walking distances to nearby amenities

### Technical Features
- **Google Places API Integration** - Real-time data for nearby places
- **Intelligent Caching** - 24-hour cache for optimal performance
- **Hebrew Language Support** - Full RTL support and Hebrew interfaces
- **Stadium Coordinates** - Precise GPS coordinates for all major stadiums
- **RESTful API** - Clean API endpoints for all data access

## 🚀 Quick Start

### Prerequisites
- Node.js 24+ 
- Google Places API Key (for enhanced features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Stadiums in israel"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Google Places API** *(Optional - Enhanced Features)*
   ```bash
   # Copy environment template
   copy .env.example .env
   
   # Add your Google Places API key to .env
   GOOGLE_PLACES_API_KEY=your_actual_api_key_here
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Access the website**
   - Local: http://localhost:3000
   - Production: https://shovalstadiums.azurewebsites.net

## 🗺️ Google Places API Setup

### Getting Your API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create/Select a Project**
   - Create a new project or select existing one
   - Enable billing for the project

3. **Enable Required APIs**
   ```
   ✅ Places API
   ✅ Maps JavaScript API  
   ✅ Geocoding API
   ```

4. **Create API Credentials**
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Copy your API key

5. **Secure Your API Key** *(Recommended)*
   - Click on your API key to edit
   - Under "Application restrictions":
     - Select "HTTP referrers"
     - Add: `localhost:3000/*` and your production domain
   - Under "API restrictions":
     - Select "Restrict key"
     - Choose: Places API, Maps JavaScript API, Geocoding API

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Google Places API Configuration
GOOGLE_PLACES_API_KEY=your_actual_api_key_here

# Application Configuration
NODE_ENV=development
PORT=3000

# Database Configuration  
DATABASE_PATH=./database/stadiums.db
```

## 📊 API Endpoints

### Stadium Data
```http
GET /api/stadiums           # All stadiums grouped by name
GET /api/stadiums/:id       # Individual stadium details  
GET /api/stadiums/:id/details # Enhanced stadium with nearby counts
```

### Enhanced Features *(Requires Google Places API)*
```http
GET /api/stadiums/:id/nearby/:type     # Nearby places by type
GET /api/stadiums/:id/nearby/restaurants # Restaurants near stadium
GET /api/stadiums/:id/nearby/bars        # Bars & pubs near stadium  
GET /api/stadiums/:id/nearby/parking     # Parking near stadium
GET /api/stadiums/:id/nearby/transit     # Public transport options
```

### Admin Functions
```http  
POST /api/admin/refresh-nearby-places  # Refresh all Google Places data
```

## 🏟️ Stadium Data

The database includes 30+ Israeli football stadiums with:

### Basic Information
- **Hebrew Names** - Official stadium names in Hebrew
- **English Names** - Translated names for international users
- **Cities** - Stadium locations across Israel
- **Capacities** - Seating capacity for each venue
- **Home Teams** - Which clubs play at each stadium

### Geographic Data *(16 Major Stadiums)*
- **GPS Coordinates** - Precise latitude/longitude
- **Addresses** - Full street addresses  
- **Distance Calculations** - Walking distances to nearby places

### Featured Stadiums Include:
- 🏟️ **בלומפילד תל אביב** - Bloomfield Stadium, Tel Aviv
- 🏟️ **סמי עופר חיפה** - Sammy Ofer Stadium, Haifa  
- 🏟️ **טדי ירושלים** - Teddy Stadium, Jerusalem
- 🏟️ **נתניה** - Netanya Stadium
- 🏟️ **טרנר באר שבע** - Turner Stadium, Be'er Sheva
- 🏟️ **הקריה רמת גן** - Ramat Gan Stadium
- And many more...

## 🔧 Technical Architecture

### Frontend
- **Pure HTML5/CSS3/JavaScript** - No framework dependencies
- **CSS Grid & Flexbox** - Modern responsive layouts
- **Progressive Enhancement** - Works without JavaScript  
- **Hebrew RTL Support** - Proper right-to-left text flow

### Backend  
- **Node.js + Express.js** - Fast, lightweight server
- **SQLite Database** - Zero-configuration data storage
- **Google Places API** - Real-time nearby places data
- **Intelligent Caching** - Reduces API calls and improves performance

### Data Processing
- **Excel Integration** - Automated loading from Book1.xlsx
- **Coordinate Mapping** - GPS coordinate lookup for major stadiums
- **Database Migration** - Automatic schema updates for new features

## 🌐 Deployment

### Azure App Service *(Current Production)*
- **Live URL**: https://shovalstadiums.azurewebsites.net
- **Node.js 24** runtime
- **SQLite** database in writable directory
- **Environment variables** for API keys

### Deployment Steps
1. Push code to Azure App Service
2. Configure environment variables in Azure Portal
3. Ensure Google Places API key is set  
4. Application auto-deploys and migrates database

## 📱 Usage Guide

### Basic Search
1. **Search by Name** - Type stadium names in Hebrew or English
2. **Filter by City** - Select specific cities from dropdown  
3. **Filter by Capacity** - Choose stadium size ranges
4. **Click Stadium Cards** - View detailed information

### Enhanced Features *(With Google Places API)*
1. **Click Stadium** - Opens detailed modal with tabs
2. **"מקומות סמוכים"** - Browse nearby restaurants, bars, parking
3. **"מיקום ונגישות"** - View coordinates, open in Google Maps
4. **Refresh Data** - Click refresh button for latest Google Places data

## 🎯 Roadmap

### Upcoming Features
- [ ] **Route Planning** - Directions to stadiums via public transport
- [ ] **Bus Lines Integration** - Real-time bus schedules  
- [ ] **Match Calendar** - Upcoming games at each stadium
- [ ] **Weather Integration** - Match day weather forecasts
- [ ] **User Reviews** - Community ratings for nearby places
- [ ] **Photo Gallery** - Stadium and nearby place photos

### Technical Improvements  
- [ ] **PostgreSQL Migration** - For production scaling
- [ ] **API Rate Limiting** - Advanced request throttling
- [ ] **Search Analytics** - User search behavior insights
- [ ] **Mobile App** - React Native companion app

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines and submit pull requests for any improvements.

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`  
4. Push to branch: `git push origin feature/amazing-feature`
5. Submit Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions, issues, or contributions:
- 🌐 **Live Demo**: https://shovalstadiums.azurewebsites.net  
- 📧 **Issues**: Submit via GitHub Issues
- 💬 **Discussions**: Use GitHub Discussions for questions

---

**Built with ❤️ for Israeli Football Fans** 🇮🇱⚽

## Features

- **Advanced Search**: Search stadiums by name (Hebrew/English), city, or partial matches
- **Smart Filters**: Filter by city and capacity ranges
- **Detailed Information**: View comprehensive stadium details including capacity, home teams, and history
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Suggestions**: Get instant search suggestions as you type
- **Interactive Modal**: Click any stadium for detailed information

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js with Express.js
- **Database**: SQLite (development), PostgreSQL (production ready)
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **Security**: Helmet.js, CORS, Rate limiting

## Prerequisites

Before running this application, you need to install:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - This includes npm (Node Package Manager)

## Installation & Setup

1. **Clone or download this project**
   ```bash
   # Navigate to project directory
   cd "Stadiums in israel"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   # For development with auto-restart
   npm run dev
   
   # Or for production
   npm start
   ```

4. **Open your browser**
   - Visit: http://localhost:3000
   - The application will automatically create the database and sample data

## Project Structure

```
israeli-stadiums-database/
├── .github/
│   └── copilot-instructions.md    # Project guidelines
├── server/
│   └── index.js                   # Express.js backend server
├── public/
│   ├── index.html                 # Main HTML page
│   ├── css/
│   │   └── styles.css             # Responsive CSS styles
│   └── js/
│       └── app.js                 # Frontend JavaScript application
├── database/
│   └── stadiums.db                # SQLite database (auto-created)
├── package.json                   # Project dependencies and scripts
└── README.md                      # This file
```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/stadiums` - Get all stadiums
- `GET /api/stadiums/search?q={query}` - Search stadiums by name or city
- `GET /api/stadiums/:id` - Get specific stadium by ID

## Stadium Data Structure

Each stadium includes:
- Name (Hebrew and English)
- City location
- Capacity
- Home team(s)
- Year built/renovated
- Surface type
- GPS coordinates
- Historical description

## Sample Stadiums Included

- **Bloomfield Stadium** (Tel Aviv) - Home to Hapoel & Maccabi Tel Aviv
- **Sammy Ofer Stadium** (Haifa) - Modern stadium opened in 2014
- **Teddy Stadium** (Jerusalem) - Jerusalem's main football venue

## Development

### Adding New Stadiums

1. Use the API to add stadiums to the database
2. Or modify the sample data in `server/index.js`
3. Restart the server to see changes

### Customization

- **Styling**: Edit `public/css/styles.css`
- **Functionality**: Modify `public/js/app.js`
- **Backend Logic**: Update `server/index.js`
- **Database Schema**: Modify the database initialization in the server

## Security Features

- Rate limiting (100 requests per 15 minutes)
- CORS enabled
- Helmet.js for security headers
- Input sanitization
- SQL injection prevention

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - Feel free to use this project for educational purposes.

## Contributing

This is an educational project. Feel free to:
- Add more Israeli stadiums
- Improve the search functionality
- Enhance the UI/UX
- Add map integration
- Include stadium photos

## Troubleshooting

### Node.js Not Installed
If you see "node is not recognized" error:
1. Download Node.js from https://nodejs.org/
2. Install it and restart your terminal
3. Verify with: `node --version`

### Port Already in Use
If port 3000 is busy:
1. Stop other applications using port 3000
2. Or change the PORT in the server file

### Database Issues
The SQLite database is created automatically. If there are issues:
1. Delete the `database/stadiums.db` file
2. Restart the server to recreate it

## Next Steps

To enhance this project, consider adding:
- Stadium photo uploads
- Map integration with Google Maps
- User reviews and ratings
- Advanced search filters
- Admin panel for data management
- Multi-language support