import { get, isNull } from "lodash";
import {
  BOOKING_DATE,
  BOOKING_GUESTS,
  BOOKING_DESTINATION
} from "@/components/molecules/searchBar/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateBookingDate,
  updateBookingGuests
} from "@/redux/features/listingSlice/listingSlice";

const useMobileSearchBar = ({
  drawerCloseRef,
  activeSearchItem,
  setIsDrawerOpen,
  setActiveSearchItem,
  handleFilterListings,
  isInCustomSection
}) => {
  const dispatch = useAppDispatch();
  const { bookingGuests, bookingDate } = useAppSelector(
    (state) => state.listingReducer
  );
  const handleDrawerClose = () => {
    if (get(drawerCloseRef, "current")) {
      drawerCloseRef.current.click();
      setIsDrawerOpen(false);
    }
  };

  const handleClickBackButton = () => {
    switch (activeSearchItem) {
      case BOOKING_DESTINATION:
        handleDrawerClose();
        break;
      case BOOKING_DATE:
        setActiveSearchItem(BOOKING_DESTINATION);
        break;
      case BOOKING_GUESTS:
        setActiveSearchItem(BOOKING_DATE);
        break;
      default:
        break;
    }
  };

  const handleClickSkipButton = () => {
    switch (activeSearchItem) {
      case BOOKING_DESTINATION:
        setActiveSearchItem(BOOKING_DATE);
        break;
      case BOOKING_DATE:
        setActiveSearchItem(BOOKING_GUESTS);
        break;
      case BOOKING_GUESTS:
        handleDrawerClose();
        break;
      default:
        break;
    }
  };

  const handleClearClick = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        dispatch(
          updateBookingDate({
            startDate: null,
            endDate: null
          })
        );
        break;
      case BOOKING_GUESTS:
        dispatch(
          updateBookingGuests({
            adults: 0,
            kids: 0,
            pets: 0
          })
        );
        break;
      default:
        break;
    }
  };

  const applyButtonDisabledStatus = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        return (
          get(bookingDate, "startDate") == null ||
          get(bookingDate, "endDate") == null
        );
      case BOOKING_GUESTS:
        return isInCustomSection ? false : get(bookingGuests, "adults") === 0;
      default:
        return false;
    }
  };

  const clearButtonVisibilityStatus = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        return (
          !isNull(get(bookingDate, "startDate")) &&
          !isNull(get(bookingDate, "endDate"))
        );
      case BOOKING_GUESTS:
        return (
          get(bookingGuests, "adults") > 0 ||
          get(bookingGuests, "kids") > 0 ||
          get(bookingGuests, "pets")
        );
      default:
        return false;
    }
  };
  const handleApplyClick = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        setActiveSearchItem(BOOKING_GUESTS);
        break;
      case BOOKING_GUESTS:
        if (isInCustomSection) {
          handleFilterListings();
          handleDrawerClose();
        } else {
          handleDrawerClose();
        }
        break;
      default:
        break;
    }
  };

  return {
    handleApplyClick,
    handleClearClick,
    handleClickSkipButton,
    handleClickBackButton,
    applyButtonDisabledStatus,
    clearButtonVisibilityStatus
  };
};

export default useMobileSearchBar;
