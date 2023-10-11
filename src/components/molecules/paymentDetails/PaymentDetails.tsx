import { get, map } from "lodash";

import { IPaymentDetails } from "@/components/molecules/paymentDetails/types";
import { useTranslations } from "next-intl";
import Typography from "@/components/atoms/typography/Typography";

const PaymentDetails = ({ payment }: IPaymentDetails) => {
  const t = useTranslations()
  return (
    <div>
      <div tabIndex={0} className="collapse collapse-arrow !visible">
        <input type="checkbox" />
        <div className="collapse-title text-sm lg:text-28 font-mi-sans-semi-bold text-primary-400 pl-0 after:right-2 after:top-6">
          {t("payment_details")}
        </div>
        <div className="collapse-content px-0">
          <div className="pb-5 grid grid-cols-1 gap-3">
            {map(get(payment, "breakdown"), (paymentItem, key) => (
              <div
                key={key}
                className="flex w-full justify-between items-center">
                <Typography variant="h6" element="div" className="text-gray-600">
                  {get(paymentItem, "label")}
                </Typography>
                <Typography variant="h6" element="div" className="text-gray-700">
                  {get(paymentItem, "value")}
                </Typography>
              </div>
            ))}
          </div>
          {/*<div className="flex w-full justify-between items-center mt-5">*/}
          {/*  <div className="text-base lg:text-2xl">*/}
          {/*    <span className="text-gray-800 mr-2">Total Amount</span>*/}
          {/*    <span className="text-gray-400">*/}
          {/*      (Total {get(reservation, "nights")} nights)*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*  <div className="text-primary text-base lg:text-28">*/}
          {/*    <span className="font-mi-sans-semi-bold">*/}
          {/*      {get(reservation, "price.amount")}*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
