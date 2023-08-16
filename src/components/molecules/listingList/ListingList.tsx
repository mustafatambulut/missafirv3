import { map, size } from "lodash";

import { IListingList } from "@/components/molecules/listingList/types";

import ListingListItem from "@/components/molecules/listingListItem/ListingListItem";

const ListingList = ({ data, filterData, filteredListings }: IListingList) => {
  const listingCount = (): number => {
    return size(filteredListings) > 0 ? size(filteredListings) : size(data);
  };
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <div className="font-base lg:text-28">
          {/*todo: location alanı dianamikleştirilecek*/}
          <span className="font-mi-sans-semi-bold">Beyoğlu</span> lokasyonundaki
          evler
        </div>
        <div className="text-sm lg:text-lg">{listingCount()} homes</div>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        {size(filteredListings) > 0 ? (
          <>
            {map(filteredListings, (listing, key) => (
              <ListingListItem
                listing={listing}
                filterData={filterData}
                key={key}
              />
            ))}
          </>
        ) : (
          <>
            {map(data, (listing, key) => (
              <ListingListItem
                listing={listing}
                filterData={filterData}
                key={key}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ListingList;
