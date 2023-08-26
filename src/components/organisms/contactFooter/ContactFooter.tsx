"use client";
import * as Yup from "yup";
import { get } from "lodash";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";

import { useAppSelector } from "@/redux/hooks";
import { IContactFooter } from "@/components/organisms/contactFooter/types";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import Banner from "@/components/molecules/banner/Banner";

const ContactFooter = ({ className = "" }: IContactFooter) => {
  const t = useTranslations();
  const { banner } = useAppSelector((state) => state.contactReducer);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid_or_incomplete_email"))
      .max(50, t("email_is_too_long"))
      .required(t("this_field_is_required"))
  });

  const initialValues = { email: "" };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // todo: api entegrasyonu yapılacak
      console.log({ values });
    }
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } =
    formik;

  return (
    <footer className={`lg:mx-10 ${className}`}>
      <Banner
        type="primary"
        title={get(banner, "title")}
        body={get(banner, "description")}>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col w-full lg:items-start lg:justify-start">
          <div className="flex flex-col lg:flex-row gap-x-4 gap-y-6 lg:gap-y-0">
            <div className="w-72 lg:w-80">
              <Input
                type="email"
                name={get(banner, "formItems.[0].name")}
                placeholder={get(banner, "formItems.[0].placeholder")}
                containerclass="text-lg"
                onChange={handleChange}
                value={get(values, "email")}
              />
              {get(errors, "email") && get(touched, "email") && (
                <div className="text-white text-sm lg:text-base">
                  {get(errors, "email")}
                </div>
              )}
            </div>
            <Button
              type="submit"
              variant="btn-white"
              disabled={isSubmitting}
              className="bg-primary-300 border-none text-white w-32 lg:w-fit">
              {get(banner, "formItems.[1].label")}
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
            </Button>
          </div>
        </form>
      </Banner>
    </footer>
  );
};

export default ContactFooter;
