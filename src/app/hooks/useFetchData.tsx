import { useEffect, useState } from "react";
import { find, forEach, get, head, isArray, size } from "lodash";

import { useAppSelector } from "@/redux/hooks";

const useFetchData = (sections: string | [], component?: string) => {
  const [data, setData] = useState(null);

  const entities = useAppSelector((state) => state.landingReducer.entities);

  const pluralSection = () => {
    const selected = get(head(entities), sections);
    return !component ? selected : find(selected, { __component: component });
  };

  const singleSection = () => {
    const result = [];
    forEach(sections, (section) => {
      result[section] = get(head(entities), section);
    });
    return result;
  };

  useEffect(() => {
    if (!size(entities)) return;
    const result = !isArray(sections) ? pluralSection() : singleSection();
    setData(result);
  }, [entities]);

  return data;
};

export default useFetchData;
