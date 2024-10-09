import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/parsers/FGItemDescriptor/assert";

export function assertVendorFGItemDescriptorBiomass(
  data: unknown,
): asserts data is VendorFGItemDescriptorBiomass {
  assertVendorFGItemDescriptor(data);
}

export type VendorFGItemDescriptorBiomass = VendorFGItemDescriptor;
