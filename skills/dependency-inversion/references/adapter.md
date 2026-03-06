# Adapter

Implement multiple transports behind the same port.

```ts
// adapters/web-socket-chat-adapter.ts
import type { ChatPort } from "../ports/chat-port";

export class WebSocketChatAdapter implements ChatPort {
  private ws = new WebSocket("ws://localhost:3000");

  sendMessage(message: string): void {
    this.ws.send(message);
  }

  onMessage(listener: (message: string) => void): void {
    this.ws.onmessage = (event) => listener(event.data);
  }
}

// adapters/long-polling-chat-adapter.ts
import type { ChatPort } from "../ports/chat-port";

export class LongPollingChatAdapter implements ChatPort {
  sendMessage(message: string): void {
    // POST message to server
  }

  onMessage(listener: (message: string) => void): void {
    // poll server for new messages
  }
}

// adapters/in-memory-chat-adapter.ts
import type { ChatPort } from "../ports/chat-port";

export class InMemoryChatAdapter implements ChatPort {
  public sent: string[] = [];
  private listeners: ((message: string) => void)[] = [];

  sendMessage(message: string): void {
    this.sent.push(message);
    this.listeners.forEach((fn) => fn(message));
  }

  onMessage(listener: (message: string) => void): void {
    this.listeners.push(listener);
  }
}
```

## Why This Fits DIP
- Every adapter depends on the `ChatPort` port.
- Policy code can swap adapters without any changes.
- Protocol concerns stay in adapters, not in policy.

## Testing
- Prefer the in-memory adapter for deterministic policy tests.

## Placement
- Store concrete adapters under `adapters/` or `infrastructure/`.
