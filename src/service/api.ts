import { get } from "lodash";

import { strapi, pmsApi } from "./axiosInstances";
import { getCurrentLang, getLocalStorage } from "@/utils/helper";

export const getPage = async (page: string) => {
  const { data } = await strapi.get(
    `/api/${page}?populate=deep&locale=${getCurrentLang() || "en"}`
  );
  return get(data, "data");
};

// export const getPage = async (page: string) => {
//   try {
//     return await strapi.get(
//       `/api/${page}?populate=deep&locale=${getCurrentLang() || "en"}`
//     );
//   } catch (err) {
//     return get(err, "response");
//   }
// };


export const sendDealRequest = async (payload) => {
  try {
    return await pmsApi.post("/owner/deal-request", payload);
  } catch (err) {
    return get(err, "response");
  }
};

export const sendBecomeOwnerRequest = async (payload) => {
  try {
    return await pmsApi.post("/owner/become-owner", payload);
  } catch (err) {
    return get(err, "response");
  }
};

export const auth = async (payload) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.post("/login", payload);
  } catch (err) {
    return get(err, "response");
  }
};

export const getLocations = async () => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.get("/locations");
  } catch (err) {
    return get(err, "response");
  }
};

export const getCorporateTypes = async () => {
  try {
    return await pmsApi.get("/owner/corporate-types");
  } catch (err) {
    return get(err, "response");
  }
};

export const getHomeTypes = async () => {
  try {
    return await pmsApi.get("/owner/home-types");
  } catch (err) {
    return get(err, "response");
  }
};

export const getRoomTypes = async () => {
  try {
    return await pmsApi.get("/owner/room-types");
  } catch (err) {
    return get(err, "response");
  }
};

export const getNestedLocations = async (location) => {
  try {
    return await pmsApi.get(`/owner/nested-locations/${location}`);
  } catch (err) {
    return get(err, "response");
  }
};

export const getRecentReservationDetails = async (id) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.get(`/profile/reservationsDetail/${id}`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`
      }
    });
  } catch (err) {
    return get(err, "response");
  }
};

export const getThreadList = async () => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.get(`/inbox`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`
      }
    });
  } catch (err) {
    return get(err, "response");
  }
};

export const getThreadListByPage = async (page) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.get(`/inbox`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`
      },
      params: { page }
    });
  } catch (err) {
    return get(err, "response");
  }
};

export const getThreadDetails = async (id) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.get(`/inbox/${id}`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`
      }
    });
  } catch (err) {
    return get(err, "response");
  }
};

export const sendMessageToThread = async (id, message) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.post(
      `/inbox/${id}`,
      { body: message },
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage("token")}`
        }
      }
    );
  } catch (err) {
    return get(err, "response");
  }
};

export const getFilters = async () => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.get("/search/filters");
  } catch (err) {
    return get(err, "response");
  }
};

export const getListings = async (params) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    const config = params ? { params: params } : {};
    return await pmsApi.get("/search/results", config);
  } catch (err) {
    return get(err, "response");
  }
};

export const getListingsByPage = async (params) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    const config = params ? { params: params } : {};
    return await pmsApi.get("/search/results", config);
  } catch (err) {
    return get(err, "response");
  }
};

export const getLandingListingTabs = async () => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.get("/listing_concepts");
  } catch (err) {
    return get(err, "response");
  }
};

export const getLandingListingTabDetails = async (id) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.get(`/search/results?concepts=${id}`);
  } catch (err) {
    return get(err, "response");
  }
};

export const getRecentReservations = async (reservationType?: string) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    const param = reservationType ? `/${reservationType}` : "";
    return await pmsApi.get(`/profile/reservations${param}`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`
      }
    });
  } catch (err) {
    return get(err, "response");
  }
};

export const getRecentReservationsByPage = async ({
  reservationType,
  page
}: {
  reservationType?: string;
  page: number;
}) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    const type = reservationType ? `/${reservationType}` : "";
    return await pmsApi.get(`/profile/reservations${type}`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`
      },
      params: { page }
    });
  } catch (err) {
    return get(err, "response");
  }
};

export const signUp = async ({ email, password, fullname, phone }) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  const payload = {
    email,
    phone,
    fullname,
    password
  };

  try {
    return await pmsApi.post("/signup", payload);
  } catch (err) {
    return get(err, "response");
  }
};

export const forgotPassword = async (email) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.post("/forgot-password", email);
  } catch (err) {
    return get(err, "response");
  }
};

// todo: parola yenileme endpointi tamamlanınca güncellenecek
export const profileEdit = async (payload) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.post("/profile/edit", payload, {
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`
      }
    });
  } catch (err) {
    return err;
  }
};

export const getProfile = async () => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.get("/profile/edit", {
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`
      }
    });
  } catch (err) {
    return err;
  }
};

export const listingDetail = async ({ lang, slug, params }) => {
  let uri = `/listing/${slug}`;
  const { check_in, check_out, adults } = params;

  if (check_in && check_out && params) {
    const query = `?check_in=${check_in}&check_out=${check_out}&adults=${
      adults || 1
    }`;
    uri += query;
  }
  pmsApi.defaults.headers.common["lang"] = lang || getCurrentLang();

  try {
    const { data } = await pmsApi.get(uri);

    return get(data, "data");
  } catch (err) {
    return get(err, "data");
  }
};

export const payment = async ({ path, payload }) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.post(`/payment/${path}`, payload);
  } catch (err) {
    return err;
  }
};

export const basket = async (payload) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.post("/basket", payload, {
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`
      }
    });
  } catch (err) {
    return err;
  }
};

export const checkoutPreview = async (payload) => {
  pmsApi.defaults.headers.common["lang"] = getCurrentLang() || "en";
  try {
    return await pmsApi.post("/basket/checkout", payload, {
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`
      }
    });
  } catch (err) {
    return err;
  }
};
