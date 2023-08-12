import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { STATUS_CONFIRMATION } from "@/app/[lang]/reservation/constants";
import { IReservationState } from "@/redux/features/reservationSlice/types";

const initialState = {
  entities: {
    currentStep: 1,
    reservationStatus: STATUS_CONFIRMATION,
    title: "Stylish Apartment Near Popular Touristic Spots",
    location: "Antalya, Turkey",
    images: [
      "../../../../public/images/temp/image-1.jpeg",
      "../../../../public/images/temp/image-2.jpeg"
    ],
    payment: {
      nightlyRate: 2000,
      reservationDay: 11,
      discountPercent: 25,
      extras: {
        label: "cleaning Fee",
        total: 400
      },
      total: 0,
      cuponCode: null
    },
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
  status: STATUS_CONFIRMATION
} as IReservationState;

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    updateReservationStatus: (
      state: IReservationState,
      action: PayloadAction<string>
    ) => {
      state.status = action.payload;
    }
  }
});

export const { updateReservationStatus } = reservationSlice.actions;

export default reservationSlice.reducer;
