"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import { get, has, map, sortBy, isNull, compact, lowerCase } from "lodash";

import { updateBookingDestination } from "@/redux/features/listingSlice/listingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BOOKING_DATE } from "@/components/molecules/searchBar/constants";
import { IDestinationSelect } from "@/components/atoms/destinationSelect/types";

import Select from "@/components/atoms/select/Select";

import "swiper/css";
import "./DestinationSelect.css";

const DestinationSelect = ({
  setActiveSearchItem,
  isInCustomSection = false
}: IDestinationSelect) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const locations = useAppSelector((state) => state.landingReducer.locations);
  const filterData = useAppSelector((state) => state.listingReducer.filterData);
  const bookingDestination = useAppSelector(
    (state) => state.listingReducer.bookingDestination
  );
  const [formattedDestinations, setFormattedDestinations] = useState([]);

  const destinationFilterOption = (option, inputValue) => {
    const { label, value, data } = option;
    return (
      lowerCase(label).includes(lowerCase(inputValue)) ||
      lowerCase(get(data, "desc")).includes(lowerCase(inputValue)) ||
      lowerCase(value).includes(lowerCase(inputValue))
    );
  };

  const handleOnChange = (locationData: any) => {
    if (isNull(get(locationData, "value"))) {
      dispatch(updateBookingDestination(null));
    } else {
      dispatch(updateBookingDestination(locationData));
      setActiveSearchItem(BOOKING_DATE);
    }
  };

  const handleControlTitle = () => {
    if (isInCustomSection) return "";
    if (
      !isNull(bookingDestination) ||
      has(filterData, "district_id") ||
      has(filterData, "city_id")
    ) {
      return t("where");
    }
  };

  const handleValue = () => {
    if (isInCustomSection) {
      if (has(filterData, "value")) {
        return get(filterData, "value");
      } else {
        if (has(filterData, "city_id") && has(filterData, "district_id")) {
          return get(filterData, "district_id");
        } else if (has(filterData, "city_id")) {
          return get(filterData, "city_id");
        }
      }
    }
  };

  useEffect(() => {
    const formattedDestinations = compact(
      map(
        locations,
        ({
          id,
          type,
          slug,
          city,
          order,
          country,
          city_slug,
          district,
          country_id,
          country_slug
        }) => ({
          value: id,
          type,
          slug,
          order,
          country,
          city_slug,
          country_id,
          country_slug,
          isHistory: false,
          isPopularDestinations: false,
          label: type === "district" ? district : city,
          desc: type === "district" ? `${city} / ${country}` : country
        })
      )
    );
    setFormattedDestinations(sortBy(formattedDestinations, ["order"]));
  }, [locations]);

  return (
    <div className="relative">
      <Select
        filterOption={destinationFilterOption}
        isSearchable={true}
        isClearable={true}
        onChange={handleOnChange}
        items={formattedDestinations}
        showSearchIcon={true}
        searchIconPosition="left"
        searchId="booking-location"
        placeHolder={t("any_where")}
        placeholderClassName="text-21 text-gray-600"
        controlTitle={handleControlTitle()}
        value={handleValue()}
        {...(isInCustomSection && {
          placeholderClassName: "lg:text-base text-gray-600 font-mi-semi-bold",
          valueContainerClassName: "w-[7.3rem] text-sm lg:text-16"
        })}
        {...(isMobile && !isInCustomSection && { menuIsOpen: true })}
      />
    </div>
  );
};

export default DestinationSelect;
