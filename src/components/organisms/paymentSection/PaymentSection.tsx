"use client";
import { useEffect, useState } from "react";
import IMask from "imask";
import moment from "moment";
import { get } from "lodash";
import { IMaskInput } from "react-imask";

import { useAppDispatch } from "@/redux/hooks";
import { IPayment } from "@/components/organisms/paymentSection/types";
import { updateCardInfo } from "@/redux/features/paymentSlice/paymentSlice";

import Input from "@/components/atoms/input/Input";

import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentSection = ({ className = "" }: IPayment) => {
  const dispatch = useAppDispatch();
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: ""
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = ({ target }) => {
    const { name } = target;
    setCardInfo((prev) => ({ ...prev, focus: name }));
  };

  const expiryOption = {
    pattern: "MM/YY",
    format: (date) => moment(date).format("MM/YY"),
    parse: (str) => moment(str, "MM/YY"),
    blocks: {
      YY: {
        mask: IMask.MaskedRange,
        from: 10,
        to: 99
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12
      }
    }
  };

  useEffect(() => {
    dispatch(updateCardInfo(cardInfo));
  }, [cardInfo]);

  return (
    <div className={`flex flex-col gap-y-3 lg:gap-y-6 ${className}`}>
      <h1 className="text-28 hidden lg:block">Safe and Secure Payment</h1>
      <div className="flex flex-col gap-y-3 lg:gap-y-6">
        <div className="form-control w-full">
          <label className="label text-base lg:text-lg -mt-1" htmlFor="number">
            Card Number
          </label>
          <IMaskInput
            id="number"
            radix="."
            mask={Number}
            unmask={true}
            name="number"
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            value={get(cardInfo, "number")}
            placeholder="Type the number on your card"
            className="text-base lg:text-lg focus:outline-0 w-full border border-gray-200 pl-4 p-2 rounded-lg"
          />
        </div>
        <Input
          type="text"
          name="name"
          label="Name"
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          value={get(cardInfo, "name")}
          placeholder="Type the name on your card"
          containerclass="text-base lg:text-lg -mt-1"
        />
      </div>
      <div className="flex gap-x-3 lg:gap-x-6">
        <div className="form-control w-full">
          <label className="label text-base lg:text-lg -mt-1" htmlFor="expiry">
            Expiration
          </label>
          <IMaskInput
            id="expiry"
            mask={Date}
            name="expiry"
            placeholder="MM/YYYY"
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            value={get(cardInfo, "expiry")}
            parse={get(expiryOption, "parse")}
            format={get(expiryOption, "format")}
            blocks={get(expiryOption, "blocks")}
            pattern={get(expiryOption, "pattern")}
            className="text-base lg:text-lg focus:outline-0 w-full border border-gray-200 pl-4 p-2 rounded-lg"
          />
        </div>
        <div className="form-control w-full">
          <label className="label text-base lg:text-lg -mt-1" htmlFor="cvc">
            Security Code
          </label>
          <IMaskInput
            id="cvc"
            min={100}
            max={999}
            name="cvc"
            mask={Number}
            placeholder="CVV/CVC"
            value={get(cardInfo, "cvc")}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            className="text-base lg:text-lg focus:outline-0 w-full border border-gray-200 pl-4 p-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
