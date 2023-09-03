import { Dispatch, SetStateAction } from "react";
import { IPaymentDetail } from "@/components/molecules/reservationBody/types";

export interface IReservationCost {
  className?: string;
  tempTotal: number;
  amountWithoutDiscount: number;
  paymentDetail: IPaymentDetail;
  setPaymentDetail: Dispatch<SetStateAction<IPaymentDetail>>;
  hideCouponCode?: boolean;
}
