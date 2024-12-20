import type { Effect } from "effect";

import { type FGItemDescriptor, parseFGItemDescriptor } from "~/game-data/generate/parsers/FGItemDescriptor";
import type { ParseError } from "~/game-data/generate/parsers/errors";

import { assertVendorFGItemDescriptorBiomass } from "./assert";

export function parseFGItemDescriptorBiomass(data: unknown): Effect.Effect<FGItemDescriptorBiomass, ParseError> {
  assertVendorFGItemDescriptorBiomass(data);
  return parseFGItemDescriptor(data);
}

export type FGItemDescriptorBiomass = FGItemDescriptor & {};
