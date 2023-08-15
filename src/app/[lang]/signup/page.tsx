"use client";
import { get } from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import PhoneInput from "react-phone-input-2";
import ReactDatePicker from "react-datepicker";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import Checkbox from "@/components/atoms/checkbox/Checkbox";

import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import AppleIcon from "../../../../public/images/apple.svg";
import GoogleIcon from "../../../../public/images/google.svg";
import FacebookIcon from "../../../../public/images/variants/facebook.svg";

const Signup = () => {
  const t = useTranslations();
  const validationSchema = Yup.object({
    username: Yup.string()
      .email(t("invalid_or_incomplete_email"))
      .max(50, t("email_is_too_long"))
      .required(t("this_field_is_required")),
    password: Yup.string()
      .required(t("this_field_is_required"))
      .min(6, t("password_is_too_short_must_be_at_least_6_characters"))
  });

  const initialValues = {
    email: "",
    address: "",
    fullname: "",
    birthDate: new Date(),
    password: "",
    confirmPassword: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      //todo: endpoint bağlanacak
      console.log(values);
    }
  });

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
      onSubmit={formik.handleSubmit}>
      <div className="flex w-full flex-col gap-y-8">
        <h1 className="text-3xl font-semibold text-gray-900">Sign Up</h1>
        <div className="flex flex-col">
          <div className="flex container mx-auto justify-center flex-col gap-y-4">
            <div className="flex items-center gap-x-9">
              <Input
                type="text"
                name="fullname"
                label="Full name"
                placeholder="Full name"
                containerClassName="text-lg"
                value={get(formik, "values.fullname")}
                onChange={formik.handleChange}
              />
              <div className="form-control w-full justify-between">
                <label className="mb-2">Birth Date</label>
                <ReactDatePicker
                  className="flex border rounded-lg focus:outline-0 p-3 w-full"
                  selected={get(formik, "values.birthDate")}
                  onChange={(date) => formik.setFieldValue("birthDate", date)}
                />
              </div>
            </div>
            <div className="flex gap-x-9">
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                containerClassName="text-lg"
                onChange={formik.handleChange}
                value={get(formik, "values.email")}
              />
              <div className="form-control w-full">
                <label className="my-2" htmlFor="phone">
                  Phone Number
                </label>
                <PhoneInput
                  id="phone"
                  country="tr"
                  name="phone"
                  buttonStyle={{ border: "none" }}
                  inputClass="flex border-none h-full"
                  dropdownClass="rounded-lg"
                  placeholder="+90 (___) ___ __ __"
                  alwaysDefaultMask={true}
                  defaultMask={"(...) ... .. .."}
                  onChange={formik.handleChange}
                  value={get(formik, "values.phone")}
                  className="text-sm border border-gray-300 pl-0 p-0.5 rounded-lg h-12"
                />
              </div>
            </div>
            <label htmlFor="address">Address</label>
            <textarea
              rows={5}
              id="address"
              name="address"
              className="border focus:outline-0 rounded-lg p-2"
              maxLength={255}
              onChange={formik.handleChange}
              value={get(formik, "values.address")}
              placeholder="Address"></textarea>
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              containerClassName="text-lg"
              onChange={formik.handleChange}
              value={get(formik, "values.password")}
            />
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              containerClassName="text-lg"
              onChange={formik.handleChange}
              value={get(formik, "values.confirmPassword")}
            />
            <div className="py-6">
              <hr />
            </div>
            <div className="flex flex-col">
              <Checkbox
                label="I accept the sending of commercial electronic messages to me via e-mail, text message and telephone within the scope of the consent form."
                labelClass="text-base"
                position="right"
              />
              <Checkbox
                label="I accept the Terms of Use and Privacy Policy."
                labelClass="text-base"
                position="right"
              />
            </div>
            <Button type="submit" className="text-xl">
              Sign Up
            </Button>
            <div className="flex justify-center items-center gap-x-1 text-base">
              <p className="text-gray-400">Do you have account?</p>
              <Button
                link="/login"
                variant="btn-ghost"
                className="text-primary font-mi-sans px-0"
                outline={true}>
                Login now
              </Button>
            </div>
            <div className="divider text-gray-600">or</div>
            <SocialAuthCard />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
