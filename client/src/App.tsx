import { useEffect, useState } from 'react';
import './App.css';

interface HealthCheck {
  status: string;
  timestamp: string;
  uptime: number;
}

function App() {
  const [health, setHealth] = useState<HealthCheck | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Test API connection
    fetch('/api/../health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🖥️ Heads Up Display</h1>
        <p className="tagline">Modern. Modular. Minimalistic.</p>
      </header>

      <main className="app-main">
        <section className="status-card">
          <h2>Server Status</h2>
          {error && (
            <div className="error">
              <p>❌ Server connection failed</p>
              <p className="error-message">{error}</p>
              <p className="help-text">
                Make sure the backend server is running:<br />
                <code>cd server && npm run dev</code>
              </p>
            </div>
          )}
          {health && (
            <div className="success">
              <p>✅ Status: {health.status}</p>
              <p>⏰ Uptime: {Math.floor(health.uptime)}s</p>
              <p>🕐 Time: {new Date(health.timestamp).toLocaleString()}</p>
            </div>
          )}
          {!health && !error && (
            <div className="loading">
              <p>⏳ Connecting to server...</p>
            </div>
          )}
        </section>

        <section className="info-card">
          <h2>Phase 1: Foundation ✅</h2>
          <ul>
            <li>✅ React 18 + TypeScript + Vite</li>
            <li>✅ Express backend + TypeScript</li>
            <li>✅ API proxy configuration</li>
            <li>✅ Development environment ready</li>
          </ul>
        </section>

        <section className="info-card">
          <h2>Next Steps</h2>
          <ol>
            <li>Implement 9-slice grid layout</li>
            <li>Create widget plugin system</li>
            <li>Build TimeDate widget</li>
            <li>Build Weather widget</li>
            <li>Build Calendar widget</li>
            <li>Build RSS widget</li>
          </ol>
        </section>
      </main>

      <footer className="app-footer">
        <p>See <code>PLAN.md</code> for full roadmap</p>
      </footer>
    </div>
  );
}

export default App;
