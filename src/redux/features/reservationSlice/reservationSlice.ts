import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { STEP_1 } from "@/redux/features/reservationSlice/enum";
import { STATUS_CONFIRMATION } from "@/app/[lang]/reservation/constants";
import {
  Reservation,
  IReservationState
} from "@/redux/features/reservationSlice/types";

// todo: api entegrasyonu sonrası güncellenecek
const initialState = {
  entities: {
    title: "Stylish Apartment Near Popular Touristic Spots",
    location: "Antalya, Turkey",
    images: ["/images/image1.jpeg", "/images/image2.jpeg"],
    details: [
      {
        keyInfo: {
          checkIn: "16:00",
          checkInOut: "16:00",
          info: ["Self check-in with keybox", "Cancellation Policy"]
        }
      },
      {
        homeRules: [
          {
            text: "children_welcome_1_12_years",
            img: "/images/approval.svg"
          },
          {
            text: "infants_welcome_under_12_months",
            img: "/images/approval.svg"
          },
          {
            text: "no_parties_or_events",
            img: "/images/delete.svg"
          },
          {
            text: "no_smoking",
            img: "/images/delete.svg"
          }
        ]
      },
      {
        properties: ["2 bedroom", "1 bathroom", "120 m²"]
      }
    ]
  },
  reservation: {
    is_available: false,
    price: {
      final: "",
      listing: "",
      average_daily_price: "",
      discount_percentage: "",
      total_discount_price: "",
      cleaning_fee: "",
      total_nights: 0,
      sub_total: "",
      original_average_daily_price: "",
      breakdown: [
        {
          label: "",
          value: "",
          extra: ""
        }
      ]
    },
    is_available_reason: null
  },
  payment: {
    nightlyRate: 2000,
    reservationDay: 11,
    discountPercent: 25,
    couponCodePercent: 10,
    extras: {
      label: "cleaning Fee",
      total: 400
    }
  },
  total: 0,
  couponCode: null,
  isShowCouponCode: false,
  isApplyCouponCode: false,
  currentStep: STEP_1,
  guests: 1,
  status: STATUS_CONFIRMATION,
  isPressReservButton: false
} as IReservationState;

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    changeStatus: (
      state: { status: string },
      action: PayloadAction<string>
    ) => {
      state.status = action.payload;
    },
    changeCurrentStep: (
      state: { currentStep?: number },
      action: PayloadAction<string>
    ) => {
      state.currentStep = action.payload;
    },
    changeTotal: (state: { total?: number }, action: PayloadAction<string>) => {
      state.total = action.payload;
    },
    changeCouponCode: (
      state: { couponCode?: null },
      action: PayloadAction<string>
    ) => {
      state.couponCode = action.payload;
    },
    changeIsApplyCoupon: (
      state: { isApplyCouponCode?: boolean },
      action: PayloadAction<string>
    ) => {
      state.isApplyCouponCode = action.payload;
    },
    changeIsShowCouponCode: (
      state: { isShowCouponCode?: boolean },
      action: PayloadAction<string>
    ) => {
      state.isShowCouponCode = action.payload;
    },
    changeReservationDay: (
      state: { reservationDay: number },
      action: PayloadAction<string>
    ) => {
      state.reservationDay = action.payload;
    },
    changeGuests: (
      state: { guests: number },
      action: PayloadAction<string>
    ) => {
      state.guests = action.payload;
    },
    changeIsPressReservButton: (
      state: { isPressReservButton: boolean },
      action: PayloadAction<string>
    ) => {
      state.isPressReservButton = action.payload;
    },
    setReservation: (
      state: { reservation: Reservation },
      action: PayloadAction<string>
    ) => {
      state.reservation = action.payload;
    }
  }
});

export const {
  changeStatus,
  changeTotal,
  changeGuests,
  setReservation,
  changeCouponCode,
  changeCurrentStep,
  changeIsApplyCoupon,
  changeReservationDay,
  changeIsShowCouponCode,
  changeIsPressReservButton
} = reservationSlice.actions;

export default reservationSlice.reducer;
