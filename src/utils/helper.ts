import { get } from "lodash";

import { getPage } from "@/service/api";

export const getPageDataByComponent = async (
  page: string,
  component: string
) => {
  const { attributes } = await getPage(page);
  return get(attributes, component);
};
