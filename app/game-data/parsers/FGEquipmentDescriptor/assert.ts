import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/parsers/FGItemDescriptor/assert";

export function assertVendorFGEquipmentDescriptor(
  data: unknown,
): asserts data is VendorFGEquipmentDescriptor {
  assertVendorFGItemDescriptor(data);
}

export type VendorFGEquipmentDescriptor = VendorFGItemDescriptor;
