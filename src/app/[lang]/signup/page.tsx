"use client";
import { get } from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { signUp } from "@/service/api";
import { setLocalStorage } from "@/utils/helper";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import Checkbox from "@/components/atoms/checkbox/Checkbox";
import PhoneInput from "@/components/atoms/phoneInput/PhoneInput";
import SingleDatePicker from "@/components/atoms/singleDatePicker/SingleDatePicker";

import AppleIcon from "../../../../public/images/apple.svg";
import GoogleIcon from "../../../../public/images/google.svg";
import FacebookIcon from "../../../../public/images/variants/facebook.svg";

const Signup = () => {
  const router = useRouter();
  const t = useTranslations();
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
      .required(t("this_field_is_required"))
    // confirmPassword: Yup.string()
    //   .required(t("this_field_is_required"))
    //   .oneOf(
    //     [Yup.ref("password"), null],
    //     t("phone_number_is_not_valid")
    //   )
  });

  const initialValues = {
    email: "",
    phone: "",
    address: "",
    fullname: "",
    birthDate: new Date(),
    password: "",
    confirmPassword: "",
    confirmationForm: false
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await signUp(values);
      setLocalStorage("token", get(res, "data.token"));
      router.push("/login");
      router.refresh();
    }
  });

  const { values, errors, touched, handleChange, setFieldValue, handleSubmit } =
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
    <div className="flex flex-col font-mi-sans mt-20 lg:mt-40 px-4 lg:px-80">
      <form
        className="flex flex-col lg:gap-y-8"
        noValidate
        onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold text-gray-900">{t("sign_up")}</h1>
        <div className="flex flex-col gap-y-2 lg:gap-y-4">
          <div className="flex flex-col gap-y-2 lg:gap-y-0 lg:gap-x-7 lg:flex-row">
            <div className="w-full lg:h-24">
              <Input
                errors={errors}
                touched={touched}
                type="text"
                name="fullname"
                label="Full name"
                placeholder="Full name"
                containerClassName="text-lg -mt-1"
                value={get(values, "fullname")}
                onChange={handleChange}
              />
              {get(errors, "fullname") && get(touched, "fullname") && (
                <div className="text-primary text-sm lg:text-base">
                  {get(errors, "fullname")}
                </div>
              )}
            </div>
            <div className="w-full lg:h-24">
              <SingleDatePicker
                label="Birth Date"
                datePickerClass="border-gray-300"
                selected={get(values, "birthDate")}
                onChange={(date) => setFieldValue("birthDate", date)}
              />
              {get(errors, "birthDate") && get(touched, "birthDate") && (
                <div className="text-primary">{get(errors, "birthDate")}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-2 lg:gap-y-0 lg:gap-x-7 lg:flex-row">
            <div className="w-full lg:h-24">
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                containerClassName="text-lg"
                onChange={handleChange}
                value={get(values, "email")}
              />
              {get(errors, "email") && get(touched, "email") && (
                <div className="text-primary text-sm lg:text-base">
                  {get(errors, "email")}
                </div>
              )}
            </div>
            <div className="w-full lg:h-24">
              <PhoneInput
                country="tr"
                name="phone"
                label="Phone"
                buttonClass="border border-r-0 bg-white"
                inputClass="font-mi-sans h-12 w-full"
                containerClass="flex bg-white"
                dropdownClass="rounded-lg shadow-md"
                placeholder="+90 (___) ___ __ __"
                alwaysDefaultMask={true}
                defaultMask={"(...) ... .. .."}
                className="flex text-lg rounded-xl"
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
          <div className="flex flex-col mt-2">
            <label className="label" htmlFor="address">
              Address
            </label>
            <textarea
              rows={5}
              id="address"
              name="address"
              className="border focus:outline-0 rounded-lg p-2 w-full"
              maxLength={255}
              onChange={handleChange}
              value={get(values, "address")}
              placeholder="Address"></textarea>
            {get(errors, "address") && get(touched, "address") && (
              <div className="text-primary text-sm lg:text-base">
                {get(errors, "address")}
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="flex flex-col lg:gap-y-7">
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            containerClassName="text-lg"
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
            containerClassName="text-lg"
            onChange={handleChange}
            value={get(values, "confirmPassword")}
          />
          {get(errors, "confirmPassword") &&
            get(touched, "confirmPassword") && (
              <div className="text-primary text-sm lg:text-base">
                {get(errors, "confirmPassword")}
              </div>
            )}
        </div>
        <div className="flex flex-col mt-2 lg:mt-0">
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
          <Checkbox
            value="privacy_policy"
            name="policy"
            onChange={(e) => {
              setFieldValue("policy", get(e, "target.value"));
            }}
            label="I accept the Terms of Use and Privacy Policy."
            labelClass="text-sm lg:text-base items-start lg:items-center"
            position="right"
          />
        </div>
        <div className="flex flex-col">
          <Button type="submit" className="text-xl">
            {t("sign_up")}
          </Button>
          <div className="flex justify-center items-center gap-x-1 text-base">
            <p className="text-gray-400">Do you have account?</p>
            <Button
              link="/login"
              variant="btn-ghost"
              className="text-primary font-mi-sans px-0"
              outline={true}>
              {t("login_now")}
            </Button>
          </div>
        </div>
      </form>
      {/*todo: daha sonra aktif edilecek*/}
      {/*<div className="divider text-gray-600">or</div>*/}
      {/*<SocialAuthCard />*/}
    </div>
  );
};
export default Signup;
