"use client";
import * as Yup from "yup";
import { get } from "lodash";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { signUp } from "@/service/api";
import { useAppSelector } from "@/redux/hooks";
import { setLocalStorage } from "@/utils/helper";
import CookiesUtils from "../../../utils/cookies";

import Button from "@/components/atoms/button/Button";
import SignUpPartial from "@/components/atoms/signUpPartial/SignUpPartial";
import DefaultSignUpPartial from "@/components/atoms/defaultSignUpPartial/DefaultSignUpPartial";

import AppleIcon from "../../../../public/images/apple.svg";
import GoogleIcon from "../../../../public/images/google.svg";
import FacebookIcon from "../../../../public/images/variants/facebook.svg";

const Signup = () => {
  const router = useRouter();
  const t = useTranslations();
  const { isPressReservButton } = useAppSelector(
    (step) => step.reservationReducer
  );
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid_or_incomplete_email"))
      .max(50, t("email_is_too_long"))
      .required(t("this_field_is_required")),
    password: Yup.string()
      .required(t("this_field_is_required"))
      .min(6, t("password_is_too_short_must_be_at_least_6_characters")),
    fullname: Yup.string().required(t("this_field_is_required")),
    phone: Yup.string()
      .matches(phoneRegExp, t("phone_number_is_not_valid"))
      .required(t("this_field_is_required")),
    // confirmPassword: Yup.string()
    //   .required(t("this_field_is_required"))
    //   .oneOf(
    //     [Yup.ref("password"), null],
    //     t("phone_number_is_not_valid")
    //   )
    confirmationForm: Yup.boolean().oneOf(
      [true],
      "You need to accept the terms and conditions"
    ),
    policy: Yup.boolean().oneOf(
      [true],
      "You need to accept the terms and conditions"
    )
  });
  const initialValues = {
    email: "",
    phone: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    confirmationForm: false,
    policy: false
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await signUp(values);
      setLocalStorage("token", get(res, "data.token"));
      CookiesUtils.setItem("token", get(res, "data.token"));
      router.push("/login");
      router.refresh();
    }
  });

  // todo: daha sonra aktif edilecek
  // eslint-disable-next-line no-unused-vars
  const SocialAuthCard = () => {
    return (
      <div className="flex flex-col justify-center lg:justify-start gap-y-6">
        <h1 className="text-base text-gray-400"> {t('or_select_method_to_log_in')} </h1>
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
    <div className="flex flex-col font-mi-sans mt-20 lg:mt-40 px-4 lg:px-80">
      <form
        className="flex flex-col gap-y-8"
        noValidate
        onSubmit={get(formik, "handleSubmit")}>
        {isPressReservButton ? (
          <SignUpPartial formik={formik} />
        ) : (
          <DefaultSignUpPartial formik={formik} />
        )}
      </form>
      {/*todo: daha sonra aktif edilecek*/}
      {/*<div className="divider text-gray-600">or</div>*/}
      {/*<SocialAuthCard />*/}
    </div>
  );
};
export default Signup;
