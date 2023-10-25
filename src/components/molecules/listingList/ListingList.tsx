"use client";
import { useEffect, useState } from "react";
import has from "lodash/has";
import get from "lodash/get";
import map from "lodash/map";
import size from "lodash/size";
import join from "lodash/join";
import includes from "lodash/includes";
import { useTranslations } from "next-intl";
import { Pagination } from "@nextui-org/pagination";
import { usePathname, useRouter } from "next/navigation";

import {
  updateLoading,
  updateSearchClicked
} from "@/redux/features/listingSlice/listingSlice";
import useFilter from "@/app/hooks/useFilter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IListingList } from "@/components/molecules/listingList/types";

import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import ListingListItem from "@/components/molecules/listingListItem/ListingListItem";
import ListingListSkeleton from "@/components/molecules/skeletons/listingListSkeleton/ListingListSkeleton";

const ListingList = ({ lang, data }: IListingList) => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { cleanFilterData } = useFilter();
  const [isLoading, setIsLoading] = useState(false);
  const loading = useAppSelector((state) => state.listingReducer.loading);
  const filterData = useAppSelector((state) => state.listingReducer.filterData);

  const handleLoadNextPage = (currentPage) => {
    setIsLoading(true);
    const tempUri = [];
    const result = cleanFilterData(filterData);

    map(result, (value, key) => {
      if (!includes(tempUri, key) && value) {
        return tempUri.push(`${key}=${value}`);
      }
    });

    tempUri.push(`page=${currentPage}`);
    const queryParams = join(tempUri, "&") ? `${join(tempUri, "&")}` : "";
    router.push(`${pathname}?${queryParams}`);
    setIsLoading(false);
  };

  useEffect(() => {
    if (has(data, "items")) {
      dispatch(updateSearchClicked(false));
      dispatch(updateLoading(false));
    }
  }, [data]);

  return (
    <Loading isLoading={isLoading || loading} loader={<ListingListSkeleton />}>
      <div className="flex flex-col flex-1 gap-y-4 px-3 lg:px-0">
        <div>
          {get(data, "title") && (
            <div className="font-base lg:text-28 px-2">
              <Typography variant="h4" element="h4">
                {get(data, "title")}
              </Typography>
            </div>
          )}
        </div>
        {!!size(get(data, "items")) && (
          <Typography variant="p3" element="div" className="px-2">
            {size(get(data, "items"))} {t("homes")}
          </Typography>
        )}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 2xl:grid-cols-5 px-2 pb-1">
          {size(get(data, "items")) ? (
            map(get(data, "items"), (listing, key) => (
              <ListingListItem key={key} lang={lang} listing={listing} />
            ))
          ) : (
            <div className="text-sm lg:text-lg h-screen">
              {t("no_home_found")}
            </div>
          )}
        </div>
        <Pagination
          isCompact
          showControls
          variant="light"
          classNames={{
            wrapper: "gap-0 overflow-visible shadow-sm rounded-xl",
            item: "w-8 rounded-lg",
            cursor: "rounded-2xl text-white"
          }}
          className="flex justify-center"
          onChange={handleLoadNextPage}
          total={get(data, "pagination.total")}
          initialPage={1}
        />
      </div>
    </Loading>
  );
};

export default ListingList;
