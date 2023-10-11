import { IPayment } from "@/app/[lang]/payment/types";

const Payment = ({ className="" }: IPayment)=> {
  return (
    <div className={`${className}`}>
      Payment component
    </div>
  );
};

export default Payment;
