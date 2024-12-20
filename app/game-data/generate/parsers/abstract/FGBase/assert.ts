import { assert } from "chai";

export function assertVendorFGBase(data: unknown): asserts data is VendorFGBase {
  assert(typeof data === "object" && data !== null, "FGBase must be an object");
  assert.isEmpty(
    ["ClassName"].filter((field) => !(field in data) || typeof (data as Record<string, unknown>)[field] !== "string"),
    "Missing fields in FGBase",
  );
}

export type VendorFGBase = {
  ClassName: string;
};
