"use client";
import { useEffect, useRef, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import {
  BOOKING_DATE,
  BOOKING_DESTINATION,
  BOOKING_GUESTS
} from "@/components/molecules/searchBar/constants";
import {
  compact,
  difference,
  first,
  get,
  has,
  isEmpty,
  keys,
  map,
  omit
} from "lodash";
import {
  updateBookingDate,
  updateBookingDestination,
  updateBookingGuests,
  updateFilterData,
  updatePreFilterData
} from "@/redux/features/listingSlice/listingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import moment from "moment";

const withSearchBar = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const drawerCloseRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const {
      filterData,
      preFilterData,
      bookingDestination,
      bookingGuests,
      bookingDate
    } = useAppSelector((state) => state.listingReducer);
    const { locations } = useAppSelector((state) => state.landingReducer);
    const router = useRouter();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [activeSearchItem, setActiveSearchItem] = useState<string>("");
    const [skipButtonVisibility, setSkipButtonVisibility] =
      useState<boolean>(true);
    const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
    const preFilterKeys = [
      "adults",
      "kids",
      "pets",
      "check_in",
      "check_out",
      "district_id"
    ];

    const handleOpenDrawer = (searchItem) => {
      setIsDrawerOpen((v) => !v);
      setActiveSearchItem(searchItem);
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

    const handleFilterListings = () => {
      setIsTooltipOpen(false);
      if (isEmpty(preFilterData)) return setIsTooltipOpen(true);

      const isInCustomSection = get(props, "isInCustomSection", false);
      if (isEmpty(preFilterData)) {
        dispatch(updateFilterData(omit(filterData, preFilterKeys)));
      } else {
        const currentPreFilterKeys = keys(preFilterData);
        const filterDifference = difference(
          preFilterKeys,
          currentPreFilterKeys
        );
        dispatch(
          updateFilterData(
            omit({ ...filterData, ...preFilterData }, filterDifference)
          )
        );
      }
      !isInCustomSection && router.push("/listing");
    };

    useEffect(() => {
      if (bookingDestination) {
        dispatch(
          updatePreFilterData({
            ...preFilterData,
            district_id: bookingDestination.value
          })
        );
      } else {
        dispatch(updatePreFilterData(omit(preFilterData, "district_id")));
      }
    }, [bookingDestination]);

    useEffect(() => {
      if (bookingDate.startDate) {
        dispatch(
          updatePreFilterData({
            ...preFilterData,
            check_in: bookingDate.startDate.format("YYYY-MM-DD")
          })
        );
      } else {
        dispatch(updatePreFilterData(omit(preFilterData, "check_in")));
      }
    }, [bookingDate.startDate]);

    useEffect(() => {
      if (bookingDate.endDate) {
        dispatch(
          updatePreFilterData({
            ...preFilterData,
            check_out: bookingDate.endDate.format("YYYY-MM-DD")
          })
        );
      } else {
        dispatch(updatePreFilterData(omit(preFilterData, "check_out")));
      }
    }, [bookingDate.endDate]);

    useEffect(() => {
      if (bookingGuests.adults > 0) {
        dispatch(
          updatePreFilterData({
            ...preFilterData,
            adults: bookingGuests.adults
          })
        );
      } else {
        dispatch(updatePreFilterData(omit(preFilterData, ["adults"])));
      }
    }, [bookingGuests.adults]);

    useEffect(() => {
      if (bookingGuests.kids > 0) {
        dispatch(
          updatePreFilterData({
            ...preFilterData,
            kids: bookingGuests.kids
          })
        );
      } else {
        dispatch(updatePreFilterData(omit(preFilterData, ["kids"])));
      }
    }, [bookingGuests.kids]);

    useEffect(() => {
      if (bookingGuests.pets > 0) {
        dispatch(
          updatePreFilterData({
            ...preFilterData,
            pets: bookingGuests.pets
          })
        );
      } else {
        dispatch(updatePreFilterData(omit(preFilterData, ["pets"])));
      }
    }, [bookingGuests.pets]);

    const getSelectedLocation = (districtId) => {
      return first(
        compact(
          map(keys(locations), (location) => {
            if (location === districtId) {
              return {
                value: location,
                label: locations[location].district,
                isPopularDestinations: false,
                desc: `${locations[location].city} / ${locations[location].country}`,
                isHistory: false
              };
            }
          })
        )
      );
    };

    useEffect(() => {
      let guestsData = { ...bookingGuests };
      let dateData = { ...bookingDate };
      let destinationData = bookingDestination;
      has(filterData, "adults")
        ? (guestsData["adults"] = filterData.adults)
        : (guestsData["adults"] = 0);
      has(filterData, "kids")
        ? (guestsData["kids"] = filterData.kids)
        : (guestsData["kids"] = 0);
      has(filterData, "pets")
        ? (guestsData["pets"] = filterData.pets)
        : (guestsData["pets"] = 0);
      dispatch(updateBookingGuests(guestsData));
      has(filterData, "check_in")
        ? (dateData["startDate"] = moment(filterData.check_in))
        : (dateData["startDate"] = null);
      has(filterData, "check_out")
        ? (dateData["endDate"] = moment(filterData.check_out))
        : (dateData["endDate"] = null);
      dispatch(updateBookingDate(dateData));
      has(filterData, "district_id")
        ? (destinationData = getSelectedLocation(filterData.district_id))
        : (destinationData = null);
      dispatch(updateBookingDestination(destinationData));
      dispatch(
        updatePreFilterData(
          omit(filterData, [...keys(omit(filterData, preFilterKeys))])
        )
      );
    }, [filterData]);

    return (
      <>
        <ReactTooltip
          isOpen={isTooltipOpen}
          id="searchbar-tooltip"
          place="bottom"
          content="En az bir alan doldurmak zorunludur"
          closeOnEsc={true}
          className="bg-white opacity-100 font-mi-sans-semi-bold text-gray-600 z-20 shadow"
        />

        <div
          data-tooltip-id="searchbar-tooltip"
          className={`flex rounded-2xl lg:bg-white w-full items-center lg:p-2 ${
            get(props, "isInCustomSection")
              ? "shadow-bold-blur-20 flex-row"
              : "flex-col lg:flex-row"
          }`}>
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
      </>
    );
  };
};

export default withSearchBar;
