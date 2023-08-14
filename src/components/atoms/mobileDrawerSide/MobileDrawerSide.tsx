import { includes } from "lodash";
import classNames from "classnames";

import {
  BOOKING_DATE,
  BOOKING_GUESTS,
  BOOKING_DESTINATION
} from "@/components/molecules/searchBar/constants";
import { IProps } from "@/components/molecules/searchBar/types";

import Guests from "@/components/atoms/guests/Guests";
import Button from "@/components/atoms/button/Button";
import DatePicker from "@/components/atoms/datePicker/DatePicker";
import DestinationSelect from "@/components/atoms/destinationSelect/DestinationSelect";
import useMobileSearchBar from "@/components/molecules/mobileSearchBar/useMobileSearchBar";

import ArrowLeftIcon from "../../../../public/images/arrow-left.svg";

const MobileDrawerSide = (props: IProps) => {
  const {
    handleApplyClick,
    handleClearClick,
    handleClickSkipButton,
    handleClickBackButton,
    applyButtonDisabledStatus,
    clearButtonVisibilityStatus
  } = useMobileSearchBar(props);

  const {
    bookingDate,
    bookingGuests,
    activeSearchItem,
    skipButtonVisibility,
    setBookingDate,
    setBookingGuests,
    setBookingDestination,
    setSkipButtonVisibility,
    handleOpenDrawer
  } = props;

  const showComponentByActivate = (item: string) => {
    return classNames("", {
      "block h-full": activeSearchItem === item,
      hidden: activeSearchItem !== item
    });
  };

  const hasSearchItemByActivate = includes(
    [BOOKING_GUESTS, BOOKING_DATE],
    activeSearchItem
  );

  return (
    <div className="drawer-side">
      <label htmlFor="msfr-search-drawer" className="drawer-overlay"></label>
      <div className="p-3 w-full min-h-full bg-white flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center p-2 mb-3">
          <div onClick={handleClickBackButton}>
            <ArrowLeftIcon />
          </div>
          {skipButtonVisibility && (
            <div className="text-primary mr-2" onClick={handleClickSkipButton}>
              Skip
            </div>
          )}
        </div>
        <div className={showComponentByActivate(BOOKING_DESTINATION)}>
          <DestinationSelect
            setActiveSearchItem={handleOpenDrawer}
            componentId="mobile-destination"
            setSkipButtonVisibility={setSkipButtonVisibility}
            setBookingDestination={setBookingDestination}
          />
        </div>
        <div className={showComponentByActivate(BOOKING_DATE)}>
          <DatePicker
            bookingDate={bookingDate}
            setBookingDate={setBookingDate}
            setSkipButtonVisibility={setSkipButtonVisibility}
          />
        </div>
        <div className={showComponentByActivate(BOOKING_GUESTS)}>
          <Guests
            data={bookingGuests}
            setBookingGuests={setBookingGuests}
            setSkipButtonVisibility={setSkipButtonVisibility}
          />
        </div>
      </div>
      {hasSearchItemByActivate && (
        <section className="flex justify-end p-2 bg-white fixed lef-0 bottom-0 w-full">
          {clearButtonVisibilityStatus() && (
            <Button
              onClick={handleClearClick}
              variant="btn-link"
              className="text-primary bg-transparent shadow-none border-none">
              Clear
            </Button>
          )}
          <Button
            onClick={handleApplyClick}
            disabled={applyButtonDisabledStatus()}
            className="ml-2"
            variant="btn-primary">
            Apply
          </Button>
        </section>
      )}
    </div>
  );
};

export default MobileDrawerSide;
