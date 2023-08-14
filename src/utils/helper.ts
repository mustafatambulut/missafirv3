import { forEach, get, isArray } from "lodash";

import { getPage } from "@/service/api";

export const getPageDataByComponent = async (
  page: string,
  components?: string | []
) => {
  const { attributes } = await getPage(page);
  const result = [];

  if (!isArray(components)) {
    return get(attributes, components);
  }
  forEach(components, (comp) => (result[comp] = get(attributes, comp)));
  return result;
};

export const getScrollPosition = () => window.scrollY;

export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined") localStorage.setItem(key, value);
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window !== "undefined") localStorage.removeItem(key);
};

export const getCurrentLang = () => getLocalStorage("lang");
