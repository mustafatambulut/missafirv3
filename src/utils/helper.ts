import { find, get } from "lodash";
import { getMenu, getPage } from "@/service";
import { PAGE_HEADER } from "@/components/molecules/header/constants";

interface IMenu {
  parent: {
    data: object;
  };
}

export const getMenuByComponent: any = async (component: string) => {
  const res = await getMenu();
  const menuData: IMenu | undefined = find<IMenu>(res, (menu: IMenu) => {
    return get(menu, "attributes.title") === component;
  });
  return get(menuData, "attributes.items.data");
};

export const getPageDataByComponent: any = async (
  page: string,
  component: string
) => {
  const { attributes } = await getPage();
  return find(get(attributes, "home"), {
    __component: component
  });
};
