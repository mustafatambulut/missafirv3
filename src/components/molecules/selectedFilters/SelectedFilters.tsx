"use client";
import { useState, useEffect } from "react";
import { capitalize, filter, get, map, size } from "lodash";

import {
  ISelectedFilters,
  ISelectedFiltersData
} from "@/components/molecules/selectedFilters/types";

import Slider from "@/components/molecules/slider/Slider";

import CloseIcon from "../../../../public/images/close.svg";
import { numericFormatter } from "react-number-format";

const SelectedFilters = ({
  filterData,
  allFiltersData,
  setAllFiltersData,
  calculateMinMaxListingPrice
}: ISelectedFilters) => {
  const [selectedFilters, setSelectedFilters] = useState<
    ISelectedFiltersData[]
  >([]);

  const handleClearAllFilters = () => {
    const [min, max] = calculateMinMaxListingPrice();
    setAllFiltersData({
      sort: "all",
      concepts: [],
      amenities: [],
      priceType: "total",
      price: { min: min, max: max },
      defaultPriceRange: { min: min, max: max },
      beds: { title: "any", value: "any", type: "beds" },
      bathrooms: { title: "any", value: "any", type: "bathrooms" }
    });
  };
  const handleRemoveFilter = ({ value, key }: ISelectedFiltersData) => {
    switch (key) {
      case "price":
        setAllFiltersData((prevState) => {
          return {
            ...prevState,
            price: {
              min: filterData.defaultPriceRange.min,
              max: filterData.defaultPriceRange.max
            }
          };
        });
        break;
      case "bathrooms":
        setAllFiltersData((prevState) => {
          return {
            ...prevState,
            bathrooms: {
              title: "any",
              value: "any",
              type: "bathrooms"
            }
          };
        });
        break;
      case "beds":
        setAllFiltersData((prevState) => {
          return {
            ...prevState,
            beds: {
              title: "any",
              value: "any",
              type: "beds"
            }
          };
        });
        break;
      case "concepts": {
        const newConcepts = filter(get(allFiltersData, "concepts"), (item) => {
          return get(item, "value") !== value;
        });
        setAllFiltersData((prevState) => {
          return {
            ...prevState,
            concepts: newConcepts
          };
        });
        break;
      }
      case "amenities":
        {
          const newAmenities = filter(
            get(allFiltersData, "amenities"),
            (item) => {
              return get(item, "value") !== value;
            }
          );
          setAllFiltersData((prevState) => {
            return {
              ...prevState,
              amenities: newAmenities
            };
          });
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getSelectedFilters = (): ISelectedFiltersData[] => {
      const selectedFilters = [];
      for (const key in allFiltersData) {
        switch (key) {
          case "price":
            if (
              allFiltersData[key].min !==
                allFiltersData.defaultPriceRange.min ||
              allFiltersData[key].max !== allFiltersData.defaultPriceRange.max
            )
              selectedFilters.push({
                title: `${numericFormatter(
                  `${filterData.defaultPriceRange.min}`,
                  {
                    thousandSeparator: ".",
                    decimalSeparator: ",",
                    suffix: "₺"
                  }
                )} - ${numericFormatter(`${filterData.defaultPriceRange.max}`, {
                  thousandSeparator: ".",
                  decimalSeparator: ",",
                  suffix: "₺"
                })}`,
                value: "",
                key: key
              });
            break;
          case "bathrooms":
          case "beds":
            if (get(allFiltersData[key], "value") !== "any")
              selectedFilters.push({
                type: get(allFiltersData[key], "type"),
                title: `${get(allFiltersData[key], "title")} ${capitalize(
                  get(allFiltersData[key], "type")
                )}`,
                value: get(allFiltersData[key], "value"),
                key: key
              });
            break;
          case "concepts":
            if (allFiltersData[key].length > 0) {
              map(allFiltersData[key], (concept) => {
                selectedFilters.push({
                  title: get(concept, "title"),
                  value: get(concept, "value"),
                  key: key
                });
              });
            }
            break;
          case "amenities":
            if (allFiltersData[key].length > 0) {
              map(allFiltersData[key], (amenity) => {
                selectedFilters.push({
                  title: get(amenity, "title"),
                  value: get(amenity, "value"),
                  key: key
                });
              });
            }
            break;
          default:
            break;
        }
      }
      return selectedFilters;
    };
    setSelectedFilters(getSelectedFilters());
  }, [allFiltersData]);
  return (
    <div className="flex flex-col gap-y-4 pb-3">
      <div className="flex items-center justify-between">
        <div className="text-gray-700 lg:text-gray-800 font-mi-sans-semi-bold text-lg lg:text-2xl">
          Your Selections
        </div>
        <div
          className="text-base lg:text-lg text-gray-700 cursor-pointer"
          onClick={handleClearAllFilters}>
          Clear All
        </div>
      </div>
      {size(selectedFilters) > 0 && (
        <Slider
          spaceBetween={10}
          slidesPerView="auto"
          sliderContainerClassName="w-full"
          sliderIdentifier="all_filters_slider">
          {map(selectedFilters, (filter, index) => (
            <div
              key={index}
              className="select-none flex gap-3 w-auto items-center bg-primary-25 text-primary-500 rounded-full px-4 py-2 lg:py-4 lg:px-6 text-base font-mi-sans-semi-bold ">
              <div>{get(filter, "title")}</div>
              <div onClick={() => handleRemoveFilter(filter)}>
                <CloseIcon className="fill-primary-500 scale-75 cursor-pointer" />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default SelectedFilters;
