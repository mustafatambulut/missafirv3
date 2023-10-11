"use client";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { get, isEmpty } from "lodash";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  setResPayload,
  setBookingDate,
  setIsBookingInfoEditing,
  setAvailabilityModalOpen
} from "@/redux/features/listingDetailSlice/listingDetailSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IListingReservationSummary } from "@/components/molecules/listingReservationSummary/types";

import Modal from "@/components/atoms/modal/Modal";
import Button from "@/components/atoms/button/Button";
import Typography from "@/components/atoms/typography/Typography";
import ReservationSummary from "@/components/atoms/reservationSummary/ReservationSummary";
import ReservationCheckInCard from "@/components/molecules/reservationCheckInCard/ReservationCheckInCard";

import LoadingIcon from "../../../../public/images/loading.svg";
import { useTranslations } from "next-intl";

const ListingReservationSummary = ({
  slug,
  hasQuery,
  resData,
  searchParams
}: IListingReservationSummary) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations()
  const { resPayload, availabilityModalOpen, isBookingInfoEditing } =
    useAppSelector((state) => state.listingDetailReducer);

  const handleBackToSearch = () => {
    setIsLoading(true);
    router.push("/listing");
  };

  useEffect(() => {
    if (
      !get(resData, "item.reservation.is_available") &&
      !isEmpty(searchParams)
    ) {
      dispatch(setAvailabilityModalOpen(true));
    }
    if (hasQuery) {
      dispatch(
        setResPayload({
          ...resPayload,
          slug: slug || "",
          check_in: get(searchParams, "check_in"),
          check_out: get(searchParams, "check_out")
        })
      );
      dispatch(
        setBookingDate({
          startDate: moment(get(searchParams, "check_in")),
          endDate: moment(get(searchParams, "check_out"))
        })
      );
    }
  }, [hasQuery]);

  useEffect(() => {
    if (!hasQuery) dispatch(setIsBookingInfoEditing(true));
  }, []);

  return (
    <div>
      <Toaster duration={4000} position="top-right" reverseOrder={false} />
      <Modal
        isDisableClose={true}
        isOpen={availabilityModalOpen}
        headerClass="text-2xl"
        bodyClass="lg:w-11/12 lg:max-w-5xl">
        <div className="flex flex-col items-center gap-y-9">
          <LoadingIcon />
          <div className="flex flex-col items-center gap-y-3">
            <Typography variant="h4" element="h4" className="text-gray-700">
              {t("oops_something_went_wrong")}
            </Typography>
            <Typography variant="p3" element="p" className="text-gray-600 ">
              {t("sorry_this_house_is_no_longer_available_for_the_dates_you_selected")}
            </Typography>
          </div>
          <Button disabled={isLoading} onClick={handleBackToSearch}>
            {t("back_to_search")}
            {isLoading && <span className="loading loading-spinner"></span>}
          </Button>
        </div>
      </Modal>

      {isBookingInfoEditing ? (
        <ReservationCheckInCard searchParams={searchParams} resData={resData} />
      ) : (
        <ReservationSummary
          slug={slug}
          hideCouponCode={false}
          isDateSummary={true}
          resData={resData}
        />
      )}
    </div>
  );
};

export default ListingReservationSummary;
