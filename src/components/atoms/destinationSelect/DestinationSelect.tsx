"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import { compact, get, has, lowerCase, map, sortBy } from "lodash";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BOOKING_DATE } from "@/components/molecules/searchBar/constants";
import { IDestinationSelect } from "@/components/atoms/destinationSelect/types";
import { updateBookingDestination } from "@/redux/features/listingSlice/listingSlice";

import Select from "@/components/atoms/select/Select";

import "swiper/css";
import "./DestinationSelect.css";

const DestinationSelect = ({
  setActiveSearchItem,
  isInCustomSection = false
}: IDestinationSelect) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { filterData, preFilterData } = useAppSelector(
    (state) => state.listingReducer
  );
  const { locations } = useAppSelector((state) => state.landingReducer);
  const [formattedDestinations, setFormattedDestinations] = useState([]);
  //todo : örnek location datası. popular Destinations için kullanılacak

  // const destinationOptions = [
  //   {
  //     label: "Popular Destinations",
  //     isPopularDestinations: true,
  //     options: [
  //       {
  //         value: "london",
  //         label: "London",
  //         desc: "United Kingdom",
  //         image: "destination.jpg",
  //         isPopularDestinations: true,
  //         isHistory: false
  //       },
  //       {
  //         value: "newyork",
  //         label: "New York",
  //         desc: "United States",
  //         image: "destination.jpg",
  //         isPopularDestinations: true,
  //         isHistory: false
  //       },
  //       {
  //         value: "istanbul",
  //         label: "Istanbul",
  //         desc: "Turkey",
  //         image: "destination.jpg",
  //         isPopularDestinations: true,
  //         isHistory: false
  //       },
  //       {
  //         value: "antalya",
  //         label: "Antalya",
  //         desc: "Turkey",
  //         image: "destination.jpg",
  //         isPopularDestinations: true,
  //         isHistory: false
  //       },
  //       {
  //         value: "stockholm",
  //         label: "Stockholm",
  //         desc: "Sweden",
  //         image: "destination.jpg",
  //         isPopularDestinations: true,
  //         isHistory: false
  //       }
  //     ]
  //   },
  //   {
  //     value: "icmeler",
  //     label: "İçmeler",
  //     isPopularDestinations: false,
  //     desc: "Marmaris/Muğla, Türkiye",
  //     isHistory: false
  //   },
  //   {
  //     value: "uzungol",
  //     label: "Uzungöl",
  //     isPopularDestinations: false,
  //     desc: "Çaykara/Trabzon, Türkiye",
  //     isHistory: false
  //   },
  //   {
  //     label: "En Son Bakılanlar",
  //     isPopularDestinations: false,
  //     options: [
  //       {
  //         value: "uzungol",
  //         label: "Uzungöl",
  //         desc: "Çaykara/Trabzon, Türkiye",
  //         isPopularDestinations: false,
  //         isHistory: true
  //       }
  //     ]
  //   }
  // ];

  const destinationFilterOption = (option, inputValue) => {
    const { label, value, data } = option;
    return (
      lowerCase(label).includes(lowerCase(inputValue)) ||
      lowerCase(get(data, "desc")).includes(lowerCase(inputValue)) ||
      lowerCase(value).includes(lowerCase(inputValue))
    );
  };

  const handleOnChange = (e: any) => {
    dispatch(updateBookingDestination(e));
    setActiveSearchItem(BOOKING_DATE);
  };

  useEffect(() => {
    const formattedDestinations = compact(
      map(locations, (location) => {
        return {
          value: get(location, "id"),
          label:
            get(location, "type") === "district"
              ? get(location, "district")
              : get(location, "city"),
          isPopularDestinations: false,
          desc:
            get(location, "type") === "district"
              ? `${get(location, "city")} / ${get(location, "country")}`
              : get(location, "country"),
          isHistory: false,
          order: get(location, "order"),
          slug: get(location, "slug"),
          country: get(location, "country")
        };
      })
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
        placeHolder={
          isMobile
            ? t("where_do_you_want_to_go")
            : isInCustomSection
            ? t("any_where")
            : t("search_destinations")
        }
        {...(isInCustomSection &&
          has(filterData, "district_id") && {
            value: get(preFilterData, "district_id")
          })}
        {...(!isInCustomSection && {
          controlTitle: t("where")
        })}
        {...(isInCustomSection && {
          placeholderClassName: "lg:text-base text-gray-600 font-mi-semi-bold",
          valueContainerClassName: "w-[6.3rem]"
        })}
        {...(isMobile && !isInCustomSection && { menuIsOpen: true })}
      />
    </div>
  );
};

export default DestinationSelect;
