# Adapter

An adapter is the low-level implementation of a port.

Its job is to translate between the policy-owned abstraction and one concrete detail such as WebSocket, SSE, gRPC, REST, Prisma, Stripe, or the filesystem.

For example, several implementations might satisfy the same `MessageGateway` port:

- `WebSocketMessageGateway`
- `SseMessageGateway`
- `GrpcMessageGateway`
- `InMemoryMessageGateway`

## What Belongs In An Adapter

Adapters may own:

- connection setup and teardown
- protocol-specific payload translation
- SDK or framework calls
- serialization and deserialization
- retries or detail-specific error mapping when the policy should not see raw infrastructure behavior

Adapters should not own:

- business rules
- application flow decisions
- UI decisions
- cross-cutting selection logic about which adapter to use

## Example

Each adapter implements the same port while hiding different transport mechanics:

- long-polling uses a polling transport behind a client library
- SSE builds a subscription URL and parses event payloads
- WebSocket sends and receives raw socket messages
- gRPC creates protobuf requests and reads streaming responses

That variation is exactly why the port stays small. The policy should not need to know any of those details.

## Design Advice

When writing or reviewing an adapter:

1. Import the port type from the policy side.
2. Translate the port methods into concrete library calls.
3. Normalize detail-specific events or payloads back into the port's simpler shape.
4. Keep detail-specific state private to the adapter.

If the adapter is hard to implement, that often means the port is leaking low-level detail or the policy boundary is in the wrong place.

## Testing

Prefer testing policy code with a fake or in-memory adapter.

Use adapter-focused tests only for the detail translation itself:

- does a WebSocket message become the right domain callback?
- does a gRPC response map to the expected message string?
- does an SSE payload parse correctly?

## Smells

Watch for these signs that DIP is slipping:

- policy code imports a concrete client "just for one call"
- adapters return raw vendor objects to the high-level module
- every adapter needs `if transport === ...` branching inside it
- the adapter name and port name are identical except for `Impl`
- changing vendors requires edits in policy code

## Placement

Store adapters in a clearly low-level location such as:

- `src/adapters/`
- `src/infrastructure/`
- `src/implementations/`

The exact folder matters less than keeping the dependency direction obvious.
