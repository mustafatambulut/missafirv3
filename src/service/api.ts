import axios from "axios";
import { get } from "lodash";

export const isProduction = () => process.env.NODE_ENV === "production";

const api = await axios.create({
  baseURL: isProduction()
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV,
  headers: {
    Authorization: isProduction() ? `Bearer ${process.env.API_KEY}` : ""
  }
});

export const getPage = async (page: string) => {
  const { data } = await api.get(`/api/${page}?populate=deep`);
  return get(data, "data");
};

export const getMenu = async () => {
  const { data } = await api.get("/api/menus?nested&populate=*");
  return get(data, "data");
};
