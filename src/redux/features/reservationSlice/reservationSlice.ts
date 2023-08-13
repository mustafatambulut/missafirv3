import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { STATUS_CONFIRMATION } from "@/app/[lang]/reservation/constants";
import { IReservationState } from "@/redux/features/reservationSlice/types";

// todo: api entegrasyonu sonrası güncellenecek
const initialState = {
  entities: {
    title: "Stylish Apartment Near Popular Touristic Spots",
    location: "Antalya, Turkey",
    images: [
      "../../../../public/images/temp/image-1.jpeg",
      "../../../../public/images/temp/image-2.jpeg"
    ],
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
          "Children welcome (1-12 years)",
          "Infants welcome (under 12 months)",
          "No parties or events",
          "No smoking"
        ]
      }
    ]
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
  currentStep: 1,
  status: STATUS_CONFIRMATION
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
    }
  }
});

export const {
  changeStatus,
  changeTotal,
  changeCouponCode,
  changeCurrentStep,
  changeIsApplyCoupon,
  changeIsShowCouponCode
} = reservationSlice.actions;

export default reservationSlice.reducer;
