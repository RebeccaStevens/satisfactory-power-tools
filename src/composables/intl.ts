const cacheNumberFormatter = new Map<string, Intl.NumberFormat>();

/**
 * Get a number formatter for the current user.
 */
export function useIntlNumberFormatter() {
  const { locale } = useI18n();
  const cached = cacheNumberFormatter.get(locale.value);
  if (cached !== undefined) {
    return cached;
  }

  const formatter = new Intl.NumberFormat(locale.value);
  cacheNumberFormatter.set(locale.value, formatter);
  return formatter;
}
