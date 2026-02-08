// Widget system types
export type GridZone =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export type WidgetSize = 'small' | 'medium' | 'large';

export interface WidgetConfig {
  id: string;
  name: string;
  description?: string;
  version: string;
  author?: string;
}

export interface WidgetPosition {
  zone: GridZone;
  priority: number; // Lower number = higher priority (appears first)
  size: WidgetSize;
}

export interface WidgetProps<T = any> {
  config?: T;
  onError?: (error: Error) => void;
}

export interface Widget<T = any> {
  config: WidgetConfig;
  defaultPosition: WidgetPosition;
  component: React.ComponentType<WidgetProps<T>>;
  refreshInterval?: number; // milliseconds
  enabled: boolean;
}

export interface WidgetInstance {
  widgetId: string;
  instanceId: string;
  position: WidgetPosition;
  customConfig?: any;
}
