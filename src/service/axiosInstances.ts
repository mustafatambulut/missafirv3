import axios from "axios";
import { forEach } from "lodash";

import { DEVICE } from "@/app/constants";

const isProduction = () => process.env.NODE_ENV === "production";

export const strapi = axios.create({
  baseURL: isProduction()
    ? process.env.NEXT_PUBLIC_API_PROD
    : process.env.NEXT_PUBLIC_API_DEV
});

export const pmsApi = axios.create({
  baseURL: 'https://mmapi.missafir.com/api/dbe'
});

const setHeaders = () => {
  forEach([pmsApi, strapi], (api) => {
    api.defaults.headers.common["device"] = DEVICE;
  });
};

setHeaders();
