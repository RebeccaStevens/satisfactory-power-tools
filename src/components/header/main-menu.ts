type MenuLink = {
  type: "link";
  label: string;
  link: string;
};

type MenuDivider = {
  type: "divider";
};

type SubMenu = {
  type: "submenu";
  label: string;
  submenu?: Array<MenuLink | MenuDivider>;
};

type MainMenuData = Array<MenuLink | SubMenu>;

/**
 * The main menu's data.
 */
export function useMainMenu() {
  const { t } = useI18n();

  const menu: MainMenuData = [
    {
      type: "link",
      label: t("pages.home.label"),
      link: "/",
    },
  ];

  return menu;
}
