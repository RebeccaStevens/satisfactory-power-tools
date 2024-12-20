import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/generate/parsers/FGItemDescriptor/assert";

export function assertVendorFGEquipmentDescriptor(data: unknown): asserts data is VendorFGEquipmentDescriptor {
  assertVendorFGItemDescriptor(data);
}

export type VendorFGEquipmentDescriptor = VendorFGItemDescriptor;
