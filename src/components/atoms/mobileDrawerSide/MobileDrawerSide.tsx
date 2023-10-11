import { includes } from "lodash";
import classNames from "classnames";

import {
  BOOKING_DATE,
  BOOKING_GUESTS,
  BOOKING_DESTINATION
} from "@/components/molecules/searchBar/constants";
import { IProps } from "@/components/molecules/searchBar/types";
import { useTranslations } from "next-intl";

import Guests from "@/components/atoms/guests/Guests";
import Button from "@/components/atoms/button/Button";
import DatePicker from "@/components/atoms/datePicker/DatePicker";
import DestinationSelect from "@/components/atoms/destinationSelect/DestinationSelect";
import useMobileSearchBar from "@/components/molecules/mobileSearchBar/useMobileSearchBar";

import ChevronLeft from "../../../../public/images/chevron_left.svg";
import { useAppSelector } from "@/redux/hooks";
import { useRef } from "react";
import Typography from "../typography/Typography";

const MobileDrawerSide = (props: IProps) => {
  const t = useTranslations();
  const {
    handleApplyClick,
    handleClearClick,
    handleClickSkipButton,
    handleClickBackButton,
    clearButtonVisibilityStatus
  } = useMobileSearchBar(props);
  const { activeSearchItem, setActiveSearchItem, bookingDate, setBookingDate } =
    props;
  const { searchClicked } = useAppSelector((state) => state.listingReducer);
  const datePickerRef = useRef();
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

  const onClickClearButton = () => {
    handleClearClick();
    activeSearchItem === BOOKING_DATE &&
      datePickerRef.current?.handleClearDate();
  };

  return (
    <div className="drawer-side">
      <label htmlFor="msfr-search-drawer" className="drawer-overlay"></label>
      <div className="p-3 w-full h-screen bg-white flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center p-2 mb-3">
          <div onClick={handleClickBackButton}>
            <ChevronLeft className="fill-gray-500 scale-75" />
          </div>
          <Typography variant="p2" element="div" className="text-primary mr-2" onClick={handleClickSkipButton}>
            {t("skip")}
          </Typography>
        </div>
        <div className={showComponentByActivate(BOOKING_DESTINATION)}>
          <DestinationSelect
            setActiveSearchItem={setActiveSearchItem}
            componentId="mobile-destination"
          />
        </div>
        <div className={showComponentByActivate(BOOKING_DATE)}>
          <DatePicker
            ref={datePickerRef}
            daySize={58}
            isOpened={true}
            numberOfMonths={12}
            date={bookingDate}
            setDate={setBookingDate}
            orientation="verticalScrollable"
            montHeaderPosition="start"
            showSelector={false}
            handleClearClick={handleClearClick}
          />
        </div>
        <div className={showComponentByActivate(BOOKING_GUESTS)}>
          <Guests isInMobileDrawer={true} />
        </div>
      </div>
      {hasSearchItemByActivate && (
        <section className="flex justify-end p-2 bg-white fixed lef-0 bottom-0 w-full">
          {clearButtonVisibilityStatus() ? (
            <Button
              onClick={onClickClearButton}
              variant="btn-link"
              className="text-primary bg-transparent shadow-none border-none">
              {t("clear")}
            </Button>
          ) : null}
          <Button
            onClick={handleApplyClick}
            className="ml-2 hover:bg-primary-600"
            variant="btn-primary">
            {searchClicked ? (
              <span className="loading loading-spinner"></span>
            ) : (
              t("apply")
            )}
          </Button>
        </section>
      )}
    </div>
  );
};

export default MobileDrawerSide;
