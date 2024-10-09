import { assert } from "chai";

export function assertVendorAbstractBase(
  data: unknown,
): asserts data is VendorAbstractBase {
  assert(
    typeof data === "object" && data !== null,
    "AbstractBase must be an object",
  );
  assert.isEmpty(
    ["ClassName"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in AbstractBase",
  );
}

export type VendorAbstractBase = {
  ClassName: string;
};
