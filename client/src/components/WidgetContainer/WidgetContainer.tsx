import { ReactNode } from 'react';
import './WidgetContainer.css';

interface WidgetContainerProps {
  title?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function WidgetContainer({
  title,
  children,
  size = 'medium',
  className = ''
}: WidgetContainerProps) {
  return (
    <div className={`widget-container widget-container-${size} ${className}`}>
      {title && (
        <div className="widget-header">
          <h3 className="widget-title">{title}</h3>
        </div>
      )}
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
}
