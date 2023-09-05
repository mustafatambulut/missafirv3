/*eslint-disable*/
"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { capitalize, get } from "lodash";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/redux/hooks";

import { setAdults } from "@/redux/features/listingDetailSlice/listingDetailSlice";
import { IReservationCheckInCard } from "@/components/molecules/reservationCheckInCard/types";

import Button from "@/components/atoms/button/Button";
import SelectBox from "@/components/atoms/selectBox/SelectBox";
// import DatePicker from "@/components/atoms/datePicker/DatePicker";

const ReservationCheckInCard = ({
  reservation,
  className = ""
}: IReservationCheckInCard) => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const [guest, setGuest] = useState<number | string>(1);
  // const [bookingDate, setBookingDate] = useState<any>({
  //   startDate: null,
  //   endDate: null
  // });

  // const { adults, checkIn, checkOut, booking } = useAppSelector(
  //   (state) => state.listingDetailReducer
  // );

  const { bookingDate } = useAppSelector((state) => state.datePickerReducer);

  const options = [
    {
      name: "1",
      value: 1
    },
    {
      name: "2",
      value: 2
    },
    {
      name: "3",
      value: 3
    },
    {
      name: "4",
      value: 4
    },
    {
      name: "5",
      value: 5
    },
    {
      name: "6",
      value: 6
    },
    {
      name: "7",
      value: 7
    },
    {
      name: "8",
      value: 8
    },
    {
      name: "9",
      value: 9
    },
    {
      name: "10",
      value: 10
    }
  ];

  const containerClass = classNames(
    `w-full h-fit bg-white px-5 py-2 lg:py-8 lg:relative lg:rounded-3xl border border-gray-100 shadow-lg shadow-black lg:shadow-gray-200 fixed bottom-0 z-50 lg:z-0 font-mi-sans-semi-bold ${className}`,
    {}
  );

  // useEffect(() => {
  //   dispatch(
  //     updateBookingDate({
  //       // startDate: moment(get(bookingDate, "startDate")).toISOString(),
  //       startDate: get(bookingDate, "startDate"),
  //       endDate: get(bookingDate, "endDate")
  //       // endDate: moment(get(bookingDate, "endDate")).toISOString()
  //     })
  //   );
  // }, [bookingDate]);

  // useEffect(() => {
  //   dispatch(
  //     updateBookingDate({
  //       starDate: get(bookingDate, "startDate")
  //         ? moment(get(bookingDate, "startDate")).format("YYYY-MM-DD")
  //         : null,
  //       endDate: get(bookingDate, "endDate")
  //         ? moment(get(bookingDate, "endDate")).format("YYYY-MM-DD")
  //         : null
  //     })
  //   );
  // }, []);

  useEffect(() => {
    dispatch(setAdults(guest));
  }, [guest]);

  return (
    <div className={containerClass}>
      <div className="flex flex-col gap-y-6">
        <h2 className="text-2xl font-mi-sans font-normal text-gray-800">
          {get(reservation, "price")}
          <span className="text-sm text-gray-400">{` /${t("nightly")}`}</span>
        </h2>
        <div>
          <div>
            <label className="label text-lg tex-gray-500" htmlFor="date">
              Dates
            </label>
            <div name="date">
              {/*todo: datepicker sorunu çözülecek*/}
              {/*<DatePicker*/}
              {/*  isShowLabel={false}*/}
              {/*  className="border"*/}
              {/*  isOpenedStyle={false}*/}
              {/*  numberOfMonths={1}*/}
              {/*  // bookingDate={bookingDate}*/}
              {/*  // setBookingDate={setBookingDate}*/}
              {/*  setSkipButtonVisibility={true}*/}
              {/*/>*/}
            </div>
          </div>
          <div>
            <label className="label text-lg tex-gray-500" htmlFor="adults">
              Guests
            </label>
            <div name="adults">
              <SelectBox
                className="rounded-xl w-full h-10"
                id="adults"
                options={options}
                name="adults"
                onChange={({ target }) => setGuest(target.value)}
                value={guest}
              />
            </div>
          </div>
        </div>
        <div>
          <Button
            disabled={
              false
              // isEmpty(get(bookingDate, "startDate")) ||
              // isEmpty(get(bookingDate, "endDate"))
            }
            className="hidden lg:block text-xl font-mi-sans w-full border-0 enabled:bg-gradient-to-tr enabled:from-[#E1004C] to-[#F8479E]">
            {capitalize(t("reserve"))}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCheckInCard;
