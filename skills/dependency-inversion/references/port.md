# Port

Define the smallest stable port used by policy code.

```ts
// ports/chat-port.ts
export interface ChatPort {
  sendMessage(message: string): void;
  onMessage(listener: (message: string) => void): void;
}
```

## Why This Fits DIP
- High-level modules depend on `ChatPort`, not on a transport library.
- Method names express domain intent, not protocol details.
- The contract remains stable while implementations change.

## Placement
- Place the port with policy code (for example `core/ports/chat-port.ts`) or in a shared `ports/` package.

## Common Extensions
- Add connection-state callbacks only if policy behavior needs them.
- Return an unsubscribe function from `onMessage` when listeners must be removed.
