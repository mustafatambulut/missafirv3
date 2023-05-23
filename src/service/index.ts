import axios from "axios";
import { get } from "lodash";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.API_URL_PROD
      : process.env.API_URL_DEV
});

export const getPage = async () => {
  const { data } = await api.get("/api/page?populate=deep");
  return get(data, "data");
};

export const getMenu = async () => {
  const { data } = await api.get("/api/menus?nested&populate=*");
  return get(data, "data");
};
