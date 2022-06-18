# dependency-inversion-principle-example

This example shows how to use the dependency-inversion principle to implement a simple chat application.

![Dependency UML](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/iendeavor/dependency-inversion-principle-example/main/dependency.puml)

Interface:

- [`ChatAPI`](./client/src/interface.ts)

Implementation:

- [`gRPCChatAPI`](./client/src/implementations/grpc/index.ts)
  > before using gRPC, make sure to
  >
  > 1. install `envoy`
  > 2. execute `pnpm run proxy` to enable envoy proxy
- [`LongPollingChatAPI`](./client/src/implementations/long-polling/index.ts)
- [`ServerSentEventsChatAPI`](./client/src/implementations/server-sent-events/index.ts)
- [`WebSocketChatAPI`](./client/src/implementations/web-socket/index.ts)

> To switch between the different implementations, you can [comment out](./client/src/index.ts#L3) the `LongPollingChatAPI` and uncomment other implementations.

## Usage

```bash
pnpm install

pnpm run dev

```

Open http://localhost:8080/ in your browser.
