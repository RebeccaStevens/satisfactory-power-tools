import assert from "node:assert/strict";

/**
 * Type guard for object.
 */
export function isObject<T>(value: T): value is T & object {
  return value !== null && typeof value === "object";
}

/**
 * Type guard to test if the given value is not null.
 */
export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

/**
 * Assertion to test if the given value is not undefined.
 */
export function assertNotUndefined<T>(value: T | undefined): value is T {
  assert(value !== undefined);
  return true;
}