import get from "lodash/get";
import has from "lodash/has";
import map from "lodash/map";
import join from "lodash/join";
import pull from "lodash/pull";
import omit from "lodash/omit";
import size from "lodash/size";
import head from "lodash/head";
import find from "lodash/find";
import first from "lodash/first";
import split from "lodash/split";
import values from "lodash/values";
import compact from "lodash/compact";
import without from "lodash/without";
import includes from "lodash/includes";
import lowerCase from "lodash/lowerCase";
import moment from "moment/moment";
import jwt_decode from "jwt-decode";
import secureLocalStorage from "react-secure-storage";

import { Route } from "@/utils/route";
import { ILocation } from "@/utils/types";
import { AUTH_USER_KEY, LANG_KEY, LOCALES, TOKEN_KEY } from "@/app/constants";

export const getScrollPosition = () => {
  if (typeof window !== "undefined") return window.scrollY;
};

export const checkIsCustomColor = (props, color: string): boolean => {
  if (!size(props.getValue())) return;

  const selectedValue = get(props.getValue(), "0.attributes");
  if (!has(selectedValue, "type")) return;

  const { type, value } = selectedValue;
  return type === "filter" && value === color;
};
export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") return secureLocalStorage.getItem(key);
};

export const removeLocalStorage = (key: string): void => {
  typeof window !== "undefined" && secureLocalStorage.removeItem(key);
};

export const setLocalStorage = (key: string, value: any): void => {
  typeof window !== "undefined" && secureLocalStorage.setItem(key, value);
};

export const checkIsAuthenticated = () => {
  if (typeof window !== "undefined") {
    const token = getLocalStorage(TOKEN_KEY);
    const authUser = getLocalStorage(AUTH_USER_KEY);
    if (token && authUser) {
      let decodedToken;
      let parsedAuthUser;

      try {
        decodedToken = jwt_decode(token);
      } catch (error) {
        decodedToken = null;
      }

      try {
        parsedAuthUser = JSON.parse(authUser);
      } catch (error) {
        parsedAuthUser = null;
      }

      if (
        has(parsedAuthUser, "email") &&
        has(parsedAuthUser, "fullname") &&
        has(decodedToken, "email") &&
        has(decodedToken, "fullname") &&
        has(decodedToken, "exp")
      ) {
        const expireIn = moment.unix(get(decodedToken, "exp"));
        const today = moment();
        const isPastOrSameTime = expireIn.isSameOrBefore(today);
        return (
          get(parsedAuthUser, "email") === get(decodedToken, "email") &&
          get(parsedAuthUser, "fullname") === get(decodedToken, "fullname") &&
          !isPastOrSameTime
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

export const getCurrentLang = (): string => getLocalStorage(LANG_KEY);

export const checkSameItem = (
  firstArr: Array<string>,
  secondArr: Array<string>
): boolean => {
  return firstArr.some((l) => secondArr.includes(l));
};

export const decodeParams = (param: string) => {
  return decodeURIComponent(decodeURIComponent(param));
};

export const getLocation = (param: ILocation): string => {
  if (typeof window !== "undefined") return location[param];
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

export const getCountryByName = (
  country: string,
  lang: string = "en"
): {
  id: number;
  slug: string;
} => {
  const countries = head(map(Route.baseListingCountryRoutes, "en"));

  const mapped = map(countries, (value, name) => {
    const slugByLang = map(
      head(map(Route.baseListingCountryRoutes, lang)),
      (val, key) => {
        if (val === value) return key;
      }
    );

    if (lowerCase(country) === name) {
      return {
        id: value,
        slug: head(compact(slugByLang))
      };
    }
  });

  return head(compact(mapped));
};

export const browserLang = () => {
  if (typeof window !== "undefined") {
    return head(split(get(window, "navigator.language"), "-"));
  }
};

export const cleanFilterData = (data, searchParams) => {
  const omitted = omit(data, [
    "slug",
    "type",
    "desc",
    "value",
    "label",
    "order",
    "country",
    "city_id",
    "city_slug",
    "isHistory",
    "country_id",
    "district_id",
    "country_slug",
    "isPopularDestinations"
  ]);

  return {
    ...omitted,
    ...omit(searchParams, ["city_id", "disctrict_id"])
  };
};

export const getSlugOfUrl = (pathname: string): string => {
  const suffix = values(first(get(Route, "listingDetailSuffix")));
  return join(
    without(
      split(compact(pull(compact(split(pathname, "/")), ...LOCALES)), "-"),
      ...suffix
    ),
    "-"
  );
};

export const queryStringForClientSide = (searchParams: object): string => {
  if (!searchParams) return "error";

  const queryParams = [];
  searchParams?.forEach((value, key) => {
    if (includes(["check_in", "check_out", "adults"], key)) {
      queryParams.push(`${key}=${value}`);
    }
  });
  return join(queryParams, "&");
};

export const routeByPath = (
  lang: string,
  pathname: string,
  group: []
): string => {
  if (!pathname || !lang) return;
  const result = map(map(group, lang)[0], (value, key) => {
    return value === pathname ? key : null;
  });
  return head(compact(result));
};
