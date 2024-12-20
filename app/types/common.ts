import { Brand } from "effect";

export type Locale = Brand.Branded<string, "Locale">;
export const Locale = Brand.refined<Locale>(
  (n) => typeof n === "string" && n.length > 0,
  (n) => Brand.error(`Expected ${n} to be a nonempty string`),
);

export type AssertPath = Brand.Branded<string | null, "AssertPath">;
export const AssertPath = Brand.refined<AssertPath>(
  (n) => typeof n === "string",
  (n) => Brand.error(`Expected ${n} to be a string`),
);

export type Float = Brand.Branded<number, "Float">;
export const Float = Brand.refined<Float>(
  (n) => typeof n === "number" && !Number.isNaN(n),
  (n) => Brand.error(`Expected ${n} to be a number`),
);

export type Int = Brand.Branded<number, "Int">;
export const Int = Brand.refined<Int>(
  (n) => typeof n === "number" && !Number.isNaN(n) && Number.isInteger(n),
  (n) => Brand.error(`Expected ${n} to be an integer`),
);
