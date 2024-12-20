import type { Effect } from "effect";

import { type FGItemDescriptor, parseFGItemDescriptor } from "~/game-data/generate/parsers/FGItemDescriptor";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGConsumableDescriptor } from "./assert";

export function parseFGConsumableDescriptor(data: unknown): Effect.Effect<FGConsumableDescriptor, ParseError> {
  assertVendorFGConsumableDescriptor(data);
  return parseFGItemDescriptor(data);
}

export type FGConsumableDescriptor = FGItemDescriptor;
