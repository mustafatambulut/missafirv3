import { forEach, get, has, isArray, size } from "lodash";

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

export const checkIsCustomColor = (props, color: string): boolean => {
  if (!size(props.getValue())) return;

  const selectedValue = get(props.getValue(), "0.attributes");
  if (!has(selectedValue, "type")) return;

  const { type, value } = selectedValue;
  return type === "filter" && value === color;
};

export const percentage = (num: number, per: number) => (num / 100) * per;

export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined") localStorage.setItem(key, value);
};

export const getCurrentLang = () => getLocalStorage("lang");

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

export const getPriceFormatByLocale = () => {
  switch (getCurrentLang()) {
    case "en":
      return "EUR";
    case "tr":
      return "TRY";
    case "hr":
      return "EUR";
    default:
      return "TRY";
  }
};
