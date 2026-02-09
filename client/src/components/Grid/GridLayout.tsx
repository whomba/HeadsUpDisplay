import { ReactNode } from 'react';
import './GridLayout.css';

interface GridLayoutProps {
  topLeft?: ReactNode;
  top?: ReactNode;
  topRight?: ReactNode;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  bottomLeft?: ReactNode;
  bottom?: ReactNode;
  bottomRight?: ReactNode;
}

export function GridLayout({
  topLeft,
  top,
  topRight,
  left,
  center,
  right,
  bottomLeft,
  bottom,
  bottomRight,
}: GridLayoutProps) {
  return (
    <div className="grid-layout">
      {/* Top Row */}
      <div className="grid-zone grid-zone-top-left">
        {topLeft}
      </div>
      <div className="grid-zone grid-zone-top">
        {top}
      </div>
      <div className="grid-zone grid-zone-top-right">
        {topRight}
      </div>

      {/* Middle Row */}
      <div className="grid-zone grid-zone-left">
        {left}
      </div>
      <div className="grid-zone grid-zone-center">
        {center || (
          <div className="center-placeholder">
            <div className="center-time">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
      <div className="grid-zone grid-zone-right">
        {right}
      </div>

      {/* Bottom Row */}
      <div className="grid-zone grid-zone-bottom-left">
        {bottomLeft}
      </div>
      <div className="grid-zone grid-zone-bottom">
        {bottom}
      </div>
      <div className="grid-zone grid-zone-bottom-right">
        {bottomRight}
      </div>
    </div>
  );
}
