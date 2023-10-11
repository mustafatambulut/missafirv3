"use client";
import { get } from "lodash";
import { useTranslations } from "next-intl";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import Checkbox from "@/components/atoms/checkbox/Checkbox";
import PhoneInput from "@/components/atoms/phoneInput/PhoneInput";
import { IDefaultSignUpPartial } from "@/components/atoms/defaultSignUpPartial/types";

const DefaultSignUpPartial = ({
  formik,
  className = ""
}: IDefaultSignUpPartial) => {
  const t = useTranslations();
  const { values, touched, errors, setFieldValue, handleChange } = formik;

  return (
    <div className={`${className}`}>
      <h1 className="text-3xl font-semibold text-gray-900">{t("sign_up")}</h1>
      <div className="flex flex-col gap-y-2 lg:gap-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-y-0 lg:gap-x-7">
          <div className="w-full">
            <Input
              type="text"
              name="fullname"
              label="Full name"
              placeholder="Full name"
              containerclass="text-lg"
              value={get(values, "fullname")}
              onChange={handleChange}
            />
            {get(errors, "fullname") && get(touched, "fullname") && (
              <div className="text-primary text-sm lg:text-base">
                {get(errors, "fullname")}
              </div>
            )}
          </div>
          <div className="w-full">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              containerclass="text-lg"
              onChange={handleChange}
              value={get(values, "email")}
            />
            {get(errors, "email") && get(touched, "email") && (
              <div className="text-primary text-sm lg:text-base">
                {get(errors, "email")}
              </div>
            )}
          </div>
          <div className="w-full">
            <PhoneInput
              id="phone"
              country="tr"
              name="phone"
              label="Phone"
              labelClass="text-lg"
              alwaysDefaultMask={true}
              value={get(values, "phone")}
              onChange={(value) => setFieldValue("phone", value)}
            />
            {get(errors, "phone") && get(touched, "phone") && (
              <div className="text-primary text-sm lg:text-base">
                {get(errors, "phone")}
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="flex flex-col lg:gap-y-7">
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          containerclass="text-lg"
          onChange={handleChange}
          value={get(values, "password")}
        />
        {get(errors, "password") && get(touched, "password") && (
          <div className="text-primary text-sm lg:text-base">
            {get(errors, "password")}
          </div>
        )}
        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          containerclass="text-lg"
          onChange={handleChange}
          value={get(values, "confirmPassword")}
        />
        {get(errors, "confirmPassword") && get(touched, "confirmPassword") && (
          <div className="text-primary text-sm lg:text-base">
            {get(errors, "confirmPassword")}
          </div>
        )}
      </div>
      <div className="flex flex-col mt-2 lg:mt-0">
        <div>
          <Checkbox
            value="confirmation_form"
            name="confirmationForm"
            checked={get(values, "confirmationForm")}
            onChange={(e) => {
              setFieldValue("confirmationForm", get(e, "target.checked"));
            }}
            label="I accept the sending of commercial electronic messages to me via e-mail, text message and telephone within the scope of the consent form."
            labelClass="text-sm lg:text-base items-start lg:items-center"
            position="right"
          />
          {get(errors, "confirmationForm") &&
            get(touched, "confirmationForm") && (
              <div className="text-primary text-sm lg:text-base">
                {get(errors, "confirmationForm")}
              </div>
            )}
        </div>
        <div>
          <Checkbox
            value="privacy_policy"
            name="policy"
            checked={get(values, "policy")}
            onChange={(e) => {
              setFieldValue("policy", get(e, "target.checked"));
            }}
            label="I accept the Terms of Use and Privacy Policy."
            labelClass="text-sm lg:text-base items-start lg:items-center"
            position="right"
          />
          {get(errors, "policy") && get(touched, "policy") && (
            <div className="text-primary text-sm lg:text-base">
              {get(errors, "policy")}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <Button type="submit" className="text-xl">
          {t("sign_up")}
        </Button>
        <div className="flex justify-center items-center gap-x-1 text-base">
          <p className="text-gray-400">{t("do_you_have_account")}</p>
          <Button
            link="/login"
            variant="btn-ghost"
            className="text-primary font-mi-sans px-0"
            outline={true}>
            {t("login_now")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DefaultSignUpPartial;
