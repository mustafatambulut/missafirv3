"use client";
import map from "lodash/map";
import omit from "lodash/omit";
import size from "lodash/size";
import join from "lodash/join";
import isNull from "lodash/isNull";
import values from "lodash/values";
import isEmpty from "lodash/isEmpty";
import compact from "lodash/compact";
import isEqual from "lodash/isEqual";

import {
  updateLoading,
  updateSearchClicked
} from "@/redux/features/listingSlice/listingSlice";
import { useRouter } from "next/navigation";
import { getCurrentLang } from "@/utils/helper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const useFilter = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const bookingDestination = useAppSelector(
    (state) => state.listingReducer.bookingDestination,
    isEqual
  );
  const filterData = useAppSelector(
    (state) => state.listingReducer.filterData,
    isEqual
  );

  const replaceValue = (value: string, additional?: string) => {
    return `${value ? `${additional || "/"}${value}` : ""}`;
  };

  const handleSearchUrl = (data: any) => {
    const tempUri: string[] = [];
    const { slug, city_slug } = data;
    const queries = cleanFilterData(data);

    map(queries, (value, key) => {
      if (value) return tempUri.push(`${key}=${value}`);
    });

    const locationPath = `${replaceValue(city_slug)}${replaceValue(slug)}`;
    const queryParams = replaceValue(join(tempUri, "&"), "?");
    const vals = values(bookingDestination);

    if (!size(compact(vals)) || isNull(bookingDestination) || !locationPath) {
      return `/list${queryParams}`;
    } else {
      return `${locationPath}${queryParams}`;
    }
  };

  const cleanFilterData = (data: any) => {
    return omit(data, [
      "slug",
      "type",
      "desc",
      "value",
      "label",
      "order",
      "country",
      "city_id",
      "city_slug",
      "isHistory",
      "country_id",
      "district_id",
      "country_slug",
      "isPopularDestinations"
    ]);
  };

  const handleFilterListings = (customData = null) => {
    dispatch(updateLoading(true));
    dispatch(updateSearchClicked(true));
    const data = customData || filterData;
    if (isEmpty(data)) {
      router.push(`/${getCurrentLang()}/list`);
    } else {
      const url = handleSearchUrl(data);
      return router.push(url);
    }
  };

  return {
    replaceValue,
    cleanFilterData,
    handleSearchUrl,
    handleFilterListings
  };
};

export default useFilter;
