/**
 * Get the page title for the given page.
 */
export function usePageTitle(page: string) {
  const { t } = useI18n();

  if (page === "home") {
    return t("site.title");
  }

  const key = `pages.${page}.title`;
  return `${t(key)} - ${t("site.title")}`;
}
