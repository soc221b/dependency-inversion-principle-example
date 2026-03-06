---
name: dependency-inversion
description: Apply, explain, or refactor code using the Dependency Inversion Principle (DIP) in software design. Use for production tasks that clean up tightly coupled legacy classes, define stable interfaces, decouple high-level policy from low-level details, and safely add or swap implementations across languages, protocols, and architectures.
---

# Dependency Inversion

Use this skill for production refactoring where high-level policy depends on an abstraction, not on concrete transport or infrastructure.

## Workflow
1. Define the policy first.
2. Create a minimal port interface used by that policy.
3. Implement two or more adapters that satisfy the port.
4. Inject the adapter from a composition boundary (composition root, DI container, or service locator setup).
5. Prove swapability by changing only composition wiring.

## Activation Cues
Use this skill when requests include patterns like:
- "Refactor this giant legacy class/service."
- "Decouple business logic from framework, API, database, or transport code."
- "Make this module easier to test with mocks/fakes."
- "Swap implementation details without rewriting core logic."

## File Map
- Port design: [references/port.md](references/port.md)
- Adapter implementations: [references/adapter.md](references/adapter.md)
- Composition and adapter swapping: [references/composition-root.md](references/composition-root.md)

## Implementation Rules
- Keep interfaces small and domain-focused.
- Keep transport concerns inside adapters.
- Keep concrete classes out of high-level modules.
- Keep wiring explicit in one composition boundary module.

## Quality Checklist
1. High-level module imports only port types.
2. Adapters implement the port without changing policy code.
3. Swapping adapters changes only composition boundary code.
4. Policy tests run against an in-memory or fake adapter.
