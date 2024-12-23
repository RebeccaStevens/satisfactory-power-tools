type AwaitedReturnTypeOfEach<T extends ReadonlyArray<() => unknown>> = T extends readonly [
  infer First extends () => unknown,
  ...infer Rest,
]
  ? AwaitedReturnTypeOfEachHelper<First, Rest, []>
  : T extends ReadonlyArray<() => infer R>
    ? Array<Awaited<R>>
    : never;

type AwaitedReturnTypeOfEachHelper<
  First extends () => unknown,
  Rest extends ReadonlyArray<unknown>,
  Result extends ReadonlyArray<unknown>,
> = Rest extends readonly [infer Next extends () => unknown, ...infer NextRest]
  ? AwaitedReturnTypeOfEachHelper<Next, NextRest, [...Result, Awaited<ReturnType<First>>]>
  : [...Result, Awaited<ReturnType<First>>];

export function runAsyncActions<T extends ReadonlyArray<() => Promise<unknown>>>(
  actions: T,
  concurrency = 3,
): Promise<AwaitedReturnTypeOfEach<T>> {
  let mut_index = 0;
  let mut_running = 0;
  const mut_results = Array.from({ length: actions.length }) as AwaitedReturnTypeOfEach<T>;

  return new Promise<AwaitedReturnTypeOfEach<T>>((resolve) => {
    run();

    function run() {
      if (mut_running === 0 && mut_index === actions.length) {
        resolve(mut_results);
        return;
      }

      // eslint-disable-next-line functional/no-loop-statements
      while (mut_running < concurrency && mut_index < actions.length) {
        const index = mut_index++;
        const action = actions[index]!;
        const promise = action();
        mut_running++;
        // eslint-disable-next-line ts/no-loop-func
        void promise.then((result) => {
          mut_results[index] = result;
          mut_running--;
          run();
        });
      }
    }
  });
}

if (import.meta.vitest !== undefined) {
  const { describe, it, expect } = import.meta.vitest;

  describe("runAsyncActions", () => {
    it("return all the results in order", async () => {
      const actions = [
        () => new Promise<number>((resolve) => void setTimeout(() => void resolve(1), 50)),
        () => new Promise<number>((resolve) => void setTimeout(() => void resolve(2), 10)),
        () => new Promise<number>((resolve) => void setTimeout(() => void resolve(3), 30)),
        () => new Promise<number>((resolve) => void setTimeout(() => void resolve(4), 40)),
        () => new Promise<number>((resolve) => void setTimeout(() => void resolve(5), 20)),
      ] as const;

      const results = await runAsyncActions(actions);

      expect(results).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it("runs in parallel", () => {
      const mut_running = [false, false, false, false, false];
      const actions = [
        () =>
          new Promise<void>((resolve) => {
            mut_running[0] = true;
            setTimeout(() => {
              expect(mut_running).to.deep.equal([true, true, true, false, false]);
              mut_running[0] = false;
              resolve();
            }, 10);
          }),
        () =>
          new Promise<void>((resolve) => {
            mut_running[1] = true;
            setTimeout(() => {
              expect(mut_running).to.deep.equal([false, true, true, true, false]);
              mut_running[1] = false;
              resolve();
            }, 20);
          }),
        () =>
          new Promise<void>((resolve) => {
            mut_running[2] = true;
            setTimeout(() => {
              expect(mut_running).to.deep.equal([false, false, true, true, true]);
              mut_running[2] = false;
              resolve();
            }, 30);
          }),
        () =>
          new Promise<void>((resolve) => {
            mut_running[3] = true;
            setTimeout(() => {
              expect(mut_running).to.deep.equal([false, false, false, true, true]);
              mut_running[3] = false;
              resolve();
            }, 40);
          }),
        () =>
          new Promise<void>((resolve) => {
            mut_running[4] = true;
            setTimeout(() => {
              expect(mut_running).to.deep.equal([false, false, false, false, true]);
              mut_running[4] = false;
              resolve();
            }, 50);
          }),
      ];

      return expect(runAsyncActions(actions, 3)).resolves.to.be.ok;
    });
  });
}
