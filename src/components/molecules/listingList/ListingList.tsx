"use client";
import { get, map, size } from "lodash";
import { useAppSelector } from "@/redux/hooks";

import Loading from "@/components/atoms/loading/Loading";
import ListingListItem from "@/components/molecules/listingListItem/ListingListItem";

const ListingList = () => {
  const { listings, loading, searchLocation } = useAppSelector(
    (state) => state.listingReducer
  );
  return (
    <Loading
      isLoading={loading}
      loader={<p className="h-screen">Loading feed...</p>}>
      <div className="flex flex-col gap-y-4">
        <div>
          <div className="font-base lg:text-28">
            {/*todo: location alanı dianamikleştirilecek*/}
            {searchLocation && (
              <h1>
                <span className="font-mi-sans-semi-bold mr-1">
                  {get(searchLocation, "district.name")}
                </span>
                <span>lokasyonundaki evler</span>
              </h1>
            )}
          </div>
        </div>
        {size(listings) === 0 ? (
          <div className="text-sm lg:text-lg h-screen">No home found</div>
        ) : (
          <>
            <div className="text-sm lg:text-lg">{size(listings)} homes</div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              {size(listings) &&
                map(listings, (listing, key) => (
                  <ListingListItem listing={listing} key={key} />
                ))}
            </div>
          </>
        )}
      </div>
    </Loading>
  );
};

export default ListingList;
