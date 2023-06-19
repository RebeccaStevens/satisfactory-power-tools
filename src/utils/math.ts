/**
 * Gets the order of the magnitude (in base 10) of a number.
 *
 * For example, the magnitude of 12,345 is 10,000 and thus its order is 4.
 *
 * Note: Not always accurate when working with floating point numbers.
 */
export function getMagnitudeOrder(number: number) {
  return Math.floor(Math.log10(number));
}
