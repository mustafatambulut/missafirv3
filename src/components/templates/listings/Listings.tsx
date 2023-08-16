"use client";
import { useCallback, useEffect, useState } from "react";
import { filter, first, flattenDeep, last, map, orderBy, size } from "lodash";

import { IListings } from "@/components/templates/listings/types";
import { IFilterData } from "@/components/molecules/filter/types";
import { IConceptsData } from "@/components/molecules/concepts/types";
import { IListingData } from "@/components/molecules/listingListItem/types";

import Filter from "@/components/molecules/filter/Filter";
import ListingList from "@/components/molecules/listingList/ListingList";

const Listings = ({ data }: IListings) => {
  const [filteredListings, setFilteredListings] = useState<IListingData[]>([]);
  const [tempFilteredListings, setTempFilteredListings] = useState<
    IListingData[]
  >([]);
  // todo: filter'a işlevselliğini kazandırmak amaçlı oluşturuldu, düzenlenecek
  const [filterData, setFilterData] = useState<IFilterData>({
    sort: "all",
    concepts: [],
    amenities: [],
    priceType: "total",
    price: { min: 0, max: 0 },
    defaultPriceRange: { min: 0, max: 0 },
    beds: { title: "any", value: "any", type: "beds" },
    bathrooms: { title: "any", value: "any", type: "bathrooms" }
  });

  const filterListings = useCallback(
    (type: string, filterData: IFilterData) => {
      const filteredListings = filter(data, (listing) => {
        const checkIsConceptIncludes = (data: IConceptsData[], value: string) =>
          size(filter(data, (item) => item.value === value)) > 0;
        if (
          listing.price[filterData.priceType as keyof typeof listing.price]
            .value <= filterData.price.max &&
          listing.price[filterData.priceType as keyof typeof listing.price]
            .value >= filterData.price.min &&
          (checkIsConceptIncludes(filterData.concepts, listing.concept) ||
            filterData.concepts.length === 0) &&
          (listing.beds.value === filterData.beds.value ||
            filterData.beds.value === "any") &&
          (listing.bathrooms.value === filterData.bathrooms.value ||
            filterData.bathrooms.value === "any")
        ) {
          return true;
        }
        return false;
      });
      type === "temp"
        ? setTempFilteredListings(filteredListings)
        : setFilteredListings(filteredListings);
    },
    [data]
  );

  useEffect(() => {
    filterListings("default", filterData);
  }, [filterData, filterListings]);

  const calculateMinMaxListingPrice = useCallback((): number[] => {
    return orderBy(
      flattenDeep(
        map(
          data,
          (listing) =>
            listing.price[filterData.priceType as keyof typeof listing.price]
              .value
        )
      ),
      [],
      ["asc"]
    );
  }, [filterData.priceType, data]);

  useEffect(() => {
    const minMaxValue = calculateMinMaxListingPrice();
    if (size(minMaxValue) > 0) {
      const min = first(minMaxValue) || 0;
      const max = last(minMaxValue) || 0;
      setFilterData((prev) => {
        return {
          ...prev,
          defaultPriceRange: {
            ...prev.defaultPriceRange,
            min,
            max
          },
          price: {
            ...prev.price,
            min,
            max
          }
        };
      });
    }
  }, [filterData.priceType, calculateMinMaxListingPrice]);

  return (
    <div className="grid grid-cols-1 gap-y-3 px-5">
      <Filter
        filterData={filterData}
        setFilterData={setFilterData}
        filterListings={filterListings}
        tempFilteredListings={tempFilteredListings}
        calculateMinMaxListingPrice={calculateMinMaxListingPrice}
      />
      <ListingList
        data={data}
        filterData={filterData}
        filteredListings={filteredListings}
      />
    </div>
  );
};

export default Listings;
