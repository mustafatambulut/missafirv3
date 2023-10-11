import { IPaymentLayout } from "@/app/[lang]/payment/types";

const PaymentLayout = ({ children }: IPaymentLayout)=> {
  return <section>{children}</section>;
};

export default PaymentLayout;
