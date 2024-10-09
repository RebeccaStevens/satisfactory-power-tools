import { assert } from "chai";

import {
  type VendorAbstractEquipment,
  assertVendorAbstractEquipment,
} from "~/game-data/parsers/abstractEquipment/assert";

export function assertVendorFGChainsaw(
  data: unknown,
): asserts data is VendorFGChainsaw {
  assertVendorAbstractEquipment(data);

  assert.isEmpty(
    [
      // cspell:disable-next-line
      "mInterpSawProgress",
      "mCurrentOutputDataSFX",
      "StartUpToIdleID",
      "mCurrentHasFuel",
      "mPreviousState",
      "mChainsawEngageMontage",
      "mChainsawSawingMontage",
      "mChainsawEquipFuelMontage",
      "mChainsawEquipNoFuelMontage",
      "mChainsawEquipStingerMontage",
      "mShowAOESelectorUITimer",
      "EngagePlayingID",
      "SawingPlayingID",
      "mEnergyConsumption",
      "mSawDownTreeTime",
      "mCollateralPickupRadius",
      "mIsAOEOn",
      "mEnergyStored",
      "mSawingProgress",
      "mChainsawState",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in FGChainsaw",
  );
}

export type VendorFGChainsaw = VendorAbstractEquipment & {
  // cspell:disable-next-line
  mInterpSawProgress: string;
  mCurrentOutputDataSFX: string;
  StartUpToIdleID: string;
  mCurrentHasFuel: string;
  mPreviousState: string;
  mChainsawEngageMontage: string;
  mChainsawSawingMontage: string;
  mChainsawEquipFuelMontage: string;
  mChainsawEquipNoFuelMontage: string;
  mChainsawEquipStingerMontage: string;
  mShowAOESelectorUITimer: string;
  EngagePlayingID: string;
  SawingPlayingID: string;
  mEnergyConsumption: string;
  mSawDownTreeTime: string;
  mCollateralPickupRadius: string;
  mIsAOEOn: string;
  mEnergyStored: string;
  mSawingProgress: string;
  mChainsawState: string;
};
