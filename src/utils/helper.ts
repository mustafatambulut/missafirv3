import { forEach, get, has, isArray, size } from "lodash";

import { getPage } from "@/service/api";

export const getPageDataByComponent = async (
  page: string,
  components?: string | []
) => {
  const { attributes } = await getPage(page);
  const result = [];

  if (!isArray(components)) {
    return get(attributes, components);
  }
  forEach(components, (comp) => (result[comp] = get(attributes, comp)));
  return result;
};
export const groupArrayBySize = (array, size) => {
  const arrays = [];

  while (array.length > 0) arrays.push(array.splice(0, size));

  return arrays;
};

export const getScrollPosition = () => window.scrollY;

export const checkIsCustomColor = (props, color: string): boolean => {
  if (!size(props.getValue())) return;

  const selectedValue = get(props.getValue(), "0.attributes");
  if (!has(selectedValue, "type")) return;

  const { type, value } = selectedValue;
  return type === "filter" && value === color;
};
