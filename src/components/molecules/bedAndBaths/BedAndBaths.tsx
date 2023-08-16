"use client";
import { useEffect, useState } from "react";
import { get, keys, map, size } from "lodash";

import {
  IBedsData,
  IBedAndBaths,
  IBathroomsData
} from "@/components/molecules/bedAndBaths/types";

import BedAndBathItem from "@/components/atoms/bedAndBathItem/BedAndBathItem";
import FilterControlButtons from "@/components/molecules/filterControlButtons/FilterControlButtons";

import CloseIcon from "../../../../public/images/close.svg";

const BedAndBaths = ({
  filterData,
  setFilterData,
  allFiltersData,
  filterListings,
  setAllFiltersData,
  setIsDropdownOpen,
  showButtons = true,
  tempFilteredListings,
  isTitleVisible = true,
  isInAllFilters = false
}: IBedAndBaths) => {
  const [bedsData, setBedsData] = useState<IBedsData>({
    type: "beds",
    value: "any",
    title: "Any"
  });

  const [bathroomsData, setBathroomsData] = useState<IBathroomsData>({
    value: "any",
    title: "Any",
    type: "bathrooms"
  });

  // todo: test amaçlı eklenmiştir, düzenlenecek
  const mockBedAndBathsData = {
    beds: [
      { title: "Any", value: "any", type: "beds" },
      { title: "1", value: "1", type: "beds" },
      { title: "2", value: "2", type: "beds" },
      { title: "3", value: "3", type: "beds" },
      { title: "4", value: "4", type: "beds" },
      { title: "4'ten fazla", value: "more", type: "beds" }
    ],
    bathrooms: [
      { title: "Any", value: "any", type: "bathrooms" },
      { title: "1", value: "1", type: "bathrooms" },
      { title: "2", value: "2", type: "bathrooms" },
      { title: "3", value: "3", type: "bathrooms" },
      { title: "4", value: "4", type: "bathrooms" },
      { title: "4'ten fazla", value: "more", type: "bathrooms" }
    ]
  };

  const handleFilter = ({ type, value, title }: IBedsData | IBathroomsData) => {
    const bedAndBathsItem = { value, title, type };
    if (isInAllFilters) {
      if (setAllFiltersData) {
        setAllFiltersData((prev) => ({
          ...prev,
          [type]: bedAndBathsItem
        }));
      }
    } else {
      type === "beds"
        ? setBedsData(bedAndBathsItem)
        : setBathroomsData(bedAndBathsItem);
    }
  };

  const applyFilter = () => {
    if (!isInAllFilters) {
      setFilterData((prev) => ({
        ...prev,
        beds: bedsData,
        bathrooms: bathroomsData
      }));
      if (setIsDropdownOpen) {
        setIsDropdownOpen(false);
      }
    }
  };

  const handleClear = () => {
    if (!isInAllFilters) {
      setBedsData({ title: "any", value: "any", type: "beds" });
      setBathroomsData({ title: "any", value: "any", type: "bathrooms" });
    }
  };

  useEffect(() => {
    const tempFilterData = {
      ...filterData,
      beds: bedsData,
      bathrooms: bathroomsData
    };
    filterListings && filterListings("temp", tempFilterData);
  }, [bedsData, bathroomsData, filterListings, filterData]);

  useEffect(() => {
    if (isInAllFilters && allFiltersData) {
      setBedsData(get(allFiltersData, "beds"));
      setBathroomsData(get(allFiltersData, "bathrooms"));
    } else {
      setBedsData(filterData.beds);
      setBathroomsData(filterData.bathrooms);
    }
  }, [filterData, allFiltersData, isInAllFilters]);

  return (
    <div className="flex flex-col justify-start items-start gap-3">
      {isTitleVisible && (
        <div className="flex justify-between items-center w-full">
          <h6 className="text-xl font-mi-sans-semi-bold text-gray-700">
            Bed & Bats
          </h6>
          {!isInAllFilters && (
            <CloseIcon
              className="fill-gray-800 scale-75"
              onClick={() =>
                setIsDropdownOpen ? setIsDropdownOpen(false) : null
              }
            />
          )}
        </div>
      )}
      {map(keys(mockBedAndBathsData), (item, key) => (
        <BedAndBathItem
          key={key}
          data={item}
          bedsData={bedsData}
          handleFilter={handleFilter}
          bathroomsData={bathroomsData}
          mockBedAndBathsData={mockBedAndBathsData}
        />
      ))}
      {showButtons && (
        <FilterControlButtons
          applyFilter={applyFilter}
          handleClear={handleClear}
          filteredCount={size(tempFilteredListings)}
        />
      )}
    </div>
  );
};

export default BedAndBaths;
