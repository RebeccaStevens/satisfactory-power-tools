export type RawBase = {
  ClassName: string;
  mDisplayName: string;
};

/**
 * Type guard for raw data class data.
 */
export function isRawBase<T>(rawData: T): rawData is RawBase & T {
  return (
    Object.hasOwn(rawData, "ClassName") &&
    typeof rawData.ClassName === "string" &&
    Object.hasOwn(rawData, "mDisplayName") &&
    typeof rawData.mDisplayName === "string"
  );
}
