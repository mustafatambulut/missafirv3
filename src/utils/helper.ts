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

export const percentage = (num: number, per: number) => (num / 100) * per;

export const getCurrentLang = () => localStorage.getItem("lang");

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
