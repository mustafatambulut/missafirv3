import Cards from "react-credit-cards-2";
import { isMobile } from "react-device-detect";

import { ICreditCard } from "@/components/atoms/creditCard/types";

const CreditCard = ({ data, className = "" }: ICreditCard) => {
  const { cvc, name, number, expiry, focus } = data;

  return (
    <div className={`mb-4 lg:mb-0 ${className}`}>
      <header className="mb-4 lg:hidden">
        <h1 className="text-22 text-center">
          {isMobile ? "Payment" : "Safe and Secure Payment"}
        </h1>
        <h3 className="text-base text-gray-600 text-center lg:hidden">
          Safe, secure transactions. Your personal information is protected.
        </h3>
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
