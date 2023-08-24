import { Dispatch, SetStateAction } from "react";
import { IPaymentDetail } from "@/components/molecules/reservationBody/types";

export interface IAlertCouponCode {
  tempTotal: number;
  paymentDetail: IPaymentDetail;
  setPaymentDetail: Dispatch<SetStateAction<IPaymentDetail>>;
}
