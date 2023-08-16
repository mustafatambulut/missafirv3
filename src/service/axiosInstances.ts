import axios from "axios";

const isProduction = () => process.env.NODE_ENV === "production";

export const strapi = axios.create({
  baseURL: isProduction()
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV
});

export const pmsApi = axios.create({
  baseURL: isProduction()
    ? process.env.NEXT_PUBLIC_PMS_API_URL_PROD
    : process.env.NEXT_PUBLIC_PMS_API_URL_DEV
});
