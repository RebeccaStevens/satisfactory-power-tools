import assert from "node:assert/strict";

export function assertPropertyExists<O extends object, P extends string>(
  object: O,
  property: P,
  type?: "string",
): asserts object is O & { [key in P]: string };
export function assertPropertyExists<O extends object, P extends string>(
  object: O,
  property: P,
  type: "array",
): asserts object is O & { [key in P]: unknown[] };

export function assertPropertyExists<O extends object, P extends string>(
  object: O,
  property: P,
  type: "string" | "array" = "string",
): asserts object is O & { [key in P]: string } {
  assert(property in object, `expected property "${property}" to exists`);
  if (type === "array") {
    assert(
      Array.isArray((object as { [key in P]: unknown })[property]),
      `Non-array value found for property "${property}" (was of type "${typeof (
        object as { [key in P]: unknown }
      )[property]}").`,
    );
  } else {
    assert(
      typeof (object as { [key in P]: unknown })[property] === type,
      `Non-${type} value found for property "${property}" (was of type "${typeof (
        object as { [key in P]: unknown }
      )[property]}").`,
    );
  }
}
