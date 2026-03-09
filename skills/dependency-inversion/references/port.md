# Port

A port is the smallest contract the policy layer needs in order to do its job.

For example, a conversation feature might not care whether messages arrive over WebSocket, SSE, or gRPC. It only cares that it can:

- send a message
- receive new messages

That is why the port is tiny:

```ts
interface MessageGateway {
  sendMessage(message: string): void;
  onMessage(listener: (message: string) => void): void;
}
```

## How To Design A Good Port

Start from the policy module and ask, "What does this code need to be able to do?" Then stop there.

Good port traits:

- small enough that a fake implementation is easy to write
- named with domain intent, not transport or vendor intent
- stable across multiple implementations
- owned by the high-level side of the boundary

Weak port traits:

- mirrors the current library API method-for-method
- exposes transport lifecycle details the policy does not care about
- forces every implementation to support detail-specific options
- exists only because "every class should have an interface"

## Policy-First Naming

Prefer names like:

- `sendMessage`
- `saveDraft`
- `chargeCustomer`
- `loadProfile`

Avoid names like:

- `emit`
- `postToGraphQL`
- `runSql`
- `createStripePaymentIntent`

Those names usually reveal that the abstraction is being designed from the infrastructure side instead of the policy side.

## Placement

Place the port close to the policy code that owns it.

Examples:

- `src/core/message-gateway.ts`
- `src/domain/ports/notification-sender.ts`
- `packages/billing/src/ports/payment-gateway.ts`

Keeping the port near the high-level module makes ownership clear: infrastructure depends on the port, not the other way around.

## Common Extensions

Add new methods only when the policy actually needs them.

Examples:

- Return an unsubscribe function from `onMessage` if the UI needs cleanup.
- Return a `Promise<void>` from `sendMessage` only if the policy needs to await success or handle retries.
- Add connection state only if the policy needs to render or react to that state.

## Quick Checklist

Before finalizing a port, check:

1. Can the policy module describe why each method exists?
2. Could a simple in-memory fake implement it without dragging in infrastructure concerns?
3. Would the method names still make sense if the underlying transport changed tomorrow?
