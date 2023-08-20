"use client";
import { ReactNode } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { get } from "lodash";
import { useFormik } from "formik";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { toast, Toaster } from "react-hot-toast";

import { auth } from "@/service/api";
import { setSessionStorage } from "@/utils/helper";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import Checkbox from "@/components/atoms/checkbox/Checkbox";
import ToastMessage from "@/components/atoms/toastMessage/ToastMessage";

import AppleIcon from "../../../../public/images/apple.svg";
import GoogleIcon from "../../../../public/images/google.svg";
import FacebookIcon from "../../../../public/images/variants/facebook.svg";

const Login = () => {
  const router = useRouter();
  const t = useTranslations();
  const { isPressReservButton } = useAppSelector(
    (step) => step.reservationReducer
  );

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

      if (get(res, "data.token")) {
        setSessionStorage("token", get(res, "data.token"));

        toast.custom((item) => (
          <ToastMessage
            toast={toast}
            className="w-96 bg-green-600 justify-between"
            item={item}
            title="Success!"
            status="success"></ToastMessage>
        ));
        router.push(isPressReservButton ? "/reservation" : "/");
        router.refresh();
      } else {
        toast.custom((item) => (
          <ToastMessage toast={toast} item={item} title="Oops!" status="error">
            <p className="text-md text-black">{get(res, "message")}</p>
          </ToastMessage>
        ));
      }
    }
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } =
    formik;

  const formClass = classNames(
    "flex container mx-auto justify-center flex-col gap-y-4",
    {
      "lg:px-28 lg:py-20 lg:border rounded-xl": isPressReservButton
    }
  );

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

  const BannerComponent = () => {
    return (
      <>
        <div className="flex items-center px-10 lg:px-20 justify-center w-full rounded-xl lg:rounded-3xl h-20 lg:h-40 bg-gradient-to-r from-primary to-pink">
          <p className="text-white text-center text-md lg:text-2xl">
            Become a member and take advantage of 10% discount on your first
            reservation!
          </p>
        </div>

        {/*todo: sonradan aktif edilecek*/}
        {/*<Button*/}
        {/*  link="/"*/}
        {/*  variant="btn-ghost"*/}
        {/*  className="text-primary text-xl font-mi-sans"*/}
        {/*  outline={true}>*/}
        {/*  Continue without login*/}
        {/*  <ChevronRightIcon />*/}
        {/*</Button>*/}
      </>
    );
  };

  const HeaderComponent = (): ReactNode => {
    return isPressReservButton ? (
      <BannerComponent />
    ) : (
      <h1 className="text-3xl font-semibold text-gray-900">
        {t("welcome_to_missafir")}
      </h1>
    );
  };

  return (
    <form
      className="flex lg:justify-center font-mi-sans mt-20 lg:mt-40 px-4 lg:px-80"
      noValidate
      onSubmit={handleSubmit}>
      <Toaster duration={4000} position="top-right" reverseOrder={false} />
      <div className="flex w-full flex-col gap-y-8">
        <HeaderComponent />
        <div className="flex flex-col">
          <div className={formClass}>
            {isPressReservButton && (
              <h1 className="text-center text-2xl">Login with e-mail</h1>
            )}
            <Input
              type="email"
              name="email"
              label={t("email")}
              placeholder={t("email")}
              containerclass="text-lg"
              value={get(values, "email")}
              onChange={handleChange}
            />
            {get(errors, "email") && get(touched, "email") && (
              <div className="text-primary">{get(errors, "email")}</div>
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
              <div className="text-primary">{get(errors, "password")}</div>
            )}
            <div className="flex justify-between items-center">
              <Checkbox
                label={t("remember_me")}
                labelClass="text-base"
                position="right"
              />
              <Link href="/forgot-password" className="text-primary text-lg">
                {t("forgot_password")}
              </Link>
            </div>
            <Button disabled={isSubmitting} type="submit" className="text-xl">
              {t("login")}
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
            </Button>
            <div className="flex justify-center items-center gap-x-1 text-base">
              <p className="text-gray-400">{t("dont_you_have_an_account")}</p>
              <Button
                link="/signup"
                variant="btn-ghost"
                className="text-primary font-mi-sans"
                outline={true}>
                {t("sign_up")}
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
