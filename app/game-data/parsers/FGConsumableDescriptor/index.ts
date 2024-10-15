import type { Effect } from "effect";

import {
  type FGItemDescriptor,
  parseFGItemDescriptor,
} from "../FGItemDescriptor";
import type { ParseError } from "../errors";

import { assertVendorFGConsumableDescriptor } from "./assert";

export function parseFGConsumableDescriptor(
  data: unknown,
): Effect.Effect<FGConsumableDescriptor, ParseError> {
  assertVendorFGConsumableDescriptor(data);
  return parseFGItemDescriptor(data);
}

export type FGConsumableDescriptor = FGItemDescriptor;
