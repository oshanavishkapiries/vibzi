import type { SSEMessage, UseSSEOptions, UseSSEResult } from "@/types/sse";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useCallback, useRef, useState } from "react";

class RetriableError extends Error {}
class FatalError extends Error {}

export function useSSE<T extends SSEMessage = SSEMessage>(
  options: UseSSEOptions
): UseSSEResult<T> {
  const {
    url,
    token,
    retryInterval = 5000,
    eventTypes = ["ANNOUNCEMENT"],
  } = options;

  const [message, setMessage] = useState<T | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const subscribe = useCallback(() => {
    setError(null);
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    (async () => {
      try {
        await fetchEventSource(url, {
          method: "GET",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            Accept: "text/event-stream",
          },
          signal,
          openWhenHidden: true,
          async onopen(response: Response) {
            if (
              response.ok &&
              response.headers
                .get("content-type")
                ?.includes("text/event-stream")
            ) {
              setIsConnected(true);
              setError(null);
            } else if (
              response.status >= 400 &&
              response.status < 500 &&
              response.status !== 429
            ) {
              const errorMsg = `Fatal connection error: ${response.status} ${response.statusText}`;
              setError(errorMsg);
              throw new FatalError(errorMsg);
            } else {
              const errorMsg = `Retriable connection error: ${response.status} ${response.statusText}`;
              setError(errorMsg);
              throw new RetriableError(errorMsg);
            }
          },
          onmessage(message: { event?: string; data?: string }) {
            const eventType = message.event || "message";
            if (eventTypes.includes(eventType)) {
              try {
                const data = message.data ? JSON.parse(message.data) : null;
                if (data) setMessage({ event: eventType, data } as T);
              } catch {
                if (message.data)
                  setMessage({ event: eventType, data: message.data } as T);
              }
            }
          },
          onclose() {
            setIsConnected(false);
            throw new RetriableError("Connection closed unexpectedly");
          },
          onerror(err: Error) {
            const msg = err instanceof Error ? err.message : "Connection error";
            setError(msg);
            setIsConnected(false);
            if (err instanceof FatalError) throw err;
            return retryInterval;
          },
        });
      } catch {
        if (signal.aborted) return;
        setError("Unknown connection error");
        setIsConnected(false);
      }
    })();
  }, [url, token, retryInterval, eventTypes]);

  const unsubscribe = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsConnected(false);
  }, []);

  return {
    message,
    isConnected,
    error,
    subscribe,
    unsubscribe,
  };
}
