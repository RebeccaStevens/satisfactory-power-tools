import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "../FGItemDescriptor/assert";

export function assertVendorFGEquipmentDescriptor(
  data: unknown,
): asserts data is VendorFGEquipmentDescriptor {
  assertVendorFGItemDescriptor(data);
}

export type VendorFGEquipmentDescriptor = VendorFGItemDescriptor;
