"use client";
import { useEffect, useState } from "react";
import { filter, get, map, size } from "lodash";

import {
  IConcepts,
  IConceptsData
} from "@/components/molecules/concepts/types";

import FilterControlButtons from "@/components/molecules/filterControlButtons/FilterControlButtons";

import CloseIcon from "../../../../public/images/close.svg";
import ConceptItem from "@/components/atoms/conceptItem/ConceptItem";

const Concepts = ({
  filterData,
  setFilterData,
  allFiltersData,
  filterListings,
  setAllFiltersData,
  setIsDropdownOpen,
  showButtons = true,
  tempFilteredListings,
  isTitleVisible = true,
  isInAllFilters = false,
  isDeleteButtonsVisible = true
}: IConcepts) => {
  const [concepts, setConcepts] = useState<IConceptsData[]>([]);

  const checkIsIncludes = (data: IConceptsData[], value: string) =>
    size(filter(data, (item) => item.value === value)) > 0;

  // todo: test amaçlı eklenmiştir, düzenlenecek
  const mockConceptsData = [
    {
      title: "VIP",
      value: "vip"
    },
    {
      title: "Friendly",
      value: "friendly"
    },
    {
      title: "Conservative",
      value: "conservative"
    },
    {
      title: "Luxury Villas",
      value: "luxuryVillas"
    },
    {
      title: "Infant Friendly",
      value: "infantFriendly"
    },
    {
      title: "Special Concept",
      value: "specialConcept"
    },
    {
      title: "Business Friendly",
      value: "businessFriendly"
    }
  ];

  const handleFilter = ({ value, title }: IConceptsData) => {
    const conceptItem = { value, title };

    if (isInAllFilters && allFiltersData) {
      if (setAllFiltersData) {
        setAllFiltersData((prev) => ({
          ...prev,
          concepts: checkIsIncludes(prev.concepts, value)
            ? prev.concepts.filter((item) => item.value !== value)
            : [...prev.concepts, conceptItem]
        }));
      }
    } else {
      setConcepts((prev) => {
        return checkIsIncludes(prev, value)
          ? prev.filter((item) => item.value !== value)
          : [...prev, conceptItem];
      });
    }
  };

  const applyFilter = () => {
    if (!isInAllFilters) {
      setFilterData((prev) => ({ ...prev, concepts }));
      if (setIsDropdownOpen) {
        setIsDropdownOpen(false);
      }
    }
  };

  const handleClear = () => {
    if (!isInAllFilters) {
      setConcepts([]);
    }
  };

  useEffect(() => {
    const tempFilterData = {
      ...filterData,
      concepts: concepts
    };
    filterListings && filterListings("temp", tempFilterData);
  }, [concepts, filterData, filterListings]);

  useEffect(() => {
    if (isInAllFilters && allFiltersData) {
      setConcepts(get(allFiltersData, "concepts"));
    } else {
      setConcepts(get(filterData, "concepts"));
    }
  }, [filterData, allFiltersData, isInAllFilters]);

  return (
    <div className="flex flex-wrap gap-3 grid-cols-3">
      {isTitleVisible && (
        <div className="flex justify-between items-center w-full mb-3">
          <h6 className="text-xl font-mi-sans-semi-bold text-gray-700">
            Concepts
          </h6>
          {isInAllFilters && (
            <CloseIcon
              className="fill-gray-800 scale-75"
              onClick={() =>
                setIsDropdownOpen ? setIsDropdownOpen(false) : null
              }
            />
          )}
        </div>
      )}
      {map(mockConceptsData, (item, key) => (
        <ConceptItem
          key={key}
          data={item}
          concepts={concepts}
          handleFilter={handleFilter}
          isInAllFilters={isInAllFilters}
          checkIsIncludes={checkIsIncludes}
          isDeleteButtonsVisible={isDeleteButtonsVisible}
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

export default Concepts;
