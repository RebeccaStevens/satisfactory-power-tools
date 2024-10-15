import { Effect } from "effect";

export function effectAssert<A, B extends A>(
  cb: (a: NoInfer<A>) => asserts a is B,
) {
  if (process.env.NODE_ENV === "production") {
    return <E, R>(self: Effect.Effect<A, E, R>): Effect.Effect<B, E, R> =>
      self as Effect.Effect<B, E, R>;
  }

  return <E, R>(self: Effect.Effect<A, E, R>): Effect.Effect<B, E, R> =>
    self.pipe(
      Effect.andThen((value) =>
        Effect.sync(() => {
          cb(value);
          return value;
        }),
      ),
    );
}
