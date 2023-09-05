"use client";
import * as Yup from "yup";
import Image from "next/image";
import { get, map } from "lodash";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import Banner from "@/components/molecules/banner/Banner";
import Section from "@/components/molecules/section/Section";

import TargetIcon from "../../../../public/images/target.svg";
import { updateCurrentStep } from "@/redux/features/ownerSlice/ownerSlice";
import { STEP_2 } from "@/redux/features/ownerSlice/enum";
import Select from "@/components/atoms/select/Select";

const options = [
  { value: "france", label: "France", code: 1 },
  { value: "israel", label: "Israel", code: 2 },
  { value: "egypt", label: "Egypt", code: 3 },
  { value: "sweden", label: "Sweden", code: 4 }
];
const BecomeOwnerLanding = () => {
  const t = useTranslations();
  const { countries } = useAppSelector((state) => state.ownerReducer);
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid_or_incomplete_email"))
      .max(50, t("email_is_too_long"))
      .required(t("this_field_is_required")),
    location: Yup.string().required(t("this_field_is_required"))
  });

  const initialValues = { email: "", location: "" };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // todo: api entegrasyonu yapılacak
      console.log({ values });
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, setFieldValue } =
    formik;

  const handleCountryClick = (countryCode) => {
    console.log("countryCode", countryCode);
    dispatch(updateCurrentStep(STEP_2));
  };

  return (
    <div className="px-4 lg:px-8 pt-40">
      <Section
        title="Select Your Country"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ">
        <div className="flex flex-wrap justify-center">
          {map(countries, (country, index) => (
            <div
              onClick={() => handleCountryClick(country.code)}
              key={index}
              className=" w-full lg:w-1/3 px-0 py-2 lg:px-5 lg:py-5">
              <div className="cursor-pointer text-3xl shadow-base-blur-20 p-5 gap-x-4 w-full h-full rounded-2xl flex justify-start items-center">
                <Image
                  priority
                  width="80"
                  height="80"
                  alt="missafir-logo"
                  src={get(country, "icon")}
                  className=""
                />
                <div className="flex flex-col">
                  <div className="text-22 lg:text-28">
                    {get(country, "label")}
                  </div>
                  <div className="text-lg lg:text-21 text-gray-400">
                    {get(country, "description")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Banner
        type="primary"
        title="Not available in your area?"
        body="If you have properties in your area that you want to increase their income with Missafir, you can share your information with us. Let us find the solution for you.">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col w-full lg:items-start lg:justify-start">
          <div className="flex flex-col lg:flex-row gap-x-4 gap-y-6 lg:gap-y-0">
            <div className="w-72 lg:w-80">
              <div className="form-control flex w-full font-mi-sans text-lg">
                <div className="flex rounded-lg bg-white items-center border border-gray-200">
                  {/*<Select*/}
                  {/*  isSearchable={true}*/}
                  {/*  searchId="owner-location"*/}
                  {/*  items={options}*/}
                  {/*  placeHolder="Location"*/}
                  {/*  noResultsMessage="No Results"*/}
                  {/*  showSearchIcon={false}*/}
                  {/*  className="border-none"*/}
                  {/*  customIcon={<TargetIcon />}*/}
                  {/*  customIconPosition="right"*/}
                  {/*  controlWrapperClassName="input h-[3rem]"*/}
                  {/*  iconOffset={true}*/}
                  {/*/>*/}

                  <Select
                    showPlaceholder={true}
                    showControlTitle={false}
                    searchId="owner-location"
                    items={options}
                    name="location"
                    placeHolder="Location"
                    value={get(values, "location")}
                    noResultsMessage="No Results"
                    showSearchIcon={false}
                    className="border-none cursor-pointer"
                    customIcon={<TargetIcon />}
                    customIconPosition="right"
                    controlWrapperClassName="input h-[3rem]"
                    isSearchable={true}
                    isClearable={true}
                    onChange={(value) => setFieldValue("location", value.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-72 lg:w-80">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                containerclass="text-lg"
                onChange={(e) => setFieldValue("email", e.target.value)}
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
              <div>
                <span>Submit</span>
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
              </div>
            </Button>
          </div>
        </form>
      </Banner>
    </div>
  );
};

export default BecomeOwnerLanding;
