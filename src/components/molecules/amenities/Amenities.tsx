"use client";
import { useEffect, useState } from "react";
import { filter, get, map, size } from "lodash";

import {
  IAmenities,
  IAmenitiesData
} from "@/components/molecules/amenities/types";

import AmenityItem from "@/components/molecules/amenityItem/AmenityItem";
import { useTranslations } from "next-intl";
import Typography from "@/components/atoms/typography/Typography";

const Amenities = ({
  isTitleVisible,
  allFiltersData,
  setAllFiltersData
}: IAmenities) => {
  const [amenitiesData, setAmenitiesData] = useState<IAmenitiesData[]>([]);
  const t = useTranslations()
  const mockAmenities = [
    {
      title: "Popular in this location",
      items: [
        { title: "Pool", value: "pool" },
        { title: "Wi-fi", value: "wifi" },
        { title: "Jakuzi", value: "jakuzi" },
        { title: "Balcony", value: "balcony" },
        { title: "Kitchen", value: "kitchen" },
        { title: "Parking", value: "parking" },
        { title: "Elevator", value: "elevator" }
      ]
    },
    {
      title: "Essentials",
      items: [
        { title: "TV", value: "tv" },
        { title: "Iron", value: "iron" },
        { title: "Dryer", value: "dryer" },
        { title: "Washer", value: "washer" },
        { title: "Heating", value: "heating" },
        { title: "Hair dryer", value: "hairdryer" },
        { title: "Dedicated workspace", value: "workspace" }
      ]
    },
    {
      title: "Features",
      items: [
        { title: "Gym", value: "gym" },
        { title: "Crib", value: "crib" },
        { title: "BBQ Grill", value: "bbq" },
        { title: "Hot tub", value: "hottub" },
        { title: "Charger", value: "charger" },
        { title: "Breakfast", value: "breakfast" },
        { title: "Smoking Allowed", value: "smoking" },
        { title: "Indoor fireplace", value: "fireplace" }
      ]
    },
    {
      title: "Location Features",
      items: [
        { title: "Near the sea", value: "sea" },
        { title: "City Center", value: "citycenter" },
        { title: "Nature interwined", value: "nature" },
        { title: "Near public transport", value: "transport" }
      ]
    }
  ];
  const checkIsIncludes = (data: IAmenitiesData[], value: string) =>
    size(filter(data, (item) => item.value === value)) > 0;

  const handleFilter = ({ value, title }: IAmenitiesData) => {
    setAllFiltersData((prev) => {
      const isIncludes = checkIsIncludes(prev.amenities, value);
      if (isIncludes) {
        return {
          ...prev,
          amenities: filter(prev.amenities, (item) => item.value !== value)
        };
      }
      return { ...prev, amenities: [...prev.amenities, { value, title }] };
    });
  };

  useEffect(() => {
    setAmenitiesData(get(allFiltersData, "amenities"));
  }, [allFiltersData]);

  return (
    <>
      {isTitleVisible && (
        <div className="flex justify-between items-center w-full">
          <Typography element="h6" variant="h6" className="font-mi-sans-semi-bold text-gray-700">
            {t("amenities")}
          </Typography>
        </div>
      )}
      {map(mockAmenities, (amenity, key) => (
        <AmenityItem
          key={key}
          data={amenity}
          checkIsIncludes={checkIsIncludes}
          amenitiesData={amenitiesData}
          handleFilter={handleFilter}
        />
      ))}
    </>
  );
};

export default Amenities;
