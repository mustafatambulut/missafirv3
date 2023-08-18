import { get, isNull } from "lodash";
import {
  BOOKING_DATE,
  BOOKING_GUESTS,
  BOOKING_DESTINATION
} from "@/components/molecules/searchBar/constants";

const useMobileSearchBar = ({
  bookingDate,
  bookingGuests,
  drawerCloseRef,
  activeSearchItem,
  setBookingDate,
  setIsDrawerOpen,
  setBookingGuests,
  setActiveSearchItem
}) => {
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
        setBookingDate({
          startDate: null,
          endDate: null
        });
        break;
      case BOOKING_GUESTS:
        setBookingGuests({
          adults: 0,
          kids: 0,
          pets: false
        });
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
        return get(bookingGuests, "adults") === 0;
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
        handleDrawerClose();
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
