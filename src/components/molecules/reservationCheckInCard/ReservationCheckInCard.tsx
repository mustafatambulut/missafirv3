"use client";
import { useEffect, useState } from "react";
import moment from "moment";
import map from "lodash/map";
import get from "lodash/get";
import has from "lodash/has";
import set from "lodash/set";
import keys from "lodash/keys";
import pick from "lodash/pick";
import range from "lodash/range";
import split from "lodash/split";
import clone from "lodash/clone";
import isNull from "lodash/isNull";
import isEmpty from "lodash/isEmpty";
import toNumber from "lodash/toNumber";
import includes from "lodash/includes";
import capitalize from "lodash/capitalize";
import classNames from "classnames";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import { usePathname, useRouter } from "next/navigation";

import {
  setResPayload,
  setBookingDate,
  setIsLoadingDatePicker
} from "@/redux/features/listingDetailSlice/listingDetailSlice";
import {
  setDailyPrice,
  setReservation,
  setMinUnavailableDate,
  changeIsPressCheckAvailabilityButton
} from "@/redux/features/reservationSlice/reservationSlice";
import {
  getSlugOfUrl,
  checkSameItem,
  getScrollPosition,
  checkIsAuthenticated
} from "@/utils/helper";
import { SUCCESS } from "@/app/enum";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { basket, checkoutPreview, minimumNights } from "@/service/api";
import { updateBookingGuests } from "@/redux/features/listingSlice/listingSlice";
import { IReservationCheckInCard } from "@/components/molecules/reservationCheckInCard/types";

import Button from "@/components/atoms/button/Button";
import Select from "@/components/atoms/select/Select";
import Typography from "@/components/atoms/typography/Typography";
import DatePicker from "@/components/atoms/datePicker/DatePicker";
import ToastMessage from "@/components/atoms/toastMessage/ToastMessage";
import BookingDetail from "@/components/molecules/bookingDetail/BookingDetail";

import DownArrowIcon from "../../../../public/images/down_arrow.svg";

const ReservationCheckInCard = ({
  resData,
  searchParams,
  className = ""
}: IReservationCheckInCard) => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const slug = getSlugOfUrl(pathname);
  const [basketData, setBasketData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [minNights, setMinNights] = useState<number>(
    get(resData, "item.min_nights")
  );
  const { bookingDate, resPayload } = useAppSelector(
    (state) => state.listingDetailReducer
  );
  const { bookingGuests } = useAppSelector((state) => state.listingReducer);
  const { dailyPrice, minUnavailableDate } = useAppSelector(
    (state) => state.reservationReducer
  );

  const [activeEditItem, setActiveEditItem] = useState<string>("date");
  const [isScrollActive, setIsScrollActive] = useState<boolean>(false);
  const [selectedGuest, setSelectedGuest] = useState<number>(
    get(bookingGuests, "adults")
  );

  const guestOptions = map(
    range(
      1,
      get(resData, "item.occupancy") ? get(resData, "item.occupancy") + 1 : 10
    ),
    (item) => ({
      value: item,
      label: `${item}`
    })
  );

  const containerClass = classNames(
    `w-screen lg:w-96 h-fit bg-white lg:ml-10 2xl:ml-0 px-4 lg:px-5 py-2 lg:py-8 lg:relative lg:rounded-3xl border border-gray-100 shadow-lg shadow-black lg:shadow-gray-200 fixed bottom-0 left-0 z-30 lg:z-0 font-mi-sans-semi-bold ${className}`,
    {
      block: !isScrollActive,
      hidden: isScrollActive
    }
  );

  const reservBtnClass = classNames(
    `lg:flex text-xl font-mi-sans border-0 w-auto md:w-auto lg:w-full`,
    {
      "bg-gradient-to-tr from-[#E1004C] to-[#F8479E]": !isDisable
    }
  );

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    const requiredScrollPosition = isMobile ? 300 : 0;
    setIsScrollActive(scrollPosition > requiredScrollPosition);
  };

  const fetchBasket = async (payload) => {
    dispatch(setResPayload(payload));
    const res = await basket(payload);
    if (get(res, "data.code") === SUCCESS || get(res, "data.status")) {
      setBasketData(get(res, "data.data.item.reservation"));
      dispatch(setReservation(get(res, "data.data.item.reservation")));
      dispatch(
        setDailyPrice(
          get(res, "data.data.item.reservation.price.average_daily_price")
        )
      );
      dispatch(setIsLoadingDatePicker(false));
    }
  };

  const findClosestDateAfter = (targetDate, dateArray) => {
    const targetDateObj = moment(targetDate, "DD.MM.YYYY");
    let closestDate = null;

    for (const dateString of dateArray) {
      const currentDateObj = moment(dateString, "DD.MM.YYYY");
      if (currentDateObj > targetDateObj) {
        if (!closestDate || currentDateObj < closestDate) {
          closestDate = currentDateObj;
        }
      }
    }
    return closestDate ? closestDate.format("DD.MM.YYYY") : null;
  };

  const handleChangeDate = async (date) => {
    dispatch(setIsLoadingDatePicker(true));
    if (!!date?.startDate && !date?.endDate) {
      const closestDate = findClosestDateAfter(
        date?.startDate.format("DD.MM.YYYY"),
        unavailableDates
      );
      const res = await minimumNights({
        slug,
        checkIn: date?.startDate.format("YYYY-MM-DD")
      });
      get(res, "min_night") && setMinNights(get(res, "min_night"));
      dispatch(setMinUnavailableDate(closestDate));
      dispatch(setIsLoadingDatePicker(false));
    }

    if (date?.startDate && date?.endDate) {
      dispatch(changeIsPressCheckAvailabilityButton(true));
      const payload = {
        ...resPayload,
        slug: slug,
        check_in: get(date, "startDate")?.format("YYYY-MM-DD"),
        check_out: get(date, "endDate")?.format("YYYY-MM-DD"),
        adults: toNumber(get(bookingGuests, "adults")) || 1
      };

      await fetchBasket(payload);
    }
    dispatch(setBookingDate(date));
    dispatch(setIsLoadingDatePicker(false));
  };

  const handleApply = async () => {
    if (!checkIsAuthenticated()) return router.push("/login");

    if (
      !get(resData, "item.reservation.is_available") &&
      !isEmpty(searchParams)
    ) {
      return;
    }

    setIsLoading(true);
    dispatch(changeIsPressCheckAvailabilityButton(true));
    const payload = {
      ...resPayload,
      check_in: get(bookingDate, "startDate").format("YYYY-MM-DD"),
      check_out: get(bookingDate, "endDate").format("YYYY-MM-DD"),
      adults: toNumber(get(bookingGuests, "adults"))
    };

    const result = includes(split(pathname, "/"), "reservation")
      ? await checkoutPreview(payload)
      : await basket(payload);
    const { data } = result;
    setIsLoading(false);

    if (get(data, "data.item.reservation.is_available")) {
      dispatch(
        setDailyPrice(
          get(data, "data.item.reservation.price.average_daily_price")
        )
      );
      dispatch(setResPayload(payload));
      dispatch(setReservation(get(data, "data.item.reservation")));
      router.push("/reservation");
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

  const unavailableDates = map(get(resData, "item.unavailable_dates"), "date");

  const handleUnavailableDates = (day) => {
    return !isNull(minUnavailableDate)
      ? day.isSameOrAfter(moment(minUnavailableDate, "DD.MM.YYYY"))
      : includes(unavailableDates, day.format("DD.MM.YYYY"));
  };

  const handleSelectGuest = (value) => {
    dispatch(
      updateBookingGuests({
        adults: get(value, "value")
      })
    );
    setSelectedGuest(get(value, "value"));
  };

  useEffect(() => {
    dispatch(
      setDailyPrice(
        has(get(resData, "item.reservation.price"), "average_daily_price")
          ? get(resData, "item.reservation.price.average_daily_price")
          : get(resData, "item.reservation.price")
      )
    );
  }, [get(resData, "item.reservation.price")]);

  useEffect(() => {
    setIsDisable(
      isLoading ||
        isNull(get(bookingDate, "startDate")) ||
        isNull(get(bookingDate, "endDate"))
    );

    const dateQueries = keys(pick(searchParams, ["check_in", "check_out"]));

    if (
      checkSameItem(dateQueries, ["check_in", "check_out"]) ||
      (get(bookingDate, "startDate") && get(bookingDate, "endDate"))
    ) {
      setShowDetail(true);
    }
  }, [isLoading, get(bookingDate, "startDate"), get(bookingDate, "endDate")]);

  useEffect(() => {
    if (slug) {
      const cloned = clone(resPayload);
      set(cloned, "slug", slug);
      dispatch(setResPayload(cloned));
    }
    if (isMobile && typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(searchParams)) {
      const params = pick(searchParams, ["check_in", "check_out", "adults"]);
      if (get(params, "adults")) {
        setSelectedGuest(toNumber(get(params, "adults")));
        dispatch(
          updateBookingGuests({
            adults: toNumber(get(params, "adults"))
          })
        );
      }

      const payload = {
        ...resPayload,
        slug: slug,
        check_in: get(params, "check_in"),
        check_out: get(params, "check_out"),
        adults: toNumber(get(params, "adults")) || 1
      };
      fetchBasket(payload);
    }
  }, [searchParams]);

  return (
    <div className={containerClass}>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col flex-1 lg:w-full">
          <h2 className="text-2xl font-mi-sans font-normal text-gray-800 hidden lg:block">
            {get(resData, "item.reservation.is_available") && (
              <span className="text-gray-400 flex items-end gap-x-1">
                <span className="text-28 text-gray-800">{dailyPrice}</span>
                {get(basketData, "discount_percentage") && (
                  <Typography
                    variant="p3"
                    element="div"
                    className="rounded bg-green-50 text-green-600 p-1">
                    {get(basketData, "discount_percentage")}
                  </Typography>
                )}
                <span className="text-sm">/{t("nightly")}</span>
              </span>
            )}
          </h2>
        </div>
        <DatePicker
          isShimmer={!isMobile}
          showDateFormat="DD MMM YYYY"
          datePickerClass={isMobile || "listing-detail"}
          placeholder={t("any_week")}
          isInReservationInfo={true}
          showMinimumDateSelector={true}
          isOutsideRange={handleUnavailableDates}
          minimumNights={minNights}
          isShowLabel={false}
          date={bookingDate}
          numberOfMonths={isMobile ? 1 : 2}
          setDate={handleChangeDate}
          daySize={isMobile ? 42 : 50}
          withDatePreview={true}
          showCalendarIcon={false}
          customOpenHandler={() => setActiveEditItem("date")}
          customOpenStatement={activeEditItem}
          initialVisibleMonth={() => get(bookingDate, "startDate")}
        />
        <div className="border rounded-lg">
          <Select
            menuPosition="fixed"
            iconOffset={true}
            rotateIconOnShow={true}
            showPlaceholder={true}
            showControlTitle={true}
            name="reservation-guest"
            items={guestOptions}
            value={selectedGuest}
            placeHolder={t("guests")}
            optionClassName="my-1 p-0 m-0 rounded-lg text-gray-700 cursor-pointer focus:text-black hover:bg-gray-100 focus:bg-gray-hover"
            noResultsMessage={t("no_results")}
            className="cursor-pointer"
            controlWrapperClassName="py-3 px-4"
            singleValueClassName="text-gray-600"
            searchIconColor="fill-gray"
            isSearchable={false}
            isClearable={false}
            showSearchIcon={false}
            customIconPosition="right"
            customIconClassName="right-4"
            customIcon={<DownArrowIcon className="fill-gray-600 scale-125" />}
            onChange={handleSelectGuest}
          />
        </div>
        {showDetail && <BookingDetail basketData={basketData} />}
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl font-mi-sans font-normal text-gray-800 lg:hidden">
            {get(resData, "item.reservation.is_available") ||
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
            {capitalize(t("reserve"))}
            {isLoading && <span className="loading loading-spinner"></span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCheckInCard;
