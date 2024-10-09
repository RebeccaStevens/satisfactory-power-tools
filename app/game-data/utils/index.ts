import { pipe } from "effect";
import * as uom from "effect-uom";

import type {
  OverclockInfo,
  PowerInfo,
  SloopInfo,
} from "~/game-data/upgrade/types";

export function getAveragePowerUsage(
  powerInfo: PowerInfo,
  overclockInfo: OverclockInfo,
  sloopInfo: SloopInfo,
  overclockValue: uom.Unitless = uom.Unitless(1),
  sloopValue: uom.Unitless = uom.Unitless(0),
): uom.Mega<uom.Watt> {
  return pipe(
    uom.div(uom.add(powerInfo.min, powerInfo.max), 2),
    uom.mul(
      uom.add(
        sloopInfo.base,
        uom.pow(uom.mul(sloopValue, sloopInfo.multiplier), sloopInfo.exponent),
      ),
    ),
    uom.mul(uom.pow(overclockValue, overclockInfo.exponent)),
  );
}
