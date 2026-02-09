import { GridLayout } from './components/Grid/GridLayout';
import { TimeDateWidget } from './widgets/TimeDate/TimeDateWidget';
import { WidgetContainer } from './components/WidgetContainer/WidgetContainer';
import './App.css';

function App() {
  return (
    <GridLayout
      topLeft={
        <>
          <TimeDateWidget config={{ showSeconds: true, showDate: true }} />
          <WidgetContainer title="System" size="small">
            <div style={{ fontSize: '0.75rem', color: '#888' }}>
              Phase 2 Testing
            </div>
          </WidgetContainer>
        </>
      }
      top={
        <>
          <TimeDateWidget config={{ showSeconds: false, showDate: false, format24h: true }} />
          <TimeDateWidget config={{ showSeconds: true, showDate: false }} />
        </>
      }
      topRight={
        <>
          <WidgetContainer title="Status" size="small">
            <div className="data-row">
              <span className="data-label">Grid</span>
              <span className="data-value" style={{ fontSize: '1rem' }}>OK</span>
            </div>
          </WidgetContainer>
        </>
      }
      left={
        <>
          <TimeDateWidget config={{ showSeconds: true }} />
          <WidgetContainer title="Weather Placeholder" size="medium">
            <div className="data-row">
              <span className="data-label">Temperature</span>
              <span className="data-value">72°F</span>
            </div>
            <div className="data-row">
              <span className="data-label">Conditions</span>
              <span style={{ color: '#00d4ff' }}>Partly Cloudy</span>
            </div>
          </WidgetContainer>
          <WidgetContainer title="Air Quality" size="small">
            <div className="data-row">
              <span className="data-label">AQI</span>
              <span className="data-value" style={{ fontSize: '1.2rem' }}>45</span>
            </div>
          </WidgetContainer>
        </>
      }
      right={
        <>
          <WidgetContainer title="Calendar Placeholder" size="medium">
            <div style={{ fontSize: '0.85rem', color: '#e0e0e0' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#00ff88' }}>Today, 2:00 PM</strong>
                <div style={{ color: '#888', fontSize: '0.75rem' }}>Team Meeting</div>
              </div>
              <div>
                <strong style={{ color: '#00ff88' }}>Tomorrow, 9:00 AM</strong>
                <div style={{ color: '#888', fontSize: '0.75rem' }}>Project Review</div>
              </div>
            </div>
          </WidgetContainer>
          <TimeDateWidget config={{ showSeconds: false }} />
          <WidgetContainer title="RSS Placeholder" size="small">
            <div style={{ fontSize: '0.7rem', color: '#888' }}>
              Latest headlines...
            </div>
          </WidgetContainer>
        </>
      }
      bottom={
        <>
          <WidgetContainer title="Transit" size="small">
            <div className="data-row">
              <span className="data-label">Next Bus</span>
              <span className="data-value" style={{ fontSize: '1rem' }}>12 min</span>
            </div>
          </WidgetContainer>
        </>
      }
      bottomLeft={
        <>
          <TimeDateWidget config={{ showSeconds: true, format24h: true }} />
        </>
      }
      bottomRight={
        <>
          <WidgetContainer title="System Info" size="small">
            <div style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'monospace' }}>
              9-Slice Grid Active<br />
              Phase 2 Complete ✅
            </div>
          </WidgetContainer>
        </>
      }
    />
  );
}

export default App;
