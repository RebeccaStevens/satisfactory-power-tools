declare module "*.vue" {
  import { type DefineComponent } from "vue";

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*&imagetools" {
  const src: string;
  export default src;
}

interface ObjectConstructor {
  hasOwn<ObjectType, Key extends PropertyKey>(
    object: ObjectType,
    key: Key,
  ): object is ObjectType & Record<Key, unknown>;

  entries<T>(
    o: T,
  ): T extends ArrayLike<infer U>
    ? Array<[string, U]>
    : Array<{ [K in keyof T]: [K, T[K]] }[keyof T]>;

  fromEntries<K extends PropertyKey, V>(
    entries: Iterable<readonly [K, V]>,
  ): Record<K, V>;

  keys<T>(o: T): Array<keyof T>;

  values<T>(o: T): T extends ArrayLike<infer U> ? U[] : Array<T[keyof T]>;
}

interface ArrayConstructor {
  isArray(arg: unknown): arg is unknown[] | ReadonlyArray<unknown>;
}

interface Array<T> {
  at(index: number): T | undefined;
  includes(searchElement: unknown, fromIndex?: number): boolean;
  indexOf(searchElement: unknown, fromIndex?: number): number;
  lastIndexOf(searchElement: unknown, fromIndex?: number): number;
}

interface ReadonlyArray<T> {
  at(index: number): T | undefined;
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

interface Set<T> {
  has(key: unknown): boolean;
}

interface WeakMap<K extends object, V> {
  get(key: unknown): V | undefined;
  has(key: unknown): boolean;
}
