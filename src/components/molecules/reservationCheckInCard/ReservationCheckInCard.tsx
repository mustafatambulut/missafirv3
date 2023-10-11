"use client";
import { useEffect, useState } from "react";
import {
  map,
  get,
  has,
  split,
  isNull,
  isEmpty,
  toNumber,
  includes,
  capitalize
} from "lodash";
import classNames from "classnames";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import { usePathname, useRouter } from "next/navigation";

import {
  setResPayload,
  setBookingDate,
  setIsBookingInfoEditing
} from "@/redux/features/listingDetailSlice/listingDetailSlice";
import {
  changeIsPressCheckAvailabilityButton,
  setDailyPrice,
  setReservation
} from "@/redux/features/reservationSlice/reservationSlice";
import { checkAuth } from "@/utils/helper";
import { basket, checkoutPreview } from "@/service/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IReservationCheckInCard } from "@/components/molecules/reservationCheckInCard/types";

import Button from "@/components/atoms/button/Button";
import Guests from "@/components/atoms/guests/Guests";
import DatePicker from "@/components/atoms/datePicker/DatePicker";
import ToastMessage from "@/components/atoms/toastMessage/ToastMessage";

const ReservationCheckInCard = ({
  resData,
  searchParams,
  className = ""
}: IReservationCheckInCard) => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const { bookingDate, resPayload } = useAppSelector(
    (state) => state.listingDetailReducer
  );
  const { bookingGuests } = useAppSelector((state) => state.listingReducer);
  const { dailyPrice } = useAppSelector((state) => state.reservationReducer);

  const [activeEditItem, setActiveEditItem] = useState<string>("date");
  const { reservation } = get(resData, "item");

  const containerClass = classNames(
    `w-screen lg:w-full h-fit bg-white px-4 lg:px-5 py-2 lg:py-8 lg:relative lg:rounded-3xl border border-gray-100 shadow-lg shadow-black lg:shadow-gray-200 fixed bottom-0 left-0 z-30 lg:z-0 font-mi-sans-semi-bold ${className}`,
    {}
  );

  const reservBtnClass = classNames(`lg:flex text-xl font-mi-sans border-0`, {
    "bg-gradient-to-tr from-[#E1004C] to-[#F8479E]": !isDisable,
    "w-full": !isMobile,
    "w-auto": isMobile
  });

  const handleChangeDate = (date) => dispatch(setBookingDate(date));

  const handleApply = async () => {
    if (
      !get(resData, "item.reservation.is_available") &&
      !isEmpty(searchParams)
    ) {
      return;
    }

    setIsLoading(true);
    dispatch(changeIsPressCheckAvailabilityButton(true));
    if (!checkAuth()) return router.push("/login");

    const payload = {
      ...resPayload,
      check_in: get(bookingDate, "startDate").format("YYYY-MM-DD"),
      check_out: get(bookingDate, "endDate").format("YYYY-MM-DD"),
      adults: toNumber(get(bookingGuests, "adults")),
      kids: toNumber(get(bookingGuests, "kids")),
      pets: toNumber(get(bookingGuests, "pets"))
    };

    const result = includes(split(pathname, "/"), "reservation")
      ? await checkoutPreview(payload)
      : await basket(payload);
    const { data } = result;

    (!!get(data, "code") || !data) && setIsLoading(false);
    if (get(data, "data.item.reservation.is_available")) {
      dispatch(
        setDailyPrice(
          get(data, "data.item.reservation.price.average_daily_price")
        )
      );
      dispatch(setResPayload(payload));
      dispatch(setIsBookingInfoEditing(false));
      dispatch(setReservation(get(data, "data.item.reservation")));
    } else {
      toast.custom((item) => (
        <ToastMessage
          toast={toast}
          item={item}
          title={t("toast_error")}
          status="warning">
          <p className="text-xl text-black">{t("no_availability")}</p>
        </ToastMessage>
      ));
    }
  };

  useEffect(() => {
    dispatch(
      setDailyPrice(
        has(get(reservation, "price"), "average_daily_price")
          ? get(reservation, "price.average_daily_price")
          : get(reservation, "price")
      )
    );
  }, [get(reservation, "price")]);

  const unavailableDates = map(get(resData, "item.unavailable_dates"), "date");

  const handleUnavailableDates = (day) => {
    return includes(unavailableDates, day.format("DD.MM.YYYY"));
  };

  useEffect(() => {
    setIsDisable(
      isLoading ||
      isNull(get(bookingDate, "startDate")) ||
      isNull(get(bookingDate, "endDate"))
    );
  }, [isLoading, get(bookingDate, "startDate"), get(bookingDate, "endDate")]);

  return (
    <div className={containerClass}>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col flex-1 lg:w-full">
          <h2 className="text-2xl font-mi-sans font-normal text-gray-800 hidden lg:block">
            {get(reservation, "is_available") ||
              (isEmpty(searchParams) && (
                <span className="text-gray-400 flex items-end gap-x-1">
                  <span className="text-28 text-gray-800">{dailyPrice}</span>
                  <span className="text-sm">/{t("nightly")}</span>
                </span>
              ))}
          </h2>
          <div>
            <label className="label text-lg text-gray-500">{t("dates")}</label>
            <div>
              <DatePicker
                isOutsideRange={handleUnavailableDates}
                minimumNights={get(resData, "item.min_nights")}
                isShowLabel={false}
                numberOfMonths={1}
                date={bookingDate}
                setDate={handleChangeDate}
                daySize={isMobile ? 44 : 50}
                withDatePreview={true}
                showCalendarIcon={false}
                customOpenHandler={() => setActiveEditItem("date")}
                customOpenStatement={activeEditItem}
              />
            </div>
          </div>
          <div>
            <label className="label text-lg text-gray-500" htmlFor="adults">
              {t("guests")}
            </label>
            <Guests
              isInListingDetail={true}
              showIcon={false}
              placeholder=""
              customOpenHandler={() => setActiveEditItem("guests")}
              customOpenStatement={activeEditItem}
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center  ">
          <h2 className="text-2xl font-mi-sans font-normal text-gray-800 lg:hidden">
            {get(reservation, "is_available") ||
              (isEmpty(searchParams) && (
                <span className="text-gray-400 flex items-end gap-x-1">
                  <span className="text-28 text-gray-800">{dailyPrice}</span>
                  <span className="text-sm">/{t("nightly")}</span>
                </span>
              ))}
          </h2>
          <Button
            onClick={handleApply}
            disabled={isDisable}
            className={reservBtnClass}>
            {get(reservation, "is_available")
              ? capitalize(t("reserve"))
              : "Check Availability"}
            {isLoading && <span className="loading loading-spinner"></span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCheckInCard;
