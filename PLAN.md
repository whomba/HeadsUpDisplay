# HeadsUpDisplay - Modernization Plan

## Project Vision
A modular, minimalistic heads-up display with a 9-slice perimeter layout showing personalized information widgets. Designed for portrait mode (landscape compatible) on a dedicated display device.

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

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite (dev server + build)
- CSS Modules or Tailwind CSS
- React Query (data fetching/caching)
- Axios for HTTP requests
- Socket.io-client (future WebSocket support)

**Backend:**
- Node.js + Express
- TypeScript
- Socket.io (future real-time features)
- node-cron (scheduled tasks)
- RSS parser
- Google APIs client library

**Testing:**
- Vitest (unit tests)
- React Testing Library (component tests)
- Playwright (E2E, if needed)

**DevOps:**
- Docker (optional, for deployment)
- PM2 (process management)
- Nginx (reverse proxy)

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

## Deployment

### Target Device
- Raspberry Pi (recommended) or similar
- Display in portrait orientation
- Kiosk mode (full screen browser)
- Auto-start on boot

### Process Management
```bash
pm2 start server/dist/index.js --name hud-server
pm2 startup
pm2 save
```

### Browser Kiosk Mode
```bash
# Chromium kiosk mode
chromium-browser --kiosk --app=http://localhost:3000
```

## Next Steps

1. Initialize new project structure
2. Set up TypeScript configs
3. Create basic Express server
4. Create basic Vite React app
5. Implement grid layout
6. Build first widget (TimeDate)
7. Continue with remaining widgets

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
