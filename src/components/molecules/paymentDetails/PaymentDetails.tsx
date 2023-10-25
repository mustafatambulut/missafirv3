import { get, map } from "lodash";

import { IPaymentDetails } from "@/components/molecules/paymentDetails/types";
import { useTranslations } from "next-intl";
import Typography from "@/components/atoms/typography/Typography";
import FileUploadField from "@/components/atoms/fileUploadField/FileUploadField";
import Collapse from "@/components/atoms/collapse/Collapse";

const PaymentDetails = ({ payment }: IPaymentDetails) => {
  const t = useTranslations();
  return (
    <Collapse
      closeOnOutsideClick={false}
      className="rounded-none"
      arrowColor="fill-primary-400 scale-150"
      controlOutsideClick={false}
      title={
        <div className="collapse-title text-sm lg:text-28 font-mi-sans-semi-bold text-primary-400 pl-0 after:right-2 after:top-6">
          {t("payment_details")}
        </div>
      }>
      <div className="pb-5 grid grid-cols-1 gap-3">
        {map(get(payment, "breakdown"), ({ label, value, extra }, key) => {
          return extra ? (
            <div key={key} className="flex flex-col ">
              <div className="flex justify-between">
                <Typography variant="p4" element="span" className="text-base">
                  {label}
                </Typography>
                <Typography variant="p4" element="span" className="text-gray-700">
                  {value}
                </Typography>
              </div>
              <hr />
            </div>
          ) : (
            <div key={key} className="flex justify-between">
              <Typography variant="p3" element="span">
                {label}
              </Typography>
              <Typography variant="p3" element="span" className="text-gray-700">
                {value}
              </Typography>
            </div>
          );
        })}
      </div>
    </Collapse>
  );
};

export default PaymentDetails;
