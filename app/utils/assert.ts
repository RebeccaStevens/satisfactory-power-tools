import { Effect } from "effect";

export function assertEffect(assertion: () => string | undefined): undefined;

export function assertEffect<E extends Effect.Effect<unknown>>(
  assertion: () => string | undefined,
  andThen: E,
): E;

export function assertEffect<E extends Effect.Effect<unknown>>(
  assertion: () => string | undefined,
  andThen?: E,
): E | undefined {
  const message = assertion();
  if (message !== undefined) {
    return Effect.dieMessage(message) as unknown as E;
  }
  return andThen;
}
