# HeadsUpDisplay (HUD) - Modern Version

A modular, minimalistic heads-up display with a 9-slice perimeter layout showing personalized widgets.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- API keys (see [PLAN.md](./PLAN.md) for setup instructions)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd HeadsUpDisplay
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Install dependencies:**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

### Development

Run both server and client in separate terminals:

```bash
# Terminal 1 - Backend Server
cd server
npm run dev
# Server runs on http://localhost:3000

# Terminal 2 - Frontend Client
cd client
npm run dev
# Client runs on http://localhost:5173
```

Open your browser to `http://localhost:5173`

## 📁 Project Structure

```
HeadsUpDisplay/
├── client/          # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── widgets/     # Widget plugins
│   │   ├── hooks/       # Custom React hooks
│   │   └── services/    # API clients
├── server/          # Express + TypeScript backend
│   ├── src/
│   │   ├── api/         # API routes
│   │   ├── services/    # Business logic
│   │   └── types/       # TypeScript definitions
├── shared/          # Shared TypeScript types
├── website/         # Legacy project (reference only)
└── PLAN.md          # Comprehensive project plan
```

## 🎨 Features

### Current (Phase 1)
- ✅ Modern TypeScript setup (client + server)
- ✅ Hot reload development environment
- ✅ API structure for widgets

### Upcoming (Phase 2+)
- 9-slice grid layout system
- Weather widget (multi-location with conditional display)
- Calendar widget (with traffic alerts)
- RSS feed aggregator
- Time/Date widget

See [PLAN.md](./PLAN.md) for complete feature roadmap.

## 🔑 API Keys Setup

You'll need API keys for:
1. **OpenWeatherMap** - Weather data (free tier: 1,000 calls/day)
2. **Google Calendar API** - Calendar events (free)
3. **Google Maps API** - Traffic data ($200/month free credit)

See [PLAN.md](./PLAN.md#api-keys--setup) for detailed setup instructions.

## 🧪 Testing

```bash
# Server tests
cd server
npm test

# Client tests
cd client
npm test
```

## 📦 Production Build

```bash
# Build server
cd server
npm run build

# Build client
cd client
npm run build

# Start production server
cd server
npm start
```

## 🎯 Next Steps

1. Obtain API keys (see PLAN.md)
2. Configure `.env` file
3. Run development servers
4. Start building widgets!

## 📝 License

MIT

---

For detailed architecture, widget system design, and implementation plan, see [PLAN.md](./PLAN.md).
