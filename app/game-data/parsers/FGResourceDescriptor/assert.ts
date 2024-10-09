import {
  type VendorFGItemDescriptor,
  assertVendorFGItemDescriptor,
} from "~/game-data/parsers/FGItemDescriptor/assert";

export function assertVendorFGResourceDescriptor(
  data: unknown,
): asserts data is VendorFGResourceDescriptor {
  assertVendorFGItemDescriptor(data);
}

export type VendorFGResourceDescriptor = VendorFGItemDescriptor & {
  mDecalSize: string;
  mPingColor: string;
  mCollectSpeedMultiplier: string;
  mManualMiningAudioName: string;
};
