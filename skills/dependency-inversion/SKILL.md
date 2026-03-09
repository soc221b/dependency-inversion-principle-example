---
name: dependency-inversion
description: Apply, explain, review, or refactor code using the Dependency Inversion Principle (DIP), ports and adapters, or interface-driven design. Use this whenever the user wants to decouple business logic from frameworks, transports, databases, SDKs, or other infrastructure, make code easier to test with fakes, or swap implementations without rewriting the policy layer, even if they never say "dependency inversion" explicitly.
---

# Dependency Inversion

Use this skill when the important problem is not "how do I call library X?" but "how do I stop policy code from depending on library X at all?"

The heart of DIP is simple:

- High-level policy defines the abstraction it needs.
- Low-level details implement that abstraction.
- A composition root chooses the concrete implementation at the edge.

Portable mental model:

- Port: `MessageGateway`
- High-level module: `ConversationService`
- Adapters: `WebSocketMessageGateway`, `SseMessageGateway`, `GrpcMessageGateway`
- Composition root: `src/main.ts`

The policy module should know only the port methods it needs, such as `sendMessage` and `onMessage`. Each adapter can hide a different transport or vendor. Swapping implementations should change wiring at the edge, not the policy code.

## When To Reach For This Skill

Use this skill when the user is trying to:

- untangle a class or service that instantiates concrete SDKs, clients, or framework objects directly
- introduce ports and adapters / hexagonal architecture / clean architecture boundaries
- replace conditionals spread through policy code with one abstraction and multiple implementations
- make code testable with fakes or in-memory adapters
- swap transport, persistence, queue, payment, or notification providers with minimal blast radius
- review whether an existing refactor is "real DIP" or just interface-shaped indirection

Use it even if the request is phrased as:

- "make this less coupled"
- "hide fetch / Prisma / Stripe / WebSocket behind something"
- "I want to swap implementations later"
- "this component/service is hard to test because it news up dependencies"

## Working Style

Start by locating the policy boundary before proposing abstractions. The abstraction should be shaped by what the high-level module genuinely needs, not by the API of the current implementation.

When you answer:

- explain the current dependency direction first
- name the policy module, the port, the adapters, and the composition root
- prefer the smallest safe refactor that proves the new boundary
- call out when DIP would add ceremony without meaningful benefit

## Workflow

1. Find the policy module.
   Look for the code that contains behavior the user cares about preserving: UI flow, business rules, orchestration, or domain decisions.

2. List the infrastructure details currently leaking in.
   These are usually framework imports, transport clients, database handles, SDK calls, or protocol-shaped method names.

3. Design the port from policy needs.
   Define the smallest interface the policy actually needs. Favor domain verbs over transport verbs.

4. Move details behind adapters.
   Each adapter translates between the port and one concrete detail: WebSocket, SSE, gRPC, REST, Prisma, Stripe, filesystem, and so on.

5. Wire everything at the composition root.
   Instantiate the concrete adapter in one place near the application entry point and inject it into the policy module.

6. Prove the dependency inversion.
   Show that policy code imports only the port, and that swapping adapters changes only the composition root or equivalent wiring.

7. Preserve behavior and testability.
   Mention how a fake or in-memory adapter could verify the policy without booting the real infrastructure.

## Output Expectations

For reviews or explanations, usually cover:

- what the high-level policy is
- what the port should look like
- which code belongs in adapters
- where the composition root is or should be
- what would change when swapping implementations

For refactors, prefer producing:

- a minimal port
- one or more adapters
- explicit wiring
- a short note on why the new boundary is safer or easier to test

## Guardrails

- Keep the abstraction on the policy side. Do not let the low-level library dictate the interface.
- Avoid protocol leakage like `openSocket`, `emit`, `subscribeToGraphQL`, or `queryRow` unless policy truly cares about that detail.
- Do not instantiate concrete adapters inside the policy module.
- Do not spread selection logic across many files when one composition root can own it.
- Do not create an interface that mirrors a single class one-to-one unless it buys isolation at a real architectural seam.
- If only one implementation exists today, DIP can still be worth it when policy and infrastructure are clearly different concerns or tests need a fake. If not, say so.

## Reference Map

Read only the part you need:

- Port design and abstraction sizing: [references/port.md](references/port.md)
- Adapter responsibilities and smells: [references/adapter.md](references/adapter.md)
- Wiring and swapability at the edge: [references/composition-root.md](references/composition-root.md)
