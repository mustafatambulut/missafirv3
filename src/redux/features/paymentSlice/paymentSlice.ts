import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaymentState } from "@/redux/features/paymentSlice/types";

const initialState = {
  creditCard: {
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: ""
  }
} as IPaymentState;

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updateCardInfo: (state: IPaymentState, action: PayloadAction<boolean>) => {
      state.creditCard = action.payload;
    }
  }
});

export const { updateCardInfo } = paymentSlice.actions;
export default paymentSlice.reducer;
