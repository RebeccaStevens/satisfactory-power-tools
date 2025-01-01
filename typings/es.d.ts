declare global {
  interface ObjectConstructor {
    hasOwn<ObjectType, Key extends PropertyKey>(
      object: ObjectType,
      key: Key
    ): object is ObjectType & Record<Key, unknown>;

    entries<T>(o: Record<string, T> | ArrayLike<T>): Array<[string, T]>;

    entries(o: {}): Array<[string, unknown]>;
  }

  interface ArrayConstructor {
    isArray(arg: unknown): arg is unknown[];
  }

  interface Array<T> {
    includes(searchElement: unknown, fromIndex?: number): boolean;

    indexOf(searchElement: unknown, fromIndex?: number): number;

    lastIndexOf(searchElement: unknown, fromIndex?: number): number;
  }

  interface ReadonlyArray<T> {
    includes(searchElement: unknown, fromIndex?: number): boolean;

    indexOf(searchElement: unknown, fromIndex?: number): number;

    lastIndexOf(searchElement: unknown, fromIndex?: number): number;
  }

  interface Map<K, V> {
    get(key: unknown): V | undefined;
    has(key: unknown): boolean;
  }

  interface ReadonlyMap<K, V> {
    get(key: unknown): V | undefined;
    has(key: unknown): boolean;
  }

  interface WeakMap<K extends object, V> {
    get(key: unknown): V | undefined;
    has(key: unknown): boolean;
  }

  interface Set<T> {
    get(key: unknown): T | undefined;
    has(key: unknown): boolean;
  }

  interface ReadonlySet<T> {
    get(key: unknown): T | undefined;
    has(key: unknown): boolean;
  }

  interface WeakSet<T> {
    get(key: unknown): T | undefined;
    has(key: unknown): boolean;
  }
}

export {};
