import axios from "axios";
import { forEach, get, head, split } from "lodash";

import { DEVICE } from "@/app/constants";

const isProduction = () => process.env.NODE_ENV === "production";

export const browserLang = () => {
  if (typeof window !== "undefined") {
    return head(split(get(window, "navigator.language"), "-"));
  }
};

export const strapi = axios.create({
  baseURL: isProduction()
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV
});

export const pmsApi = axios.create({
  baseURL: isProduction()
    ? process.env.NEXT_PUBLIC_PMS_API_PROD
    : process.env.NEXT_PUBLIC_PMS_API_DEV
});

const setHeaders = () => {
  forEach([pmsApi, strapi], (api) => {
    api.defaults.headers.common["device"] = DEVICE;
    api.defaults.headers.common["lang"] = browserLang();
  });
};

setHeaders();
