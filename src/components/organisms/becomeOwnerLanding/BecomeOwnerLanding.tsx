"use client";
import * as Yup from "yup";
import Image from "next/image";
import { get, map } from "lodash";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";

import {
  updateCurrentStep,
  updateSelectedCountry
} from "@/redux/features/ownerSlice/ownerSlice";
import { sendDealRequest } from "@/service/api";
import { toast, Toaster } from "react-hot-toast";
import { STEP_2 } from "@/redux/features/ownerSlice/enum";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import ToastMessage from "@/components/atoms/toastMessage/ToastMessage";
import Typography from "@/components/atoms/typography/Typography";
import Banner from "@/components/molecules/banner/Banner";
import Section from "@/components/molecules/section/Section";

const BecomeOwnerLanding = () => {
  const t = useTranslations();
  const { countries } = useAppSelector((state) => state.ownerReducer);
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid_or_incomplete_email"))
      .max(50, t("email_is_too_long"))
      .required(t("this_field_is_required")),
    country_name: Yup.string().required(t("this_field_is_required"))
  });

  const initialValues = { email: "", country_name: "" };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await sendDealRequest(values);
      if (get(res, "data.message") === "success") {
        toast.custom((item) => (
          <ToastMessage
            toast={toast}
            className="w-96 bg-green-600 justify-between"
            item={item}
            title={t("deal_request_successfully_sent")}
            status="success"></ToastMessage>
        ));
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, setFieldValue } =
    formik;

  const handleCountryClick = (countryId) => {
    dispatch(updateSelectedCountry(countryId));
    dispatch(updateCurrentStep(STEP_2));
  };

  const getCountryIcon = (code) => {
    switch (code) {
      case 1:
        return "/images/turkey.svg";
      case 2:
        return "/images/croatia.svg";
      case 3:
        return "/images/montenegro.svg";
      case 4:
        return "/images/cyprus.svg";
      default:
        return null;
    }
  };

  return (
    <div className="px-4 lg:px-8 pt-40">
      <Section
        title={t("select_your_country")}
        description={t(
          "you_can_find_us_in_the_most_popular_locations_of_these_countries"
        )}>
        <div className="flex flex-wrap justify-center">
          {map(countries, (country, key) => (
            <div
              key={key}
              onClick={() => handleCountryClick(get(country, "code"))}
              className=" w-full lg:w-1/3 px-0 py-2 lg:px-5 lg:py-5">
              <div className="cursor-pointer text-3xl shadow-base-blur-20 p-5 gap-x-4 w-full h-full rounded-2xl flex justify-start items-center">
                {getCountryIcon(get(country, "code")) && (
                  <Image
                    priority
                    width="80"
                    height="80"
                    alt="missafir-logo"
                    src={getCountryIcon(get(country, "code"))}
                    className="rounded-full"
                  />
                )}
                <div className="flex flex-col">
                  <Typography variant="p1" element="span">
                    {get(country, "label")}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Banner
        type="primary"
        title={t("not_available_in_your_area")}
        body={t("become_owner_banner_body")}>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col w-full lg:items-start lg:justify-start">
          <Toaster duration={4000} position="top-right" reverseOrder={false} />
          <div className="flex flex-col lg:flex-row gap-x-4 gap-y-6 lg:gap-y-0">
            <div className="w-72 lg:w-80">
              <div className="form-control flex w-full font-mi-sans text-lg">
                <div className="flex rounded-lg bg-white items-center border border-gray-200">
                  <Input
                    type="text"
                    name="country_name"
                    placeholder={t("location")}
                    containerclass="text-lg border-none"
                    inputcontainerclass="border-none shadow-none"
                    value={get(values, "country_name")}
                    onChange={({ target }) =>
                      setFieldValue("country_name", get(target, "value"))
                    }
                  />
                </div>
                {get(errors, "country_name") &&
                  get(touched, "country_name") && (
                    <Typography
                      variant="p3"
                      element="span"
                      className="text-white text-sm lg:text-base">
                      {get(errors, "country_name")}
                    </Typography>
                  )}
              </div>
            </div>
            <div className="w-72 lg:w-80">
              <Input
                type="email"
                name="email"
                placeholder={t("email")}
                containerclass="text-lg"
                onChange={({ target }) =>
                  setFieldValue("email", get(target, "value"))
                }
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
              className="bg-primary-400 border-none text-white w-32 lg:w-fit">
              <span>{t("submit")}</span>
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
            </Button>
          </div>
        </form>
      </Banner>
    </div>
  );
};

export default BecomeOwnerLanding;
