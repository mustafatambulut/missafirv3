import { useEffect, useState } from "react";
import find from "lodash/find";
import get from "lodash/get";
import head from "lodash/head";
import forEach from "lodash/forEach";
import isArray from "lodash/isArray";
import { useSelector } from "react-redux";

const useFetchData = (sections: string | [], component?: string) => {
  const [data, setData] = useState(null);

  const res = useSelector((state) => state.landingReducer);

  const pluralSection = () => {
    const selected = get(head(get(res, "entities")), sections);
    return !component ? selected : find(selected, { __component: component });
  };

  const singleSection = () => {
    const result = [];
    forEach(sections, (section) => {
      result[section] = get(head(get(res, "entities")), section);
    });
    return result;
  };

  useEffect(() => {
    if (get(res, "loading")) return;

    const result = !isArray(sections) ? pluralSection() : singleSection();
    setData(result);
  }, [get(res, "loading")]);

  return data;
};

export default useFetchData;
