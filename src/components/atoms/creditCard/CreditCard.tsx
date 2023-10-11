import Cards from "react-credit-cards-2";
import { isMobile } from "react-device-detect";

import { ICreditCard } from "@/components/atoms/creditCard/types";
import { useTranslations } from "next-intl";
import Typography from "../typography/Typography";

const CreditCard = ({ data, className = "" }: ICreditCard) => {
  const t = useTranslations();
  const { cvc, name, number, expiry, focus } = data;

  return (
    <div className={`mb-4 lg:mb-0 ${className}`}>
      <header className="mb-4 lg:hidden">
        <Typography variant="h4" element="h1" className="text-22 text-center">
          {isMobile ? t("payment") : t("safe_and_secure_payments")}
        </Typography>
        <Typography variant="p4" element="p" className="text-base text-gray-600 text-center lg:hidden">
          {t("credit_card_description")}
        </Typography>
      </header>
      <Cards
        cvc={cvc}
        name={name}
        number={number}
        expiry={expiry}
        focused={focus}
      />
    </div>
  );
};

export default CreditCard;
