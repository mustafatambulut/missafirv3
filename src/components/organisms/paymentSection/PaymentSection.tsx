"use client";
import { useEffect, useState } from "react";
import IMask from "imask";
import moment from "moment";
import { IMaskInput } from "react-imask";
import { get, includes, isBoolean, isNull, pick, size } from "lodash";
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
import Checkbox from "@/components/atoms/checkbox/Checkbox";
import Modal from "@/components/atoms/modal/Modal";
import BrokenLink from "../../../../public/images/broken_link.svg";
import Typography from "@/components/atoms/typography/Typography";
import EditPencilIcon from "../../../../public/images/edit_pencil.svg";

const PaymentSection = ({ className = "", message }: IPayment) => {
  useCheckAuth();
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { reservation } = useAppSelector((state) => state.reservationReducer);

  let flag: boolean = !!size(message);
  const { isValidPayload } = useAppSelector((st) => st.paymentReducer);
  const [showAlert, setShowAlert] = useState<boolean>(flag);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [content, setContent] = useState<any>("");
  const [selectedKey, setSelectedKey] = useState<any>("");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: ""
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    let _isBoolean = isBoolean(
      value == "true" || value == "false" ? true : value
    );

    setCardInfo((prev) => ({
      ...prev,
      [name]: _isBoolean ? !JSON.parse(value) : value
    }));
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

  const handleClose = () => setShowAllReviews(false);

  const handleCheckboxText = (e: any) => {
    setShowAllReviews(true);
    setSelectedKey(e);
    setContent(
      includes(e, "term")
        ? pick(reservation, [`${e}_content`, `${e}_title`])
        : {
            policy_title: reservation?.cancelation_policy?.title,
            policy_content: reservation?.cancelation_policy?.value
          }
    );
  };
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
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full gap-x-2">
          <Checkbox
            name="distance"
            checked={get(cardInfo, "distance") || false}
            className="p-0"
            onChange={handleInputChange}
            value={get(cardInfo, "distance") || false}
          />
          <span className="block items-center flex">
            I have read and accept the
            <span
              className="text-base underline cursor-pointer pl-1"
              onClick={() => handleCheckboxText("terms0")}>
              distance sales agreement.
            </span>
          </span>
        </div>
        <div className="flex flex-row w-full gap-x-2">
          <Checkbox
            name="preliminary"
            checked={get(cardInfo, "preliminary") || false}
            onChange={handleInputChange}
            value={get(cardInfo, "preliminary") || false}
            className="p-0"
          />
          <span className="block items-center flex">
            I have read and accepted the
            <span
              className="text-base underline cursor-pointer pl-1"
              onClick={() => handleCheckboxText("terms1")}>
              preliminary information.
            </span>
          </span>
        </div>
      </div>
      {reservation?.cancelation_policy != null && (
        <>
          <hr className="my-3" />
          <div className="flex flex-col gap-y-3">
            <div className="text-grey-600 text-base">
              {content?.policy_title}
            </div>
            <div className="flex gap-x-3">
              <BrokenLink />
              <div onClick={() => handleCheckboxText("policy")}>
                <Typography
                  variant="p3"
                  element="span"
                  className="text-grey-600 text-base mb-3 underline">
                  Cancellation Policy
                </Typography>
              </div>
            </div>
            <div className="flex flex-col rounded-2xl p-4 border">
              <Input
                type="message"
                name="message"
                label={"Would you like to leave a message to your host?"}
                placeholder={"Your message"}
                onChange={handleInputChange}
                containerclass="text-lg"
                inputcontainerclass="pr-4"
                righticon={<EditPencilIcon />}
                // value={get(values, "email")}
                // onChange={handleChange}
              />
            </div>
          </div>
        </>
      )}

      <Modal
        onClose={handleClose}
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: content[`${selectedKey}_title`]
            }}></div>
        }
        bodyClass="lg:w-11/12 lg:max-w-5xl"
        headerClass="text-2xl"
        isOpen={showAllReviews}
        setIsOpen={setShowAllReviews}>
        <div
          className="p-6"
          dangerouslySetInnerHTML={{
            __html: content[`${selectedKey}_content`]
          }}></div>
      </Modal>
    </div>
  );
};

export default PaymentSection;
