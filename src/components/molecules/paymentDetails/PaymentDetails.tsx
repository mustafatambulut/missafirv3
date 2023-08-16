import { get, map } from "lodash";

import { IPaymentDetails } from "@/components/molecules/paymentDetails/types";

const PaymentDetails = ({ reservation }: IPaymentDetails) => {
  return (
    <div>
      <div tabIndex={0} className="collapse collapse-arrow !visible">
        <input type="checkbox" />
        <div className="collapse-title text-sm lg:text-28 font-mi-sans-semi-bold text-primary-400 pl-0 after:right-2 after:top-6">
          Payment Details
        </div>
        <div className="collapse-content px-0">
          <div className="border-b border-b-gray-200 pb-5 grid grid-cols-1 gap-3">
            {map(get(reservation, "paymentDetails.detail"), (payment, key) => (
              <div
                key={key}
                className="flex w-full justify-between items-center">
                <div className="text-gray-600 lg:text-xl text-xs">
                  {get(payment, "title")}
                </div>
                <div className="text-gray-700 lg:text-xl text-sm">
                  {get(payment, "price")}
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full justify-between items-center mt-5">
            <div className="text-base lg:text-2xl">
              <span className="text-gray-800 mr-2">Total Amount</span>
              <span className="text-gray-400">
                (Total {get(reservation, "nights")} nights)
              </span>
            </div>
            <div className="text-primary text-base lg:text-28">
              <span className="font-mi-sans-semi-bold">
                {get(reservation, "price.amount")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
