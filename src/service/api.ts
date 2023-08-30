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

export const auth = async (payload) => {
  try {
    return await pmsApi.post("/login", payload);
  } catch (err) {
    return get(err, "response.data");
  }
};

export const getLocations = async () => {
  try {
    return await pmsApi.get("/locations");
  } catch (err) {
    return get(err, "response.data");
  }
};

export const signUp = async ({ email, password, fullname, phone }) => {
  const payload = {
    email,
    phone,
    fullname,
    password
  };

  try {
    return await pmsApi.post("/signup", payload);
  } catch (err) {
    return get(err, "response.data");
  }
};

export const forgotPassword = async (email) => {
  try {
    return await pmsApi.post("/forgot-password", email);
  } catch (err) {
    return get(err, "response.data");
  }
};

// todo: parola yenileme endpointi tamamlanınca güncellenecek
export const profileEdit = async (payload) => {
  try {
    return await pmsApi.post("/profile/edit", payload);
  } catch (err) {
    return err;
  }
};

export const listingDetail = async (slug) => {
  try {
    const { data } = await pmsApi.get(`/listing/${slug}`);
    return get(data, "data");
  } catch (err) {
    return err;
  }
};
