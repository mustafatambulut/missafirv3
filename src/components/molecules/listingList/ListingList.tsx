"use client";
import { get, map, size } from "lodash";
import { useTranslations } from "next-intl";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchListingsByPage } from "@/redux/features/listingSlice/listingSlice";

import Loading from "@/components/atoms/loading/Loading";
import ListingListItem from "@/components/molecules/listingListItem/ListingListItem";
import ListingListSkeleton from "@/components/molecules/skeletons/listingListSkeleton/ListingListSkeleton";
import ListingLoadingSkeleton from "@/components/molecules/skeletons/listingLoadingSkeleton/ListingLoadingSkeleton";
import Typography from "@/components/atoms/typography/Typography";

const ListingList = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { listings, loading, filterData, pagination, listingResultsTitle } =
    useAppSelector((state) => state.listingReducer);

  const handleLoadNextPage = () => {
    get(pagination, "current") !== get(pagination, "total") &&
      dispatch(
        fetchListingsByPage({ ...filterData, page: pagination.current + 1 })
      );
  };

  return (
    <Loading isLoading={loading} loader={<ListingListSkeleton />}>
      <div className="flex flex-col flex-1 gap-y-4 px-3 lg:px-0">
        <div>
          {listingResultsTitle && (
            <div className="font-base lg:text-28 px-2">
              <Typography variant="h4" element="h4">{listingResultsTitle}</Typography>
            </div>
          )}
        </div>
        <>
          <Typography variant="p3" element="div" className="px-2">
            {size(listings)} {t("homes")}
          </Typography>
          <InfiniteScroll
            scrollThreshold={0.6}
            next={handleLoadNextPage}
            hasMore={get(pagination, "current") !== get(pagination, "total")}
            loader={<ListingLoadingSkeleton />}
            dataLength={size(listings)}
            className="grid grid-cols-1 gap-5 lg:grid-cols-4 px-2 pb-1">
            {size(listings) === 0 && loading === false ? (
              <div className="text-sm lg:text-lg h-screen">
                {t("no_home_found")}
              </div>
            ) : (
              map(listings, (listing, key) => (
                <ListingListItem
                  key={key}
                  listing={listing}
                  filterData={filterData}
                  inListingResults={true}
                />
              ))
            )}
          </InfiniteScroll>
        </>
      </div>
    </Loading>
  );
};

export default ListingList;
