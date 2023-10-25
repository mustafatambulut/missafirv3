"use client";
import { useEffect } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { useLocale, useTranslations } from "next-intl";
import { filter, get, map, size } from "lodash";

import {
  fetchRoomTypes,
  fetchHomeTypes,
  updateDistricts,
  updateCurrentStep,
  fetchCorporateTypes,
  updateNeighborhoods,
  fetchNestedLocations,
  resetFlow
} from "@/redux/features/ownerSlice/ownerSlice";
import { sendBecomeOwnerRequest } from "@/service/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { OWNER_TYPE_2, STEP_3 } from "@/redux/features/ownerSlice/enum";

import Input from "@/components/atoms/input/Input";
import Select from "@/components/atoms/select/Select";
import Button from "@/components/atoms/button/Button";
import Checkbox from "@/components/atoms/checkbox/Checkbox";
import Collapse from "@/components/atoms/collapse/Collapse";
import PhoneInput from "@/components/atoms/phoneInput/PhoneInput";
import FileUploadField from "@/components/atoms/fileUploadField/FileUploadField";

import DownArrowIcon from "../../../../public/images/down_arrow.svg";
import ChevronLeft from "../../../../public/images/chevron_left.svg";
import Typography from "@/components/atoms/typography/Typography";

const BecomeOwnerForm = () => {
  const t = useTranslations();
  const {
    selectedOwnerType,
    selectedCountry,
    cities,
    districts,
    neighborhoods,
    roomTypes,
    homeTypes,
    corporateTypes,
    loadingCities,
    loadingDistricts,
    loadingNeighborHoods
  } = useAppSelector((state) => state.ownerReducer);
  const dispatch = useAppDispatch();
  const locale = useLocale();

  const validationSchema = Yup.object({
    owner_type: Yup.string().required(t("this_field_is_required")),
    email: Yup.string()
      .email(t("invalid_or_incomplete_email"))
      .max(50, t("email_is_too_long"))
      .required(t("this_field_is_required")),
    city_id: Yup.string().required(t("this_field_is_required")),
    district_id: Yup.string().required(t("this_field_is_required")),
    neighborhood_id: Yup.string().required(t("this_field_is_required")),
    corporate_type:
      selectedOwnerType === OWNER_TYPE_2
        ? Yup.string().required(t("this_field_is_required"))
        : Yup.string(),
    phone: Yup.string()
      .min(11, t("phone_number_is_missing_or_invalid"))
      .required(t("this_field_is_required")),
    rooms: Yup.string().required(t("this_field_is_required")),
    home_type: Yup.string().required(t("this_field_is_required")),
    terms_and_privacy: Yup.boolean().oneOf(
      [true],
      t("you_need_to_accept_the_terms_and_conditions")
    )
  });

  const initialValues = {
    country_id: selectedCountry,
    city_id: "",
    district_id: "",
    neighborhood_id: "",
    home_type: "",
    corporate_type: "",
    owner_type: selectedOwnerType,
    phone: "",
    email: "",
    photos: [],
    rooms: "",
    entire_property: false,
    terms_and_privacy: false
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("country_id", get(values, "country_id"));
      formData.append("city_id", get(values, "city_id"));
      formData.append("district_id", get(values, "district_id"));
      formData.append("neighborhood_id", get(values, "neighborhood_id"));
      formData.append("home_type", get(values, "home_type"));
      formData.append("owner_type", get(values, "owner_type"));
      formData.append("phone", get(values, "phone"));
      formData.append("email", get(values, "email"));
      formData.append("rooms", get(values, "rooms"));
      formData.append(
        "entire_property",
        get(values, "entire_property") ? 1 : 0
      );
      selectedOwnerType === OWNER_TYPE_2 &&
        formData.append("corporate_type", get(values, "corporate_type"));
      if (size(get(values, "photos"))) {
        for (const image of get(values, "photos")) {
          formData.append("photos[]", get(image, "file"));
        }
      }
      const res = await sendBecomeOwnerRequest(formData);
      if (get(res, "data.message") === "success") {
        dispatch(updateCurrentStep(STEP_3));
      }
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

  const OwnerFormLocations = () => {
    return (
      <div className="pb-6">
        <div className="flex w-full items-center">
          <div className="flex flex-col items-start justify-center flex-1">
            <div className="text-lg text-gray-600 font-mi-sans-semi-bold">
              {t("location")}
            </div>
            <div className="text-sm text-gray-500">
              {get(values, "city_id") !== "" &&
                getLocationLabel(cities, "city_id")}
              {get(values, "district_id") !== "" && (
                <span>/{getLocationLabel(districts, "district_id")}</span>
              )}
              {get(values, "neighborhood_id") !== "" && (
                <span>
                  /{getLocationLabel(neighborhoods, "neighborhood_id")}
                </span>
              )}
              {!get(values, "city_id") &&
                !get(values, "district_id") &&
                !get(values, "neighborhood_id") &&
                t("select_your_city")}
            </div>
          </div>
        </div>
        <div className="form-control flex flex-col gap-y-2 lg:gap-y-0 lg:flex-row gap-x-4 w-full justify-between items-center font-mi-sans text-lg mt-3">
          <Select
            isDisabled={size(cities) === 0}
            rotateIconOnShow={true}
            showPlaceholder={true}
            showControlTitle={true}
            menuClassName="border border-gray-300 lg:border-none lg:w-auto"
            searchId="owner-city"
            name="city_id"
            value={get(values, "city_id")}
            items={map(cities, (city) => ({
              label: city.name,
              value: city.id
            }))}
            placeHolder={t("city")}
            noResultsMessage={t("no_results")}
            className={`border-none cursor-pointer ${
              loadingCities ? "animate-pulse" : null
            }`}
            controlWrapperClassName="p-0"
            searchIconColor="fill-primary"
            isSearchable={true}
            isClearable={true}
            showSearchIcon={false}
            customIconPosition="right"
            customIcon={<DownArrowIcon className="fill-primary scale-150" />}
            onChange={(value) =>
              handleLocationChange(value ? value?.value : "", "city_id")
            }
          />
          <div className="text-gray-300 hidden lg:block">|</div>
          <Select
            isDisabled={size(districts) === 0}
            rotateIconOnShow={true}
            showPlaceholder={true}
            showControlTitle={true}
            menuClassName="border border-gray-300 lg:border-none lg:w-auto"
            searchId="owner-district"
            name="district_id"
            value={get(values, "district_id")}
            items={map(districts, ({ name, id }) => ({
              label: name,
              value: id
            }))}
            placeHolder={t("district")}
            noResultsMessage={t("no_results")}
            className={`border-none cursor-pointer ${
              loadingDistricts ? "animate-pulse" : null
            }`}
            controlWrapperClassName="p-0"
            searchIconColor="fill-primary"
            isSearchable={true}
            isClearable={true}
            showSearchIcon={false}
            customIconPosition="right"
            customIcon={<DownArrowIcon className="fill-primary scale-150" />}
            onChange={(value) =>
              handleLocationChange(value ? value.value : "", "district_id")
            }
          />
          <div className="text-gray-300 hidden lg:block">|</div>
          <Select
            isDisabled={size(neighborhoods) === 0}
            rotateIconOnShow={true}
            showPlaceholder={true}
            showControlTitle={true}
            menuClassName="border border-gray-300 lg:border-none lg:w-auto"
            searchId="owner-neighborhood"
            name="neighborhood_id"
            value={get(values, "neighborhood_id")}
            items={map(neighborhoods, ({ name, id }) => ({
              label: name,
              value: id
            }))}
            placeHolder={t("neighborhood")}
            noResultsMessage={t("no_results")}
            className={`border-none cursor-pointer ${
              loadingNeighborHoods ? "animate-pulse" : null
            }`}
            controlWrapperClassName="p-0"
            searchIconColor="fill-primary"
            isSearchable={true}
            isClearable={true}
            showSearchIcon={false}
            customIconPosition="right"
            customIcon={<DownArrowIcon className="fill-primary scale-150" />}
            onChange={(value) =>
              handleLocationChange(
                value ? get(value, "value") : "",
                "neighborhood_id"
              )
            }
          />
        </div>

        {get(errors, "neighborhood_id") && get(touched, "neighborhood_id") && (
          <div className="text-primary">{get(errors, "location")}</div>
        )}
      </div>
    );
  };

  const handleLocationChange = (value, locationType) => {
    const generateLocation = () => {
      switch (locationType) {
        case "city_id":
          return `${selectedCountry}/${value}`;
        case "district_id":
          return `${selectedCountry}/${get(values, "city_id")}/${value}`;
        default:
          return value;
      }
    };

    const generateType = () => {
      switch (locationType) {
        case "city_id":
          return "district_id";
        case "district_id":
          return "neighborhood_id";
        default:
          return locationType;
      }
    };
    switch (locationType) {
      case "city_id":
        dispatch(updateDistricts([]));
        dispatch(updateNeighborhoods([]));
        setFieldValue("district_id", "");
        setFieldValue("neighborhood_id", "");
        break;
      case "district_id":
        dispatch(updateNeighborhoods([]));
        setFieldValue("neighborhood_id", "");
        break;
      default:
        break;
    }

    setFieldValue(locationType, value);
    locationType !== "neighborhood_id" &&
      value !== "" &&
      dispatch(
        fetchNestedLocations({
          location: generateLocation(),
          type: generateType()
        })
      );
  };

  const getLocationLabel = (target, value) => {
    const label = filter(target, ({ id }) => id === get(values, value));
    return size(label) ? get(label, "[0].name") : "";
  };

  const renderTerms = () => {
    switch (locale) {
      case "tr":
        return (
          <div className="flex gap-x-1">
            <span className="font-mi-sans-semi-bold flex gap-x-1 text-gray-800">
              <Link
                target="_blank"
                href="https://homes.missafir.com/tr/hizmet-sartlari">
                {t("terms_of_use")}
              </Link>
              <span>{t("and")}</span>
              <Link
                target="_blank"
                href="https://homes.missafir.com/tr/gizlilik-politikasi">
                {t("privacy_policy")}
              </Link>
            </span>
            <span>{t("i_accept")}</span>
          </div>
        );
      case "en":
        return (
          <div className="flex gap-x-1">
            <span>{t("i_accept")}</span>
            <span>the</span>
            <span className="font-mi-sans-semi-bold flex gap-x-1 text-gray-800">
              <Link
                target="_blank"
                href="https://homes.missafir.com/en/terms-of-service">
                {t("terms_of_use")}
              </Link>
              <span>{t("and")}</span>
              <Link
                target="_blank"
                href="https://homes.missafir.com/en/privacy-policy">
                {t("privacy_policy")}
              </Link>
            </span>
          </div>
        );
      case "hr":
        return (
          <div className="flex gap-x-1">
            <span>{t("i_accept")}</span>
            <span className="font-mi-sans-semi-bold flex gap-x-1 text-gray-800">
              <Link
                target="_blank"
                href="https://homes.missafir.com/tr/hizmet-sartlari">
                {t("terms_of_use")}
              </Link>
              <span>{t("and")}</span>
              <Link
                target="_blank"
                href="https://homes.missafir.com/tr/gizlilik-politikasi">
                {t("privacy_policy")}
              </Link>
            </span>
          </div>
        );
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(fetchCorporateTypes());
    dispatch(fetchHomeTypes());
    dispatch(fetchRoomTypes());
    dispatch(
      fetchNestedLocations({ location: selectedCountry, type: "city_id" })
    );
  }, []);
  return (
    <div className="flex flex-col items-center gap-y-14 relative">
      <div className="flex gap-x-14 flex-col lg:flex-row z-10">
        <div className="flex-1 flex flex-col gap-10 items-center justify-center lg:w-1/2 text-center mb-4">
          <div className="flex justify-center items-center">
            <div
              onClick={() => dispatch(resetFlow())}
              className="hidden lg:flex cursor-pointer text-primary text-base items-center text-transparent bg-clip-text bg-gradient-to-tr from-[#CF00AD] from-10% via-[#E1004C] via-31% to-[#F8479E] to-92%">
              <ChevronLeft className="scale-75 fill-primary" />
              <Typography variant="p1" element="span" className="">
                {t("back_to_country_selection")}
              </Typography>
            </div>
          </div>
          <h1 className="text-28 text-gray-800">
            {t(
              "discover_your_homes_potential_income_with_our_advanced_rent_calculator"
            )}
          </h1>
          <p className="text-2xl text-gray-800">
            {t("become_owner_form_title")}
          </p>
          <p className="text-lg text-gray-700">{t("become_owner_form_note")}</p>
        </div>
        <form noValidate onSubmit={handleSubmit} className="lg:w-1/2">
          <div className="grid grid-cols-1 gap-y-6">
            <div className="shadow-base-blur-20 rounded-20 p-4 lg:p-6 divide-y">
              <OwnerFormLocations />
              <div className="form-control flex w-full font-mi-sans text-lg py-6">
                <Select
                  rotateIconOnShow={true}
                  showPlaceholder={true}
                  showControlTitle={true}
                  menuClassName="border border-gray-300 lg:border-none"
                  searchId="owner-property-type"
                  items={map(homeTypes, ({ title, value }) => ({
                    label: title,
                    value: value
                  }))}
                  name="home_type"
                  value={get(values, "home_type")}
                  placeHolder={t("choose_your_property_type")}
                  placeholderClassName="text-sm text-gray-500"
                  noResultsMessage={t("no_results")}
                  showSearchIcon={false}
                  className="border-none cursor-pointer"
                  controlWrapperClassName="p-0"
                  customIconPosition="right"
                  customIcon={
                    <DownArrowIcon className="fill-primary scale-150" />
                  }
                  controlTitle={t("property")}
                  controlTitleClassName="text-lg text-gray-600 font-mi-sans-semi-bold"
                  onChange={({ value }) => setFieldValue("home_type", value)}
                />
                {selectedOwnerType === OWNER_TYPE_2 && (
                  <div className="mt-2 lg:mt-4">
                    <Checkbox
                      name="entire_property"
                      checked={get(values, "entire_property")}
                      onChange={(e) => {
                        setFieldValue(
                          "entire_property",
                          get(e, "target.checked")
                        );
                      }}
                      position="right"
                      className="p-0"
                      label={t("the_entire_property_is_for_rent")}
                      labelClass="p-0 items-center flex"
                    />
                  </div>
                )}
                {get(errors, "home_type") && get(touched, "home_type") && (
                  <div className="text-primary">{get(errors, "home_type")}</div>
                )}
              </div>
              {selectedOwnerType === OWNER_TYPE_2 && (
                <div className="form-control flex w-full font-mi-sans text-lg pt-6">
                  <Select
                    rotateIconOnShow={true}
                    showPlaceholder={true}
                    showControlTitle={true}
                    menuClassName="border border-gray-300 lg:border-none"
                    searchId="owner-corporate"
                    name="corporate_type"
                    value={get(values, "corporate_type")}
                    items={map(corporateTypes, ({ title, value }) => ({
                      label: title,
                      value
                    }))}
                    placeHolder={t("select_your_corporation_type")}
                    placeholderClassName="text-sm text-gray-500"
                    noResultsMessage={t("no_results")}
                    showSearchIcon={false}
                    className="border-none cursor-pointer"
                    controlWrapperClassName="p-0"
                    customIconPosition="right"
                    customIcon={
                      <DownArrowIcon className="fill-primary scale-150" />
                    }
                    controlTitle={t("corporation_type")}
                    controlTitleClassName="text-lg text-gray-600 font-mi-sans-semi-bold"
                    onChange={(value) =>
                      setFieldValue("corporate_type", value.value)
                    }
                  />
                </div>
              )}
              <div className="form-control flex w-full font-mi-sans text-lg pt-6">
                <Select
                  rotateIconOnShow={true}
                  showPlaceholder={true}
                  showControlTitle={true}
                  menuClassName="border border-gray-300 lg:border-none"
                  searchId="owner-rooms"
                  name="rooms"
                  value={get(values, "rooms")}
                  items={map(roomTypes, ({ title, value }) => ({
                    label: title,
                    value
                  }))}
                  placeHolder={t("select_your_room_number")}
                  placeholderClassName="text-sm text-gray-500"
                  noResultsMessage={t("no_results")}
                  showSearchIcon={false}
                  className="border-none cursor-pointer"
                  controlWrapperClassName="p-0"
                  customIconPosition="right"
                  customIcon={
                    <DownArrowIcon className="fill-primary scale-150" />
                  }
                  controlTitle={t("rooms")}
                  controlTitleClassName="text-lg text-gray-600 font-mi-sans-semi-bold"
                  onChange={(value) => setFieldValue("rooms", value.value)}
                />
              </div>
              {get(errors, "rooms") && get(touched, "rooms") && (
                <div className="text-primary">{get(errors, "rooms")}</div>
              )}
            </div>
            <div className="shadow-base-blur-20 rounded-20 p-4 lg:p-6 grid grid-cols-1 gap-y-6">
              <div className="w-full order-2 lg:order-1">
                <Input
                  type="email"
                  name="email"
                  label={t("email")}
                  placeholder={t("write_your_email")}
                  containerclass="text-lg border-none"
                  inputcontainerclass="border-none shadow-none"
                  labelcontainerclass="p-0 text-lg text-gray-600 font-mi-sans-semi-bold"
                  placeholderClass="w-full text-sm text-gray-500 block"
                  onChange={handleChange}
                  value={get(values, "email")}
                  className="p-0 border-none"
                />
                {get(errors, "email") && get(touched, "email") && (
                  <div className="text-primary">{get(errors, "email")}</div>
                )}
              </div>
              <div className="w-full order-1 lg:order-2">
                <PhoneInput
                  id="phone"
                  country="tr"
                  name="phone"
                  label={t("phone_number")}
                  labelClass="p-0 text-lg text-gray-600 font-mi-sans-semi-bold"
                  buttonClass="border-none px-0"
                  inputClass="border-none pl-0"
                  className="border-none"
                  alwaysDefaultMask={true}
                  value={get(values, "phone")}
                  onChange={(value) => setFieldValue("phone", value)}
                />
                {get(errors, "phone") && get(touched, "phone") && (
                  <div className="text-primary">{get(errors, "phone")}</div>
                )}
              </div>
            </div>
            <div className="shadow-base-blur-20 rounded-20 p-4 lg:p-6">
              <Collapse
                closeOnOutsideClick={false}
                className="rounded-none"
                arrowColor="fill-primary scale-150"
                controlOutsideClick={false}
                title={
                  <div className="flex-1">
                    <div className="text-lg text-gray-600">
                      <span className="font-mi-sans-semi-bold">
                        {t("photos")}
                      </span>
                      <span className="text-sm text-primary ml-1">
                        ({t("optional")})
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {t(
                        "upload_photos_of_your_home_for_a_more_accurate_estimated_earnings_information"
                      )}
                    </div>
                  </div>
                }>
                <FileUploadField
                  handleOnChange={(value) => setFieldValue("photos", value)}
                  value={get(values, "photos")}
                />
              </Collapse>
            </div>
            <div className="grid grid-cols-1 gap-y-3">
              <Checkbox
                value="terms_and_privacy"
                name="terms_and_privacy"
                checked={get(values, "confirmationForm")}
                onChange={(e) => {
                  setFieldValue("terms_and_privacy", get(e, "target.checked"));
                }}
                label={renderTerms()}
                labelClass="text-sm lg:text-base text-gray-700 items-start lg:items-center p-0"
                position="right"
              />
            </div>
            <Button
              type="submit"
              variant="btn-primary"
              disabled={!(get(formik, "isValid") && get(formik, "dirty"))}
              className="border-none text-white w-full">
              <div className="flex justify-center items-center gap-x-2">
                <Typography variant="p3" element="span">
                  {t("calculate_rent_increase")}
                </Typography>
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
