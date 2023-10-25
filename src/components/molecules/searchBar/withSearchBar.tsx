"use client";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import get from "lodash/get";
import has from "lodash/has";
import map from "lodash/map";
import omit from "lodash/omit";
import first from "lodash/first";
import compact from "lodash/compact";
import classNames from "classnames";

import {
  BOOKING_DATE,
  BOOKING_GUESTS,
  DESTINATION_TYPE,
  BOOKING_DESTINATION
} from "@/components/molecules/searchBar/constants";
import {
  updateFilterData,
  updateBookingDate,
  updateBookingGuests,
  updateBookingDestination
} from "@/redux/features/listingSlice/listingSlice";
import useFilter from "@/app/hooks/useFilter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const withSearchBar = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { handleFilterListings } = useFilter();
    const dispatch = useAppDispatch();
    const drawerCloseRef = useRef<HTMLInputElement>(null);
    const filterData = useAppSelector(
      (state) => state.listingReducer.filterData
    );
    const bookingDate = useAppSelector(
      (state) => state.listingReducer.bookingDate
    );
    const bookingGuests = useAppSelector(
      (state) => state.listingReducer.bookingGuests
    );
    const bookingDestination = useAppSelector(
      (state) => state.listingReducer.bookingDestination
    );
    const locations = useAppSelector((state) => state.landingReducer.locations);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [activeSearchItem, setActiveSearchItem] = useState<string>("");
    const [skipButtonVisibility, setSkipButtonVisibility] =
      useState<boolean>(true);

    const containerClass = classNames(
      "flex rounded-2xl lg:bg-white w-full items-center",
      {
        "lg:px-2 shadow-bold-blur-20 flex-row": get(props, "isInCustomSection"),
        "lg:p-2 flex-col lg:flex-row": !get(props, "isInCustomSection")
      }
    );

    const handleOpenDrawer = (searchItem) => {
      setIsDrawerOpen((v) => !v);
      setActiveSearchItem(searchItem);
    };

    const getSelectedLocation = (locationId) => {
      return first(
        compact(
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
            }) => {
              // const countryRoutes = map(
              //   get(route, "baseListingCountryRoutes"),
              //   getCurrentLang()
              // );
              if (id === locationId) {
                return {
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
                };
              }
            }
          )
        )
      );
    };

    useEffect(() => {
      const isInCustomSection = get(props, "isInCustomSection", false);
      switch (activeSearchItem) {
        case BOOKING_DESTINATION:
          if (bookingDestination === null) {
            setSkipButtonVisibility(true);
          } else {
            setSkipButtonVisibility(false);
          }
          break;
        case BOOKING_DATE:
          if (
            get(bookingDate, "startDate") === null &&
            get(bookingDate, "endDate") === null
          ) {
            setSkipButtonVisibility(true);
          } else {
            setSkipButtonVisibility(false);
          }
          break;
        case BOOKING_GUESTS:
          if (isInCustomSection) {
            setSkipButtonVisibility(false);
          } else {
            if (
              get(bookingGuests, "adults") === 0 &&
              get(bookingGuests, "kids") === 0 &&
              !get(bookingGuests, "pets")
            ) {
              setSkipButtonVisibility(true);
            } else {
              setSkipButtonVisibility(false);
            }
          }
          break;
        default:
          break;
      }
    }, [activeSearchItem, bookingDestination, bookingDate, bookingGuests]);

    useEffect(() => {
      if (bookingDestination) {
        const keyByType =
          get(bookingDestination, "type") === DESTINATION_TYPE.CITY
            ? "city_id"
            : "district_id";

        const data = {
          ...filterData,
          ...bookingDestination
        };
        data[keyByType] = get(bookingDestination, "value");
        dispatch(updateFilterData(data));
      } else {
        dispatch(
          updateFilterData(
            omit(filterData, ["district_id", "city_id", "value"])
          )
        );
      }
    }, [bookingDestination]);

    useEffect(() => {
      const omitFilter = omit(filterData, ["check_in", "check_out"]);
      get(bookingDate, "startDate")
        ? (omitFilter["check_in"] = bookingDate?.startDate.format("YYYY-MM-DD"))
        : null;
      get(bookingDate, "endDate")
        ? (omitFilter["check_out"] = bookingDate?.endDate.format("YYYY-MM-DD"))
        : null;
      dispatch(updateFilterData(omitFilter));
    }, [bookingDate]);

    useEffect(() => {
      if (get(bookingGuests, "adults") > 0) {
        dispatch(
          updateFilterData({
            ...filterData,
            adults: get(bookingGuests, "adults")
          })
        );
      } else {
        dispatch(updateFilterData(omit(filterData, ["adults"])));
      }
    }, [get(bookingGuests, "adults")]);

    useEffect(() => {
      if (get(bookingGuests, "kids") > 0) {
        dispatch(
          updateFilterData({
            ...filterData,
            kids: get(bookingGuests, "kids")
          })
        );
      } else {
        dispatch(updateFilterData(omit(filterData, ["kids"])));
      }
    }, [get(bookingGuests, "kids")]);

    useEffect(() => {
      if (get(bookingGuests, "pets") > 0) {
        dispatch(
          updateFilterData({
            ...filterData,
            pets: get(bookingGuests, "pets")
          })
        );
      } else {
        dispatch(updateFilterData(omit(filterData, ["pets"])));
      }
    }, [get(bookingGuests, "pets")]);

    useEffect(() => {
      let guestsData = { ...bookingGuests };
      let dateData = { ...bookingDate };
      let destinationData = { ...bookingDestination };
      has(filterData, "adults")
        ? (guestsData["adults"] = get(filterData, "adults"))
        : (guestsData["adults"] = 1);
      has(filterData, "kids")
        ? (guestsData["kids"] = get(filterData, "kids"))
        : (guestsData["kids"] = 0);
      has(filterData, "pets")
        ? (guestsData["pets"] = get(filterData, "pets"))
        : (guestsData["pets"] = 0);
      dispatch(updateBookingGuests(guestsData));
      has(filterData, "check_in")
        ? (dateData["startDate"] = moment(get(filterData, "check_in")))
        : (dateData["startDate"] = null);
      has(filterData, "check_out")
        ? (dateData["endDate"] = moment(get(filterData, "check_out")))
        : (dateData["endDate"] = null);
      dispatch(updateBookingDate(dateData));
      if (has(filterData, "city_id") && has(filterData, "district_id")) {
        destinationData = getSelectedLocation(get(filterData, "district_id"));
      } else if (has(filterData, "city_id")) {
        destinationData = getSelectedLocation(get(filterData, "city_id"));
      } else {
        destinationData = null;
      }
      dispatch(updateBookingDestination(destinationData));
    }, []);

    return (
      <div data-tooltip-id="searchbar-tooltip" className={containerClass}>
        {
          <WrappedComponent
            {...props}
            drawerCloseRef={drawerCloseRef}
            isDrawerOpen={isDrawerOpen}
            activeSearchItem={activeSearchItem}
            skipButtonVisibility={skipButtonVisibility}
            setIsDrawerOpen={setIsDrawerOpen}
            handleOpenDrawer={handleOpenDrawer}
            setActiveSearchItem={setActiveSearchItem}
            handleFilterListings={handleFilterListings}
            setSkipButtonVisibility={setSkipButtonVisibility}
          />
        }
      </div>
    );
  };
};

export default withSearchBar;
