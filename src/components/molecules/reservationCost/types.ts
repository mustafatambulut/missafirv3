import { Dispatch, SetStateAction } from "react";
import { IPaymentDetail } from "@/components/molecules/reservationBody/types";

export interface IReservationCost {
  tempTotal: number;
  paymentDetail: IPaymentDetail;
  setPaymentDetail: Dispatch<SetStateAction<IPaymentDetail>>;
  amountWithoutDiscount: number;
  className?: string;
}
