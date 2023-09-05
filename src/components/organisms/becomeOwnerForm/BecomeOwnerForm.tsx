"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { filter, get } from "lodash";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { OWNER_TYPE_2, STEP_3 } from "@/redux/features/ownerSlice/enum";
import { updateCurrentStep } from "@/redux/features/ownerSlice/ownerSlice";

import Input from "@/components/atoms/input/Input";
import Select from "@/components/atoms/select/Select";
import Button from "@/components/atoms/button/Button";
import Checkbox from "@/components/atoms/checkbox/Checkbox";
import Collapse from "@/components/atoms/collapse/Collapse";
import PhoneInput from "@/components/atoms/phoneInput/PhoneInput";
import FileUploadField from "@/components/atoms/fileUploadField/FileUploadField";

import TargetIcon from "../../../../public/images/target.svg";
import DownArrowIcon from "../../../../public/images/down_arrow.svg";

const BecomeOwnerForm = () => {
  const t = useTranslations();
  const { selectedOwnerType, cities, properties, rooms, ü } = useAppSelector(
    (state) => state.ownerReducer
  );
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid_or_incomplete_email"))
      .max(50, t("email_is_too_long"))
      .required(t("this_field_is_required")),
    location: Yup.string().required(t("this_field_is_required")),
    phone: Yup.string().required(t("this_field_is_required")),
    rooms: Yup.string().required(t("this_field_is_required")),
    property_type: Yup.string().required(t("this_field_is_required")),
    check_1: Yup.boolean().oneOf(
      [true],
      "You need to accept the terms and conditions"
    ),
    check_2: Yup.boolean().oneOf(
      [true],
      "You need to accept the terms and conditions"
    )
  });

  const initialValues = {
    email: "",
    phone: "",
    rooms: "",
    photos: [],
    location: "",
    check_1: false,
    check_2: false,
    property_type: "",
    entire_property_rent: false
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // todo: api entegrasyonu yapılacak
      console.log({ values });
      dispatch(updateCurrentStep(STEP_3));
    }
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    isSubmitting,
    handleSubmit,
    setFieldValue
  } = formik;

  return (
    <div className="flex flex-col items-center gap-y-14">
      <div className="flex gap-x-14 flex-col lg:flex-row">
        <div className="flex-1 flex flex-col gap-10 items-center justify-center lg:w-1/2 text-center mb-4">
          <h1 className="text-28 text-gray-800">
            Discover Your Home's Potential Income with Our Advanced Rent
            Calculator
          </h1>
          <p className="text-2xl text-gray-800">
            With
            <span className="text-primary">
              professional property management
            </span>
            your property can yield a higher income. Please enter your info into
            the form to use the rent increase calculator.
          </p>
          <p className="text-lg text-gray-700">
            *Please note: The figures here are just estimates. An accurate
            potential rent increase for your home will be determined after an
            assessment by our specialists.
          </p>
        </div>
        <form noValidate onSubmit={handleSubmit} className="lg:w-1/2">
          <div className="grid grid-cols-1 gap-y-6">
            <div className="shadow-base-blur-20 rounded-20 p-6 divide-y">
              <div className="pb-6">
                <Collapse
                  className="rounded-none overflow-visible"
                  arrowColor="fill-primary scale-150"
                  showArrowIcon={false}
                  title={
                    <div className="flex w-full items-center">
                      <div className="flex flex-col items-start justify-center flex-1">
                        <div className="text-lg text-gray-600 font-mi-sans-semi-bold">
                          Location
                        </div>
                        <div className="text-sm text-gray-500">
                          {get(values, "location")
                            ? filter(
                                cities,
                                (city) => city.value === get(values, "location")
                              )[0].label
                            : "Select your city"}
                        </div>
                      </div>
                      <TargetIcon />
                    </div>
                  }>
                  <div className="form-control flex w-full font-mi-sans text-lg">
                    <Select
                      showPlaceholder={true}
                      showControlTitle={true}
                      searchId="owner-location"
                      name="location"
                      value={get(values, "location")}
                      items={cities}
                      placeHolder="Location"
                      noResultsMessage="No Results"
                      showSearchIcon={true}
                      className="border-none cursor-pointer"
                      controlWrapperClassName="p-0"
                      searchIconColor="fill-primary"
                      isSearchable={true}
                      isClearable={true}
                      onChange={(value) =>
                        setFieldValue("location", value.value)
                      }
                    />
                  </div>
                </Collapse>
                {get(errors, "location") && get(touched, "location") && (
                  <div className="text-primary">{get(errors, "location")}</div>
                )}
              </div>
              <div className="form-control flex w-full font-mi-sans text-lg py-6">
                <Select
                  showPlaceholder={true}
                  showControlTitle={true}
                  searchId="owner-property-type"
                  items={properties}
                  name="property_type"
                  value={get(values, "property_type")}
                  placeHolder="Choose your property type"
                  placeholderClassName="text-sm text-gray-500"
                  noResultsMessage="No Results"
                  showSearchIcon={false}
                  className="border-none cursor-pointer"
                  controlWrapperClassName="p-0"
                  customIconPosition="right"
                  customIcon={
                    <DownArrowIcon className="fill-primary scale-150" />
                  }
                  controlTitle="Property"
                  controlTitleClassName="text-lg text-gray-600 font-mi-sans-semi-bold"
                  onChange={(value) =>
                    setFieldValue("property_type", value.value)
                  }
                />
                {selectedOwnerType === OWNER_TYPE_2 && (
                  <div className="mt-2">
                    <Checkbox
                      name="entire_property_rent"
                      checked={get(values, "entire_property_rent")}
                      onChange={(e) => {
                        setFieldValue(
                          "entire_property_rent",
                          get(e, "target.checked")
                        );
                      }}
                      position="right"
                      className="p-0"
                      label="The entire property is for rent"
                      labelClass="p-0 items-center flex"
                    />
                  </div>
                )}
                {get(errors, "property_type") &&
                  get(touched, "property_type") && (
                    <div className="text-primary">
                      {get(errors, "property_type")}
                    </div>
                  )}
              </div>
              <div className="form-control flex w-full font-mi-sans text-lg pt-6">
                <Select
                  showPlaceholder={true}
                  showControlTitle={true}
                  searchId="owner-rooms"
                  name="rooms"
                  value={get(values, "rooms")}
                  items={rooms}
                  placeHolder="Number of rooms"
                  placeholderClassName="text-sm text-gray-500"
                  noResultsMessage="No Results"
                  showSearchIcon={false}
                  className="border-none cursor-pointer"
                  controlWrapperClassName="p-0"
                  customIconPosition="right"
                  customIcon={
                    <DownArrowIcon className="fill-primary scale-150" />
                  }
                  controlTitle="Rooms"
                  controlTitleClassName="text-lg text-gray-600 font-mi-sans-semi-bold"
                  onChange={(value) => setFieldValue("rooms", value.value)}
                />
              </div>
              {get(errors, "rooms") && get(touched, "rooms") && (
                <div className="text-primary">{get(errors, "rooms")}</div>
              )}
            </div>
            <div className="shadow-base-blur-20 rounded-20 p-6 grid grid-cols-1 gap-y-6">
              <div className="w-full">
                <Input
                  type="email"
                  name="email"
                  label={t("email")}
                  placeholder={t("email")}
                  containerclass="text-lg border-none"
                  inputContainerClassName="border-none shadow-none"
                  labelContainerClassName="p-0 text-lg text-gray-600 font-mi-sans-semi-bold"
                  onChange={handleChange}
                  value={get(values, "email")}
                  className="p-0"
                />
                {get(errors, "email") && get(touched, "email") && (
                  <div className="text-primary">{get(errors, "email")}</div>
                )}
              </div>
              <div className="w-full">
                <PhoneInput
                  country="tr"
                  name="phone"
                  label="Phone Number"
                  labelClass="p-0 text-lg text-gray-600 font-mi-sans-semi-bold"
                  buttonClass="bg-white border-none"
                  inputClass="font-mi-sans h-12 w-full border-none"
                  containerclass="flex bg-white"
                  dropdownClass="rounded-lg shadow-md"
                  placeholder="Enter your number"
                  alwaysDefaultMask={true}
                  defaultMask={"(...) ... .. .."}
                  className="flex text-lg rounded-xl border-none"
                  value={get(values, "phone")}
                  onChange={(value) => setFieldValue("phone", value)}
                />
                {get(errors, "phone") && get(touched, "phone") && (
                  <div className="text-primary">{get(errors, "phone")}</div>
                )}
              </div>
            </div>
            <div className="shadow-base-blur-20 rounded-20 p-6">
              <Collapse
                className="rounded-none"
                arrowColor="fill-primary scale-150"
                controlOutsideClick={false}
                title={
                  <div className="flex-1">
                    <div className="text-lg text-gray-600">
                      <span className="font-mi-sans-semi-bold">Photos</span>
                      <span className="text-sm text-primary ml-1">
                        (optional)
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Upload photos of your home for a more accurate estimated
                      earnings information.
                    </div>
                  </div>
                }>
                <FileUploadField />
              </Collapse>
            </div>
            <div className="grid grid-cols-1 gap-y-3">
              <Checkbox
                value="check_1"
                name="check_1"
                checked={get(values, "confirmationForm")}
                onChange={(e) => {
                  setFieldValue("check_1", get(e, "target.checked"));
                }}
                label="Under Personal Data Protection Law No. 6698."
                labelClass="text-sm lg:text-base text-gray-700 items-start lg:items-center p-0"
                position="right"
              />
              <Checkbox
                value="check_2"
                name="check_2"
                checked={get(values, "confirmationForm")}
                onChange={(e) => {
                  setFieldValue("check_2", get(e, "target.checked"));
                }}
                label="I've read and agree to the terms in the Missafir Privacy Policy."
                labelClass="text-sm lg:text-base text-gray-700 items-start lg:items-center p-0"
                position="right"
              />
            </div>
            <Button
              type="submit"
              variant="btn-primary"
              disabled={!(formik.isValid && formik.dirty)}
              className="border-none text-white w-full">
              <div>
                <span>Calculate rent increase</span>
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeOwnerForm;
