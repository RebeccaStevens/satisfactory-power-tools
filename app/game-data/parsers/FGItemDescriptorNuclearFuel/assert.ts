import { assert } from "chai";

import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/parsers/FGItemDescriptor/assert";

export function assertVendorFGItemDescriptorNuclearFuel(
  data: unknown,
): asserts data is VendorFGItemDescriptorNuclearFuel {
  assertVendorFGItemDescriptor(data);

  assert.isEmpty(
    ["mSpentFuelClass", "mAmountOfWaste"].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGItemDescriptorNuclearFuel",
  );
}

export type VendorFGItemDescriptorNuclearFuel = VendorFGItemDescriptor & {
  mSpentFuelClass: string;
  mAmountOfWaste: string;
};
