"use client";
import { useEffect, useState } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import moment from "moment/moment";
import { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import {
  setResPayload,
  setBookingDate,
  setAvailabilityModalOpen
} from "@/redux/features/listingDetailSlice/listingDetailSlice";
import { getSlugOfUrl } from "@/utils/helper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IListingReservationSummary } from "@/components/molecules/listingReservationSummary/types";

import Modal from "@/components/atoms/modal/Modal";
import Button from "@/components/atoms/button/Button";
import Typography from "@/components/atoms/typography/Typography";
import ReservationCheckInCard from "@/components/molecules/reservationCheckInCard/ReservationCheckInCard";

import LoadingIcon from "../../../../public/images/loading.svg";

const ListingReservationSummary = ({
  hasQuery,
  resData,
  searchParams
}: IListingReservationSummary) => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { resPayload, availabilityModalOpen } = useAppSelector(
    (state) => state.listingDetailReducer
  );

  const handleBackToSearch = () => {
    setIsLoading(true);
    router.push("/list");
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
          slug: getSlugOfUrl(pathname) || "",
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

  return (
    <>
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
              {t(
                "sorry_this_house_is_no_longer_available_for_the_dates_you_selected"
              )}
            </Typography>
          </div>
          <Button disabled={isLoading} onClick={handleBackToSearch}>
            {t("back_to_search")}
            {isLoading && <span className="loading loading-spinner"></span>}
          </Button>
        </div>
      </Modal>
      <ReservationCheckInCard searchParams={searchParams} resData={resData} />
    </>
  );
};

export default ListingReservationSummary;
