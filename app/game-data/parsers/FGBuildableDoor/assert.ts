import { assert } from "chai";

import {
  type VendorFGBuildable,
  assertVendorFGBuildable,
} from "~/game-data/parsers/FGBuildable/assert";

export function assertVendorFGBuildableDoor(
  data: unknown,
): asserts data is VendorFGBuildableDoor {
  assertVendorFGBuildable(data);

  assert.isEmpty(
    [
      "mCanBeLocked",
      "mAnimationRate",
      "mMovementRate",
      "EasingFunction",
      "BlendExp",
      "Steps",
      "mWidth",
      "mHeight",
      "mElevation",
      "mAngularDepth",
      "mWallType",
      "mAngledVariants",
    ].filter(
      (field) =>
        !(field in data) ||
        typeof (data as Record<string, unknown>)[field] !== "string",
    ),
    "Missing fields in VendorFGBuildableDoor",
  );
}

export type VendorFGBuildableDoor = VendorFGBuildable & {
  IsDoorOpen?: string;
  mCanBeLocked: string;
  mAnimationRate: string;
  mMovementRate: string;
  EasingFunction: string;
  BlendExp: string;
  Steps: string;
  mWidth: string;
  mHeight: string;
  mElevation: string;
  mAngularDepth: string;
  mWallType: string;
  mAngledVariants: string;
};
