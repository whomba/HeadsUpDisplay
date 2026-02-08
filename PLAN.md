# HeadsUpDisplay - Modernization Plan

## Project Vision
A modular, minimalistic heads-up display with a 9-slice perimeter layout showing personalized information widgets. Designed for portrait mode (landscape compatible) on a dedicated display device.

## Target Hardware
- **Current**: Laptop monitor
- **Future**: External monitor (portrait orientation)
- **Recommended specs**:
  - 1080x1920 resolution (portrait) or higher
  - Always-on display capability
  - Touch screen optional but nice-to-have

## API Keys & Setup

To run this project, you'll need to obtain API keys from the following services:

### 1. Weather API
**Recommended: OpenWeatherMap (Free tier available)**
- **Sign up**: https://openweathermap.org/api
- **Free tier**: 1,000 calls/day, 60 calls/minute
- **What you need**: API Key
- **Cost**: Free (or $40/month for more calls)
- **Alternative**: Visual Crossing (https://www.visualcrossing.com/) - 1,000 calls/day free

**Steps:**
1. Create account at OpenWeatherMap
2. Go to API Keys section
3. Generate new API key
4. Add to `.env` as `WEATHER_API_KEY`

### 2. Google Calendar API
**Google Cloud Platform**
- **Console**: https://console.cloud.google.com/
- **Documentation**: https://developers.google.com/calendar/api/quickstart/nodejs
- **Cost**: Free (with generous quotas)

**Steps:**
1. Go to Google Cloud Console
2. Create a new project (or select existing)
3. Enable "Google Calendar API"
4. Create credentials → OAuth 2.0 Client ID → Web application
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`
6. Download credentials JSON
7. Add `GOOGLE_CALENDAR_CLIENT_ID` and `GOOGLE_CALENDAR_CLIENT_SECRET` to `.env`

**Note**: First time running, you'll need to authorize the app to access your calendar

### 3. Google Maps API (for Traffic)
**Google Cloud Platform**
- **Console**: https://console.cloud.google.com/
- **Documentation**: https://developers.google.com/maps/documentation/directions/overview
- **Cost**: $200 free credit/month (then $5-$10 per 1000 requests)

**Steps:**
1. In same Google Cloud project as Calendar
2. Enable "Directions API"
3. Create API Key in Credentials
4. Restrict key to Directions API only (security best practice)
5. Add to `.env` as `GOOGLE_MAPS_API_KEY`

### 4. RSS Feeds
**No API key needed!** RSS feeds are publicly accessible. You just need URLs.

**Popular RSS sources:**
- Hacker News: `https://news.ycombinator.com/rss`
- Reddit: `https://www.reddit.com/r/[subreddit]/.rss`
- News sites: Most have `/rss` or `/feed` endpoints
- Blogs: Usually have RSS icon in footer

**Finding RSS feeds:**
- Look for RSS icon on websites
- Try appending `/rss`, `/feed`, or `/feed.xml` to site URLs
- Use browser extension: "RSS Feed Reader" or "Feedbro"

### 5. Optional APIs (Phase 3+)

**Air Quality - AirNow API (EPA)**
- **Sign up**: https://docs.airnow.gov/account/request/
- **Cost**: Free
- **Approval**: Usually 1-2 business days

**King County Metro Transit**
- **API**: https://kingcounty.gov/en/dept/metro/travel-options/metro-online/developer-resources
- **OneBusAway API**: http://pugetsound.onebusaway.org/p/OneBusAwayApiService
- **Cost**: Free, no key needed for basic usage

**Package Tracking**
- Manual input or email parsing (no API needed initially)
- **AfterShip API**: https://www.aftership.com/docs/api/4 (free tier available)

**Stock/Crypto**
- **Alpha Vantage**: https://www.alphavantage.co/ (free, 5 calls/min)
- **Finnhub**: https://finnhub.io/ (free tier: 60 calls/min)
- **CoinGecko**: https://www.coingecko.com/en/api (free, no key needed)

### API Key Security
⚠️ **IMPORTANT**:
- Never commit `.env` file to git (already in `.gitignore`)
- Use backend proxy for all API calls (keeps keys server-side)
- Rotate keys if accidentally exposed
- Set up API key restrictions in cloud consoles

## Core Features

### Phase 1: Foundation
- [x] Project planning
- [ ] Modern React 18 + TypeScript + Vite setup
- [ ] Express backend with API proxying
- [ ] 9-slice grid layout system (responsive)
- [ ] Widget plugin architecture
- [ ] Environment configuration

### Phase 2: Essential Widgets

#### 1. Weather Widget
**Locations & Logic:**
- **98133 (Shoreline)**: Always displayed
- **Quilcene, WA**: Display if:
  - Within 5 days of weekend
  - Dramatic weather change detected (>20°F swing, rain→snow, etc.)
  - 2+ consecutive days of freezing temps (≤32°F)
- **Flight destinations**: Show 3 days before departure (parsed from calendar)

**Data needed:**
- Current conditions
- 7-day forecast
- Alerts/warnings

#### 2. Calendar Widget
- Google Calendar API v3 integration
- Display upcoming events (next 5 days)
- **Traffic alerts**: If event has location & starts within 2 hours, check traffic
- Flight detection for weather widget integration

#### 3. RSS Feed Widget
- Configurable feed sources
- Aggregated display
- Update frequency control
- Read/unread state

#### 4. Time/Date Widget
- Current time
- Current date
- Optional: sunrise/sunset

### Phase 3: Enhanced Widgets
- [ ] Air Quality Index (AQI) for 98133
- [ ] Transit/Bus Schedule (King County Metro)
- [ ] News Headlines (filterable topics)
- [ ] Package Tracking
- [ ] Stock/Crypto Tickers
- [ ] Moon phase & astronomical info
- [ ] Spotify Now Playing

### Phase 4: Future Enhancements (TODO list)
- [ ] Camera + person detection → personalized display
- [ ] Email integration
- [ ] Google Photos slideshow
- [ ] Motion sensor integration (WebSocket)
- [ ] Voice commands
- [ ] Mobile app for configuration

## Architecture

### Technology Stack ✅ CONFIRMED

**Frontend:**
- **React 18+** with **TypeScript** (strict mode)
- **Vite 5+** (blazing fast dev server + optimized builds)
- **CSS Modules** or **Tailwind CSS** (styling approach)
- **TanStack Query (React Query)** v5 (data fetching, caching, refetching)
- **Axios** (HTTP client with interceptors)
- **Socket.io-client** (future WebSocket support for motion sensors)
- **date-fns** (date manipulation)

**Backend:**
- **Node.js 18+** with **Express**
- **TypeScript** (strict mode, shared types with frontend)
- **Socket.io** (future real-time features)
- **node-cron** (scheduled tasks for cache warming)
- **rss-parser** (RSS feed parsing)
- **googleapis** (Google Calendar, Google Maps APIs)
- **axios** (for external API calls)
- **dotenv** (environment variables)

**Testing:**
- **Vitest** (unit tests - fast, Vite-native)
- **React Testing Library** (component tests)
- **Playwright** (E2E, if needed)

**Development Tools:**
- **ESLint** + **Prettier** (code quality)
- **TypeScript ESLint** (type-aware linting)
- **Husky** (git hooks)
- **lint-staged** (pre-commit checks)

**DevOps/Deployment:**
- **PM2** (process management, auto-restart)
- **Docker** (optional, for containerized deployment)
- **Nginx** (optional, reverse proxy for production)

### Project Structure

```
HeadsUpDisplay/
├── server/
│   ├── src/
│   │   ├── api/
│   │   │   ├── weather.ts
│   │   │   ├── calendar.ts
│   │   │   ├── rss.ts
│   │   │   └── traffic.ts
│   │   ├── services/
│   │   │   ├── WeatherService.ts
│   │   │   ├── CalendarService.ts
│   │   │   ├── RSSService.ts
│   │   │   ├── TrafficService.ts
│   │   │   └── CacheService.ts
│   │   ├── types/
│   │   ├── utils/
│   │   ├── middleware/
│   │   └── index.ts
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Grid/
│   │   │   │   ├── GridLayout.tsx
│   │   │   │   ├── GridCell.tsx
│   │   │   │   └── types.ts
│   │   │   ├── common/
│   │   │   │   ├── Loading.tsx
│   │   │   │   ├── Error.tsx
│   │   │   │   └── Card.tsx
│   │   ├── widgets/
│   │   │   ├── Weather/
│   │   │   │   ├── WeatherWidget.tsx
│   │   │   │   ├── CurrentConditions.tsx
│   │   │   │   ├── Forecast.tsx
│   │   │   │   └── types.ts
│   │   │   ├── Calendar/
│   │   │   │   ├── CalendarWidget.tsx
│   │   │   │   ├── Event.tsx
│   │   │   │   ├── TrafficAlert.tsx
│   │   │   │   └── types.ts
│   │   │   ├── RSS/
│   │   │   │   ├── RSSWidget.tsx
│   │   │   │   ├── FeedItem.tsx
│   │   │   │   └── types.ts
│   │   │   ├── TimeDate/
│   │   │   │   └── TimeDateWidget.tsx
│   │   │   ├── registry.ts
│   │   │   └── types.ts
│   │   ├── hooks/
│   │   │   ├── useWeather.ts
│   │   │   ├── useCalendar.ts
│   │   │   ├── useRSS.ts
│   │   │   └── useInterval.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── tests/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── shared/
│   └── types/          # Shared types between client/server
├── .env.example
├── .gitignore
├── docker-compose.yml  # Optional
└── README.md
```

## Widget Plugin System

### Widget Interface

```typescript
interface WidgetConfig {
  id: string;
  name: string;
  description: string;
  version: string;
  author?: string;
}

interface WidgetPosition {
  zone: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  priority: number; // Lower = higher priority
  size: 'small' | 'medium' | 'large';
}

interface WidgetProps {
  config: any; // Widget-specific config
  onError?: (error: Error) => void;
}

interface Widget {
  config: WidgetConfig;
  defaultPosition: WidgetPosition;
  component: React.ComponentType<WidgetProps>;
  refreshInterval?: number; // milliseconds
  enabled: boolean;
}
```

### Widget Registry

Widgets are registered in `client/src/widgets/registry.ts`:

```typescript
import { Weather } from './Weather/WeatherWidget';
import { Calendar } from './Calendar/CalendarWidget';
import { RSS } from './RSS/RSSWidget';
import { TimeDate } from './TimeDate/TimeDateWidget';

export const widgetRegistry: Widget[] = [
  {
    config: { id: 'time-date', name: 'Time & Date', version: '1.0.0' },
    defaultPosition: { zone: 'top', priority: 1, size: 'small' },
    component: TimeDate,
    refreshInterval: 1000,
    enabled: true,
  },
  {
    config: { id: 'weather', name: 'Weather', version: '1.0.0' },
    defaultPosition: { zone: 'right', priority: 1, size: 'large' },
    component: Weather,
    refreshInterval: 600000, // 10 minutes
    enabled: true,
  },
  // ... more widgets
];
```

## Grid Layout System

### 9-Slice Design

```
┌─────────┬──────────────────┬─────────┐
│  TL     │      TOP         │    TR   │
│ corner  │     zone         │  corner │
├─────────┼──────────────────┼─────────┤
│         │                  │         │
│  LEFT   │      EMPTY       │  RIGHT  │
│  zone   │   (background    │  zone   │
│         │    or mirror)    │         │
│         │                  │         │
├─────────┼──────────────────┼─────────┤
│  BL     │     BOTTOM       │    BR   │
│ corner  │      zone        │  corner │
└─────────┴──────────────────┴─────────┘
```

**Responsive behavior:**
- Portrait mode (default): Emphasize left/right zones
- Landscape mode: Emphasize top/bottom zones
- Each zone scrolls independently if content overflows
- Middle stays empty (optional: ambient visuals like clock face, animations)

## API Design

### Weather API
```
GET /api/weather/:location
Response: {
  location: string,
  current: { temp, condition, icon, wind, humidity, ... },
  forecast: [{ date, high, low, condition, icon, precipChance }],
  alerts: [...],
  shouldDisplay: boolean  // Server calculates display logic for Quilcene
}
```

### Calendar API
```
GET /api/calendar
Response: {
  events: [{
    id, title, start, end, location,
    trafficAlert?: { duration, delay, route }
  }],
  flightEvents: [{ destination, date }]  // For weather widget
}
```

### RSS API
```
GET /api/rss
Response: {
  feeds: [{
    source, title, link, pubDate, summary, thumbnail
  }]
}
```

## Configuration

### Environment Variables (`.env`)
```
# Server
PORT=3000
NODE_ENV=development

# APIs
WEATHER_API_KEY=your_key_here
WEATHER_API_PROVIDER=openweathermap  # or visualcrossing, weatherapi
GOOGLE_CALENDAR_CLIENT_ID=your_client_id
GOOGLE_CALENDAR_CLIENT_SECRET=your_secret
GOOGLE_MAPS_API_KEY=your_key_here

# Weather Locations
PRIMARY_ZIP=98133
SECONDARY_LOCATION=Quilcene,WA

# RSS Feeds (comma-separated)
RSS_FEEDS=https://feed1.com,https://feed2.com

# Cache settings
CACHE_TTL_WEATHER=600  # 10 minutes
CACHE_TTL_CALENDAR=300 # 5 minutes
CACHE_TTL_RSS=900      # 15 minutes
```

### User Config (`config.json`)
```json
{
  "display": {
    "orientation": "portrait",
    "theme": "dark",
    "animations": true
  },
  "widgets": {
    "weather": {
      "enabled": true,
      "locations": {
        "primary": "98133",
        "secondary": {
          "location": "Quilcene, WA",
          "rules": {
            "weekendProximity": 5,
            "freezingDaysThreshold": 2,
            "tempChangeThreshold": 20
          }
        }
      },
      "units": "fahrenheit"
    },
    "calendar": {
      "enabled": true,
      "maxDays": 5,
      "trafficAlertsEnabled": true,
      "trafficAlertWindow": 120
    },
    "rss": {
      "enabled": true,
      "maxItems": 10,
      "feeds": [
        "https://news.ycombinator.com/rss",
        "https://example.com/feed"
      ]
    }
  }
}
```

## Testing Strategy

### Unit Tests
- All utility functions
- Service layer logic
- Weather display logic (especially Quilcene conditions)
- Traffic alert calculations

### Component Tests
- Each widget renders correctly
- Error states handled
- Loading states displayed
- Data updates trigger re-renders

### Integration Tests
- API endpoints return correct data
- Widget data fetching works
- Cache invalidation works

### E2E Tests (optional)
- Full app loads in browser
- Widgets display data
- Grid layout responsive behavior

## Development Workflow

1. **Phase 1**: Setup monorepo structure, basic server, basic client
2. **Phase 2**: Implement grid layout + one simple widget (TimeDate)
3. **Phase 3**: Add Weather widget with full logic
4. **Phase 4**: Add Calendar widget with traffic
5. **Phase 5**: Add RSS widget
6. **Phase 6**: Polish, testing, deployment

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git
- Text editor (VS Code recommended)

### Initial Setup

1. **Obtain API keys** (see API Keys & Setup section above)
   - Start with OpenWeatherMap (immediate access)
   - Google Calendar can be set up later
   - RSS needs no keys

2. **Project will be created as:**
   ```
   HeadsUpDisplay/
   ├── website/        # Old project (keep for reference)
   ├── client/         # New React app
   ├── server/         # New Express backend
   └── shared/         # Shared TypeScript types
   ```

3. **Development mode:**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

4. **Access at**: `http://localhost:5173` (Vite dev server)

### Configuration

Create `.env` file in project root with your API keys (see Configuration section).

## Deployment

### Current Setup (Development)
- **Device**: Laptop monitor
- **Mode**: Browser window
- **Development**: Hot reload enabled
- **Access**: http://localhost:5173

### Future Production Setup
- **Device**: External monitor (portrait orientation recommended)
- **Options**:
  - Laptop driving external monitor
  - Raspberry Pi + dedicated display
  - Old tablet/iPad in kiosk mode
- **Kiosk mode**: Full screen browser

### Process Management (Production)
```bash
# Build for production
npm run build

# Start with PM2
pm2 start server/dist/index.js --name hud-server
pm2 startup
pm2 save
```

### Browser Kiosk Mode
```bash
# Chromium/Chrome kiosk mode (Linux/Pi)
chromium-browser --kiosk --app=http://localhost:3000

# Chrome kiosk mode (Mac)
open -a "Google Chrome" --args --kiosk --app=http://localhost:3000

# Auto-start on boot (systemd service or startup script)
```

### Docker Deployment (Optional)
```bash
docker-compose up -d
```

## Next Steps

### Immediate (Phase 1)
1. ✅ Create comprehensive plan
2. Initialize new project structure (client/server/shared folders)
3. Set up TypeScript configs
4. Create basic Express server with health check
5. Create basic Vite React app with TypeScript
6. Set up basic routing and dev environment
7. Create `.env.example` template

### Phase 2
1. Implement 9-slice grid layout component
2. Make it responsive (portrait/landscape)
3. Build simple TimeDate widget to test architecture
4. Verify widget plugin system works

### Phase 3+
1. Build Weather widget with multi-location logic
2. Build Calendar widget with traffic alerts
3. Build RSS widget
4. Add tests
5. Polish UI/UX
6. Deploy to external monitor

## Future TODO List
- [ ] Camera integration for person detection
- [ ] Email notifications widget
- [ ] Google Photos integration
- [ ] Motion sensor WebSocket integration
- [ ] Voice command support
- [ ] Mobile configuration app
- [ ] Multi-user profiles
- [ ] Screen saver mode
- [ ] Energy-saving schedules
- [ ] Gesture controls
