import { get } from "lodash";
import { strapi, pmsApi } from "./axiosInstances";

export const getPage = async (page: string) => {
  const { data } = await strapi.get(`/api/${page}?populate=deep`);
  return get(data, "data");
};

export const getMenu = async () => {
  const { data } = await strapi.get("/api/menus?nested&populate=*");
  return get(data, "data");
};

export const auth = async (params) => {
  const payload = {
    email: get(params, "email"),
    password: get(params, "password")
  };

  try {
    return await pmsApi.post("/login", payload);
  } catch (err) {
    return get(err, "response.data");
  }
};
