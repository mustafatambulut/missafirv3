"use client";
import { useEffect, useState } from "react";
import IMask from "imask";
import moment from "moment";
import { IMaskInput } from "react-imask";
import { get, isNull, size } from "lodash";
import { useTranslations } from "next-intl";

import {
  updateCardInfo,
  setIsValidPayload
} from "@/redux/features/paymentSlice/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import useCheckAuth from "@/app/[lang]/reservation/useCheckAuth";
import { IPayment } from "@/components/organisms/paymentSection/types";

import Input from "@/components/atoms/input/Input";
import Alert from "@/components/atoms/alert/Alert";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import CancelIcon from "@/../public/images/variants/close.svg";

const PaymentSection = ({ className = "", message }: IPayment) => {
  useCheckAuth();
  const t = useTranslations();
  const dispatch = useAppDispatch();

  let flag: boolean = !!size(message);
  const { isValidPayload } = useAppSelector((st) => st.paymentReducer);
  const [showAlert, setShowAlert] = useState<boolean>(flag);
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
      <h1 className="text-28 hidden lg:block">
        {t("safe_and_secure_payments")}
      </h1>
      {!isNull(isValidPayload) && !isValidPayload && (
        <Alert
          variant="danger"
          title="hata var"
          icon={
            <CancelIcon
              onClick={() => dispatch(setIsValidPayload(true))}
              className="cursor-pointer fill-primary"
            />
          }
        />
      )}
      {showAlert && (
        <Alert
          variant="danger"
          title={message}
          icon={
            <CancelIcon
              onClick={() => setShowAlert(false)}
              className="cursor-pointer fill-primary"
            />
          }
        />
      )}
      <div className="flex flex-col gap-y-3 lg:gap-y-6">
        <div className="form-control w-full">
          <label className="label text-base lg:text-lg -mt-1" htmlFor="number">
            {t("card_number")}
          </label>
          <IMaskInput
            id="number"
            radix="."
            mask={"0000 0000 0000 0000"}
            unmask={true}
            name="number"
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            value={get(cardInfo, "number")}
            placeholder={t("type_the_number_on_your_card")}
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
          placeholder={t("type_the_name_on_your_card")}
          containerclass="text-base lg:text-lg -mt-1"
        />
      </div>
      <div className="flex gap-x-3 lg:gap-x-6">
        <div className="form-control w-full">
          <label className="label text-base lg:text-lg -mt-1" htmlFor="expiry">
            {t("expiration")}
          </label>
          <IMaskInput
            id="expiry"
            mask={Date}
            name="expiry"
            placeholder="MM/YY"
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
            {t("security_code")}
          </label>
          <IMaskInput
            id="cvc"
            max={9999}
            name="cvc"
            mask={Number}
            placeholder="CVV"
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
