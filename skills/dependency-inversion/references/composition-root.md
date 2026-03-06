# Composition Root

Select and inject concrete implementations at a composition boundary (for example an app entry point, DI container, or service locator setup).

Example layout used by this snippet:
- `src/main.ts` (composition root)
- `src/core/chat-room.ts` (policy module)
- `src/ports/chat-port.ts` (port)
- `src/adapters/web-socket-chat-adapter.ts` (adapter)
- `src/adapters/long-polling-chat-adapter.ts` (adapter)

```ts
// src/main.ts
import { ChatRoom } from "./core/chat-room";
import type { ChatPort } from "./ports/chat-port";
// swap adapter by changing this single import:
import { WebSocketChatAdapter } from "./adapters/web-socket-chat-adapter";
// import { LongPollingChatAdapter } from "./adapters/long-polling-chat-adapter";
// import { SseChatAdapter } from "./adapters/sse-chat-adapter";

const chatPort: ChatPort = new WebSocketChatAdapter();
const room = new ChatRoom(chatPort);

room.start();
```

Swapping from WebSocket to long-polling changes only import and instantiation code. `ChatRoom` policy code stays unchanged.

## Why This Fits DIP
- Concrete classes are referenced only at the composition boundary.
- Dependency direction is explicit and easy to audit.
- Policy code remains independent from infrastructure decisions.

## Minimal Config
```ts
const adapter = process.env.CHAT_ADAPTER ?? "web-socket";
const chatPort: ChatPort =
  adapter === "long-polling"
    ? new LongPollingChatAdapter()
    : new WebSocketChatAdapter();
const room = new ChatRoom(chatPort);
```
