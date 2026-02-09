import { useState, useEffect } from 'react';
import { WidgetContainer } from '../../components/WidgetContainer/WidgetContainer';
import './TimeDateWidget.css';

interface TimeDateConfig {
  showSeconds?: boolean;
  showDate?: boolean;
  format24h?: boolean;
  timezone?: string;
}

export function TimeDateWidget({
  config = {}
}: {
  config?: TimeDateConfig;
}) {
  const {
    showSeconds = true,
    showDate = true,
    format24h = false,
  } = config;

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const hours = format24h ? date.getHours() : date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = format24h ? '' : date.getHours() >= 12 ? ' PM' : ' AM';

    if (showSeconds) {
      return `${hours}:${minutes}:${seconds}${ampm}`;
    }
    return `${hours}:${minutes}${ampm}`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <WidgetContainer title="Time & Date" size="small">
      <div className="timedate-widget">
        <div className="timedate-time">
          {formatTime(time)}
        </div>
        {showDate && (
          <div className="timedate-date">
            {formatDate(time)}
          </div>
        )}
      </div>
    </WidgetContainer>
  );
}
