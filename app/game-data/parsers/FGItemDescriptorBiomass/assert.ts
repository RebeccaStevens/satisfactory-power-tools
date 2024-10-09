import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "../FGItemDescriptor/assert";

export function assertVendorFGItemDescriptorBiomass(
  data: unknown,
): asserts data is VendorFGItemDescriptorBiomass {
  assertVendorFGItemDescriptor(data);
}

export type VendorFGItemDescriptorBiomass = VendorFGItemDescriptor;
