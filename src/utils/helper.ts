import {
  get,
  has,
  head,
  join,
  map,
  size,
  find,
  split,
  values,
  isArray,
  compact,
  forEach,
  includes
} from "lodash";

import { Route } from "@/utils/route";
import { getPage } from "@/service/api";
import { ILocation } from "@/utils/types";

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

export const checkIsCustomColor = (props, color: string): boolean => {
  if (!size(props.getValue())) return;

  const selectedValue = get(props.getValue(), "0.attributes");
  if (!has(selectedValue, "type")) return;

  const { type, value } = selectedValue;
  return type === "filter" && value === color;
};

export const percentage = (num: number, per: number) => (num / 100) * per;

export const formatPrice = (price, currencyType = "TRY") => {
  let format = "";
  const currencySymbol = "₺";

  switch (currencyType) {
    case "USD":
      format = "en-US";
      break;
    case "EUR":
      format = "en-DE";
      break;
    default:
      format = "tr-TR";
      break;
  }

  const formattedOutput = new Intl.NumberFormat(format, {
    style: "currency",
    currency: currencyType,
    minimumFractionDigits: 2
  });

  if (currencyType === "TRY") {
    const replaced = formattedOutput.format(price).replace(currencySymbol, "");
    return `${replaced} ${currencySymbol}`;
  }

  return formattedOutput.format(price);
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") return localStorage.getItem(key);
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window !== "undefined") localStorage.removeItem(key);
};

export const setLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined") localStorage.setItem(key, value);
};

export const getSessionStorage = (key: string) => {
  if (typeof window !== "undefined") return sessionStorage.getItem(key);
};

export const setSessionStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined") sessionStorage.setItem(key, value);
};

export const removeSessionStorage = (key: string): void => {
  if (typeof window !== "undefined") sessionStorage.removeItem(key);
};

export const getCurrentLang = (): string => getLocalStorage("lang");

export const checkSameItem = (
  firstArr: Array<string>,
  secondArr: Array<string>
): boolean => {
  return firstArr.some((l) => secondArr.includes(l));
};

export const checkAuth = () => !!getLocalStorage("token");

export const decodeParams = (param: string) => {
  return decodeURIComponent(decodeURIComponent(param));
};

export const getLocation = (param: ILocation): string => {
  return typeof window !== "undefined" && location[param];
};

export const addSuffix = (lang) => {
  const route = Route;
  return get(find(get(route, "excludeKeys"), lang), lang);
};

export const getObjectValues = (arr: Array<any>) => {
  return map(arr, (key) => head(values(key)));
};

export const removeSuffixOfSlug = (slug) => {
  const route = Route;

  const filtered = map(split(head(slug), "-"), (item) => {
    if (!includes(getObjectValues(get(route, "excludeKeys")), item))
      return item;
  });

  return decodeParams(join(compact(filtered), "-"));
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};
