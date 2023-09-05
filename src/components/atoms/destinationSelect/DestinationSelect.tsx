"use client";
import React, { useEffect, useState } from "react";
import { compact, has, keys, map } from "lodash";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { BOOKING_DATE } from "@/components/molecules/searchBar/constants";
import { IDestinationSelect } from "@/components/atoms/destinationSelect/types";

import "swiper/css";
import "./DestinationSelect.css";

import Search from "@/components/atoms/search/Search";
import { updateBookingDestination } from "@/redux/features/listingSlice/listingSlice";

const DestinationSelect = ({
  setActiveSearchItem,
  isInCustomSection = false
}: IDestinationSelect) => {
  const dispatch = useAppDispatch();
  const { filterData, bookingDestination } = useAppSelector(
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

  const handleOnChange = (e: any) => {
    dispatch(updateBookingDestination(e));
    setActiveSearchItem(BOOKING_DATE);
  };

  useEffect(() => {
    const formattedDestinations = compact(
      map(keys(locations), (location) => {
        return {
          value: location,
          label: locations[location].district,
          isPopularDestinations: false,
          desc: `${locations[location].city} / ${locations[location].country}`,
          isHistory: false
        };
      })
    );
    setFormattedDestinations(formattedDestinations);
  }, [locations]);

  return (
    <div className="relative">
      <Search
        onChange={handleOnChange}
        items={formattedDestinations}
        showSearchIcon={true}
        searchIconPosition="left"
        searchId="booking-location"
        placeHolder={
          isMobile
            ? "Where do you want to go?"
            : isInCustomSection
            ? "Destination"
            : "Search destinations"
        }
        {...(isInCustomSection &&
          has(filterData, "district_id") && {
            value: bookingDestination
          })}
        {...(!isInCustomSection && {
          controlTitle: "Where"
        })}
        {...(isMobile && !isInCustomSection && { menuIsOpen: true })}
      />
    </div>
  );
};

export default DestinationSelect;
