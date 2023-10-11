"use client";
import { get } from "lodash";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { ISignUpPartial } from "@/components/atoms/signUpPartial/types";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import PhoneInput from "@/components/atoms/phoneInput/PhoneInput";

import ChevronRightIcon from "../../../../public/images/variants/chevron_right.svg";
import Link from "next/link";
import Typography from "../typography/Typography";

const SignUpPartial = ({ formik, className = "" }: ISignUpPartial) => {
  const t = useTranslations();
  const { values, touched, errors, setFieldValue, handleChange } = formik;

  const BannerComponent = (): ReactNode => {
    return (
      <div className="text-center">
        <div className="flex items-center px-10 lg:px-20 justify-center w-full rounded-xl lg:rounded-3xl h-20 lg:h-40 bg-gradient-to-r from-primary to-pink">
          <p className="text-white text-center text-md lg:text-2xl">
            {t("become_a_member_and_take_advantage")}
          </p>
        </div>
        <Link
          href="/"
          className="text-primary text-lg font-mi-sans-semi-bold flex items-center mt-5 justify-center">
          {t("continue_without_login")}
          <ChevronRightIcon />
        </Link>
      </div>
    );
  };
  return (
    <div className={`${className} gap-y-5`}>
      <BannerComponent />
      <div className="flex flex-col gap-y-2 lg:gap-y-4">
        <Input
          type="text"
          name="fullname"
          label={t("full_name")}
          placeholder={t("full_name")}
          containerclass="text-lg -mt-1"
          value={get(values, "fullname")}
          onChange={handleChange}
        />
        {get(errors, "fullname") && get(touched, "fullname") && (
          <Typography variant="p3" element="div" className="text-primary">
            {get(errors, "fullname")}
          </Typography>
        )}
        <Input
          type="email"
          name="email"
          label={t("email")}
          placeholder={t("email")}
          containerclass="text-lg"
          onChange={handleChange}
          value={get(values, "email")}
        />
        {get(errors, "email") && get(touched, "email") && (
          <Typography variant="p3" element="div" className="text-primary">
            {get(errors, "email")}
          </Typography>
        )}
        <PhoneInput
          id="phone"
          country="tr"
          name="phone"
          label={t("phone")}
          labelClass="text-lg"
          alwaysDefaultMask={true}
          value={get(values, "phone")}
          onChange={(value) => setFieldValue("phone", value)}
        />
        {get(errors, "phone") && get(touched, "phone") && (
          <Typography variant="p3" element="div" className="text-primary">
            {get(errors, "phone")}
          </Typography>
        )}
        <Input
          type="password"
          name="password"
          label={t("password")}
          placeholder={t("password")}
          containerclass="text-lg"
          onChange={handleChange}
          value={get(values, "password")}
        />
        {get(errors, "password") && get(touched, "password") && (
          <Typography variant="p3" element="div" className="text-primary text-sm lg:text-base">
            {get(errors, "password")}
          </Typography>
        )}
        <Input
          type="password"
          name="confirmPassword"
          label={t("confirm_password")}
          placeholder={t("confirm_password")}
          containerclass="text-lg"
          onChange={handleChange}
          value={get(values, "confirmPassword")}
        />
        {get(errors, "confirmPassword") && get(touched, "confirmPassword") && (
          <Typography variant="p3" element="div" className="text-primary text-sm lg:text-base">
            {get(errors, "confirmPassword")}
          </Typography>
        )}
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

export default SignUpPartial;
