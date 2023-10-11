"use client";
import * as Yup from "yup";
import { get } from "lodash";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IContactForm } from "@/components/organisms/contactForm/types";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import PhoneInput from "@/components/atoms/phoneInput/PhoneInput";

import BodyHeartIcon from "../../../../public/images/contact_heart.svg";
import { changeIsSend } from "@/redux/features/contactSlice/contactSlice";

const ContactForm = ({ className = "" }: IContactForm) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    fullname: Yup.string().required(t("this_field_is_required")),
    email: Yup.string()
      .email(t("invalid_or_incomplete_email"))
      .max(50, t("email_is_too_long"))
      .required(t("this_field_is_required")),
    phone: Yup.string()
      .matches(phoneRegExp, t("phone_number_is_not_valid"))
      .required(t("this_field_is_required")),
    subject: Yup.string().required(t("this_field_is_required")),
    details: Yup.string().required(t("this_field_is_required"))
  });

  const initialValues = {
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    details: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // todo: api entegrasyonu yapılacak
      dispatch(changeIsSend(true));
    }
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    isSubmitting,
    setFieldValue,
    handleSubmit
  } = formik;

  return (
    <div>
      <form
        className={`flex justify-center font-mi-sans lg:my-16 mt-10 ${className}`}
        noValidate
        onSubmit={handleSubmit}>
        <Toaster duration={4000} position="top-right" reverseOrder={false} />
        <div className="flex flex-col lg:w-1/2 gap-y-4">
          <div className="w-full lg:h-24">
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
              <div className="text-primary text-sm lg:text-base">
                {get(errors, "fullname")}
              </div>
            )}
          </div>
          <div className="w-full lg:h-24">
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
              <div className="text-primary text-sm lg:text-base">
                {get(errors, "email")}
              </div>
            )}
          </div>
          <PhoneInput
            id="phone"
            country="tr"
            name="phone"
            label={t("phone")}
            buttonClass="border border-r-0"
            inputClass="font-mi-sans h-12 w-full"
            containerclass="flex bg-white"
            dropdownClass="rounded-lg shadow-md"
            placeholder={t("phone")}
            alwaysDefaultMask={true}
            value={get(values, "phone")}
            onChange={(value) => setFieldValue("phone", value)}
          />
          {get(errors, "phone") && get(touched, "phone") && (
            <div className="text-primary text-sm lg:text-base">
              {get(errors, "phone")}
            </div>
          )}
          <div className="w-full lg:h-24">
            <Input
              type="text"
              name="subject"
              label={t("subject")}
              placeholder={t("subject")}
              containerclass="text-lg"
              onChange={handleChange}
              value={get(values, "subject")}
            />
            {get(errors, "subject") && get(touched, "subject") && (
              <div className="text-primary text-sm lg:text-base">
                {get(errors, "subject")}
              </div>
            )}
          </div>
          <div className="w-full lg:h-24 lg:mb-20">
            <label className="label text-lg" htmlFor="details">
              {t("details")}
            </label>
            <textarea
              rows={5}
              id="details"
              name="details"
              className="border focus:outline-0 rounded-lg p-2 w-full"
              maxLength={255}
              onChange={handleChange}
              value={get(values, "details")}
              placeholder={t("details")}></textarea>
            {get(errors, "details") && get(touched, "details") && (
              <div className="text-primary text-sm lg:text-base">
                {get(errors, "details")}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="text-xl">
              {t("send")}
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
            </Button>
          </div>
        </div>
      </form>
      <div className="hidden lg:block absolute -bottom-96 left-0">
        <BodyHeartIcon />
      </div>
    </div>
  );
};

export default ContactForm;
