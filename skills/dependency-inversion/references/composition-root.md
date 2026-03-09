# Composition Root

The composition root is the place where you are allowed to know about concrete implementations.

Its job is simple:

- choose the adapter
- instantiate it
- inject it into the policy-facing code

For example, `src/main.ts` or `src/bootstrap.ts` is often the composition root:

```ts
// Choose one implementation:
// import { GrpcMessageGateway } from "./adapters/grpc-message-gateway";
import { HttpMessageGateway } from "./adapters/http-message-gateway";
// import { WebSocketMessageGateway } from "./adapters/web-socket-message-gateway";

import { ConversationService } from "./conversation-service";

const messageGateway = new HttpMessageGateway();
const conversationService = new ConversationService(messageGateway);

conversationService.start();
```

That file proves the dependency inversion is working:

- `ConversationService` depends only on `MessageGateway`
- concrete transport knowledge is isolated to `main.ts`
- swapping implementations changes one import and one instantiation point

## Why This Boundary Matters

Without a composition root, concrete classes tend to leak inward:

- UI code starts importing WebSocket clients directly
- services instantiate SDKs in constructors
- selection logic gets duplicated across the codebase

Keeping composition explicit makes the dependency direction easy to audit and change.

## When A Simple Entry Point Is Enough

Prefer a plain entry file when possible. You do not need a DI container just to satisfy DIP.

Use a lightweight factory or configuration branch only when selection is genuinely dynamic:

```ts
const adapter = process.env.MESSAGE_GATEWAY ?? "http";

const messageGateway =
  adapter === "web-socket"
    ? new WebSocketMessageGateway()
    : adapter === "grpc"
      ? new GrpcMessageGateway()
      : new HttpMessageGateway();

const conversationService = new ConversationService(messageGateway);
conversationService.start();
```

If the branch becomes noisy, that is a signal to extract a tiny factory, not to move adapter selection into the policy layer.

## Checklist

Before calling a refactor "done," verify:

1. Policy modules import only the port type, not concrete adapters.
2. Concrete adapters are instantiated in one edge location.
3. Swapping implementations does not require edits in policy code.
4. Tests can provide a fake without booting real infrastructure.
