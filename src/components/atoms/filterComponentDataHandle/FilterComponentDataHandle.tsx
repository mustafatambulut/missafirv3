"use client";
import { isMobile } from "react-device-detect";
import MobileSearchBar from "@/components/molecules/mobileSearchBar/MobileSearchBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateBookingDate } from "@/redux/features/listingSlice/listingSlice";

const FilterComponentDataHandle = () => {
  const dispatch = useAppDispatch();
  const { showSearchbar, bookingDate } = useAppSelector(
    (state) => state.listingReducer
  );
  const handleChangeBookingDate = (date) => {
    dispatch(updateBookingDate(date));
  };

  return showSearchbar && isMobile ? (
    <div className="px-3 lg:px-0 my-2">
      <MobileSearchBar
        bookingDate={bookingDate}
        setBookingDate={handleChangeBookingDate}
        isInCustomSection={true}
      />
    </div>
  ) : null;
};

export default FilterComponentDataHandle;
