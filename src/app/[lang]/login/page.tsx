"use client";
import { useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { get } from "lodash";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { auth } from "@/service/api";
import { setLocalStorage } from "@/utils/helper";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import Checkbox from "@/components/atoms/checkbox/Checkbox";

import AppleIcon from "../../../../public/images/apple.svg";
import GoogleIcon from "../../../../public/images/google.svg";
import FacebookIcon from "../../../../public/images/variants/facebook.svg";

const Login = () => {
  const router = useRouter();
  const t = useTranslations();

  const [errorMessage, setErrorMessage] = useState<any>(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid_or_incomplete_email"))
      .max(50, t("email_is_too_long"))
      .required(t("this_field_is_required")),
    password: Yup.string()
      .required(t("this_field_is_required"))
      .min(6, t("password_is_too_short_must_be_at_least_6_characters"))
  });

  const initialValues = {
    email: "",
    password: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await auth(values);
      if (get(res, "code") === 401) {
        return setErrorMessage("your_email_address_or_password_is_incorrect");
      }
      setLocalStorage("token", get(res, "data.token"));
      router.back();
      router.refresh();
    }
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } =
    formik;

  // todo: daha sonra aktif edilecek
  // eslint-disable-next-line no-unused-vars
  const SocialAuthCard = () => {
    return (
      <div className="flex flex-col justify-center lg:justify-start gap-y-6">
        <h1 className="text-base text-gray-400">or select method to log in:</h1>
        <div className="flex gap-x-2 lg:gap-x-4">
          <Button
            className="w-28 lg:w-1/3 gap-x-3 border-gray-300 text-gray-600"
            variant="btn-square"
            outline={true}>
            <FacebookIcon />
          </Button>
          <Button
            className="w-28 lg:w-1/3 gap-x-3 border-gray-300 text-gray-600"
            variant="btn-square"
            outline={true}>
            <GoogleIcon />
          </Button>
          <Button
            className="w-28 lg:w-1/3 gap-x-3 border-gray-300 text-gray-600"
            variant="btn-square"
            outline={true}>
            <AppleIcon />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <form
      className="flex lg:justify-center font-mi-sans mt-20 lg:mt-40 px-4 lg:px-80"
      noValidate
      onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-y-8">
        <h1 className="text-3xl font-semibold text-gray-900">
          {t("welcome_to_missafir")}
        </h1>
        <div className="flex flex-col">
          <div className="flex container mx-auto justify-center flex-col gap-y-4">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              containerClassName="text-lg"
              value={get(values, "email")}
              onChange={handleChange}
            />
            {get(errors, "email") && get(touched, "email") && (
              <div className="text-primary">{get(errors, "email")}</div>
            )}
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              containerClassName="text-lg"
              onChange={formik.handleChange}
              value={get(formik, "values.password")}
            />
            {get(errors, "password") && get(touched, "password") && (
              <div className="text-primary">{get(errors, "password")}</div>
            )}
            <div className="flex justify-between items-center">
              <Checkbox
                label="Remember me"
                labelClass="text-base"
                position="right"
              />
              <Link href="/forgot-password" className="text-primary text-lg">
                Forgot password
              </Link>
            </div>
            {errorMessage && (
              <p className="text-center text-lg text-primary">
                {t(errorMessage)}
              </p>
            )}
            <Button disabled={isSubmitting} type="submit" className="text-xl">
              Login
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
            </Button>
            <div className="flex justify-center items-center gap-x-1 text-base">
              <p className="text-gray-400">Dont you have an account? Sign Up</p>
              <Button
                link="/signup"
                variant="btn-ghost"
                className="text-primary font-mi-sans"
                outline={true}>
                Sign Up
              </Button>
            </div>
            {/*todo: daha sonra aktif edilecek*/}
            {/*<div className="divider text-gray-600">or</div>*/}
            {/*<SocialAuthCard />*/}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
