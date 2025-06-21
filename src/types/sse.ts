export interface SSEMessage {
  event?: string;
  data?: any;
}

export interface SSEClient {
  connect: () => void;
  disconnect: () => void;
}

export interface UseSSEOptions {
  url: string;
  token?: string | null;
  retryInterval?: number;
  eventTypes?: string[];
}

export interface UseSSEResult<T> {
  message: T | null;
  isConnected: boolean;
  error: string | null;
  subscribe: () => void;
  unsubscribe: () => void;
}
