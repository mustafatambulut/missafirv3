import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Reservation,
  IReservationState
} from "@/redux/features/reservationSlice/types";
import { STEP_1 } from "@/redux/features/reservationSlice/enum";
import { IDataHandle } from "@/components/atoms/dataHandle/types";
import { STATUS_CONFIRMATION } from "@/app/[lang]/reservation/constants";

const initialState = {
  total: 0,
  guests: 1,
  detail: null,
  dailyPrice: 0,
  couponCode: null,
  reservation: null,
  currentStep: STEP_1,
  isShowCouponCode: false,
  isApplyCouponCode: false,
  minUnavailableDate: null,
  isPressReservButton: false,
  status: STATUS_CONFIRMATION,
  isPressCheckAvailabilityButton: false
} as IReservationState;

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
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
    changeIsPressReservButton: (
      state: { isPressReservButton: boolean },
      action: PayloadAction<string>
    ) => {
      state.isPressReservButton = action.payload;
    },
    changeIsPressCheckAvailabilityButton: (
      state: { isPressCheckAvailabilityButton: boolean },
      action: PayloadAction<string>
    ) => {
      state.isPressCheckAvailabilityButton = action.payload;
    },
    setReservation: (
      state: { reservation: Reservation },
      action: PayloadAction<string>
    ) => {
      state.reservation = action.payload;
    },
    setDetail: (
      state: { detail: IDataHandle },
      action: PayloadAction<string>
    ) => {
      state.detail = action.payload;
    },
    setDailyPrice: (
      state: { dailyPrice: IDataHandle },
      action: PayloadAction<string>
    ) => {
      state.dailyPrice = action.payload;
    },
    setMinUnavailableDate: (
      state: { minUnavailableDate: IDataHandle },
      action: PayloadAction<string>
    ) => {
      state.minUnavailableDate = action.payload;
    }
  }
});

export const {
  setDetail,
  changeTotal,
  setDailyPrice,
  setReservation,
  changeCouponCode,
  changeCurrentStep,
  changeIsApplyCoupon,
  setMinUnavailableDate,
  changeIsShowCouponCode,
  changeIsPressReservButton,
  changeIsPressCheckAvailabilityButton
} = reservationSlice.actions;

export default reservationSlice.reducer;
