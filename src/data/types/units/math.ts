import { type AnyUnit, type DivideUnits, div, type Unit } from "uom-ts";

export type Decimal = Unit<{}>;
export type Percentage = Unit<{ Percentage: 1 }>;

type PercentageToDecimalRate = DivideUnits<Percentage, Decimal>;

export function toDecimal(value: Percentage): Decimal {
  return div(value, 100 as PercentageToDecimalRate);
}

export function pow<B extends AnyUnit, E extends Decimal>(
  base: B,
  exponent: E,
): B;
export function pow<E extends Decimal>(
  exponent: E,
): <B extends AnyUnit>(base: B) => B;
export function pow<B extends AnyUnit, E extends Decimal>(
  // eslint-disable-next-line functional/functional-parameters
  ...args: ReadonlyArray<number>
) {
  if (args.length === 2) {
    return ((args[0] as B) ** (args[1] as E)) as B;
  }

  return (v: B): B => (v ** (args[0] as E)) as B;
}
