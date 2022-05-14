# dependency-inversion-principle-example

This example shows how to use the dependency-inversion principle to implement a simple chat application.

![Dependency UML](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/iendeavor/dependency-inversion-principle-example/main/dependency.puml)

Interface:

- [`ChatAPI`](./packages/client/src/interface.ts)

Implementation:

- [`PollingChatAPI`](./packages/client/src/polling.ts)
- [`WebSocketChatAPI`](./packages/client/src/web-socket.ts)
- [`GraphQLChatAPI`](./packages/client/src/graph-ql.ts)

## Usage

```bash
pnpm install

pnpm run serve

```

Open http://localhost:8080/ in your browser.

To switch seamlessly between the different implementations, you can [comment out](./packages/client/src/index.ts#L3-L5) the `SocketIoChatAPI` and uncomment other implementations.
