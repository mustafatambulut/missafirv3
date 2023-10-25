"use client";
import { useEffect } from "react";
import * as Yup from "yup";
import moment from "moment";
import get from "lodash/get";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { IMaskInput, IMask } from "react-imask";
import { toast, Toaster } from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProfileData, updateProfile } from "@/redux/features/profileSlice";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import Checkbox from "@/components/atoms/checkbox/Checkbox";
import PhoneInput from "@/components/atoms/phoneInput/PhoneInput";
import Typography from "@/components/atoms/typography/Typography";
import ToastMessage from "@/components/atoms/toastMessage/ToastMessage";

import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

const ProfileInfo = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.profileReducer);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  //todo: dil dosyaları düzenlenecek
  const validationSchema = Yup.object({
    phone: Yup.string()
      .min(11, t("phone_number_is_missing_or_invalid"))
      .matches(phoneRegExp, "phone_number_is_not_valid")
      .required(t("required_field")),
    gender: Yup.string().required(t("required_field")),
    address: Yup.string().required(t("required_field")),
    fullname: Yup.string().required(t("required_field")),
    birthday: Yup.string().required(t("required_field"))
  });

  const initialValues = {
    phone: get(user, "phone"),
    gender: get(user, "gender"),
    address: get(user, "address"),
    fullname: get(user, "fullname"),
    birthday: moment(get(user, "birthday", ""), "YYYY-MM-DD").format(
      "DD-MM-YYYY"
    ),
    is_newsletter: get(user, "is_newsletter")
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const editedValues = {
        ...values,
        birthday: moment(values.birthday, "DD-MM-YYYY").format("YYYY-MM-DD")
      };
      const res = await dispatch(updateProfile(editedValues));
      if (get(res, "payload.status") || get(res, "payload.code") === 200) {
        toast.custom((item) => (
          <ToastMessage
            toast={toast}
            item={item}
            title={t("toast_success")}
            status="success">
            <p className="text-md lg:text-xl text-black">
              {t("your_information_has_been_updated")}
            </p>
          </ToastMessage>
        ));
      } else {
        toast.custom((item) => (
          <ToastMessage
            toast={toast}
            item={item}
            title={t("toast_error")}
            status="error">
            <p className="text-md lg:text-xl text-black">
              {t("oops_something_went_wrong")}
            </p>
          </ToastMessage>
        ));
      }
    }
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    dirty
  } = formik;

  const blocks = {
    // day block with mask set to MaskedRange from 1 to 31 with a length of 2
    d: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2
    },
    // month block with mask set to MaskedRange from 1 to 12 with a length of 2
    m: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2
    },
    // year block with mask set to MaskedRange from 1900 to 2999 with a length of 4
    Y: {
      mask: IMask.MaskedRange,
      from: 1900,
      to: 2999
    }
  };

  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Toaster duration={4000} position="top-right" reverseOrder={false} />
      <div className="flex w-full flex-col gap-y-8">
        <Typography
          variant="h4"
          element="h4"
          className="font-semibold text-gray-900">
          {t("basic_knowledge")}
        </Typography>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="form-control">
              <Input
                type="text"
                name="fullname"
                label={t("full_name")}
                placeholder={t("full_name")}
                containerclass="text-base lg:text-lg"
                value={get(values, "fullname")}
                onChange={(e) => setFieldValue("fullname", e.target.value)}
              />
              {get(errors, "fullname") && get(touched, "fullname") && (
                <div className="text-primary">{get(errors, "fullname")}</div>
              )}
            </div>
            <div className="form-control">
              <Input
                type="email"
                name="email"
                label={t("email")}
                disabled
                placeholder={t("email")}
                containerclass="text-base lg:text-lg"
                value={get(user, "email")}
              />
              {get(errors, "email") && get(touched, "email") && (
                <div className="text-primary">{get(errors, "email")}</div>
              )}
            </div>
            <div className="form-control font-mi-sans text-lg">
              <label className="label">{t("birth_date")}</label>
              <div className="border border-gray-200 rounded-lg">
                <IMaskInput
                  blocks={blocks}
                  mask={"d{-}`m{-}`Y"}
                  name="birthday"
                  value={get(values, "birthday")}
                  onAccept={(birthday) => setFieldValue("birthday", birthday)}
                  className="input focus:outline-0 w-full text-gray-800"
                />
              </div>
              {get(errors, "birthday") && get(touched, "birthday") && (
                <div className="text-primary">{get(errors, "birthday")}</div>
              )}
            </div>
            <div className="form-control font-mi-sans text-lg">
              <PhoneInput
                id="phone"
                country="tr"
                name="phone"
                label={t("phone_number")}
                alwaysDefaultMask={true}
                value={get(values, "phone")}
                onChange={(value) => setFieldValue("phone", value)}
              />
              {get(errors, "phone") && get(touched, "phone") && (
                <div className="text-primary">{get(errors, "phone")}</div>
              )}
            </div>
            <div className="form-control font-mi-sans text-lg">
              <label className="label" htmlFor="address">
                {t("address")}
              </label>
              <textarea
                rows={5}
                id="address"
                name="address"
                className="border border-gray-200 focus:outline-0 rounded-lg p-2 w-full text-gray-800 text-base lg:text-lg"
                maxLength={255}
                onChange={(e) => setFieldValue("address", e.target.value)}
                value={get(values, "address")}
                placeholder="Address"></textarea>
              {get(errors, "address") && get(touched, "address") && (
                <div className="text-primary">{get(errors, "address")}</div>
              )}
            </div>

            <div className="form-control flex-col gap-y-4">
              <div className="flex flex-col font-mi-sans text-lg">
                <label className="label" htmlFor="address">
                  {t("gender")}
                </label>
                <div className="flex gap-x-5">
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="gender"
                        className="radio radio-sm checked:bg-primary-600"
                        value="male"
                        onChange={(e) =>
                          setFieldValue("gender", e.target.value)
                        }
                        checked={get(values, "gender") === "male"}
                      />
                      <span className="label-text">{t("man")}</span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="gender"
                        className="radio radio-sm checked:bg-primary-600"
                        value="female"
                        onChange={(e) =>
                          setFieldValue("gender", e.target.value)
                        }
                        checked={get(values, "gender") === "female"}
                      />
                      <span className="label-text">{t("woman")}</span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="gender"
                        className="radio radio-sm checked:bg-primary-600"
                        value="other"
                        onChange={(e) =>
                          setFieldValue("gender", e.target.value)
                        }
                        checked={get(values, "gender") === "other"}
                      />
                      <span className="label-text">{t("other")}</span>
                    </label>
                  </div>
                </div>
                {get(errors, "gender") && get(touched, "gender") && (
                  <div className="text-primary">{get(errors, "gender")}</div>
                )}
              </div>
            </div>
            <div className="form-control">
              <Checkbox
                value="is_newsletter"
                name="is_newsletter"
                checked={get(values, "is_newsletter")}
                onChange={(e) => {
                  setFieldValue("is_newsletter", get(e, "target.checked"));
                }}
                label={t("i_want_to_subscribe_to_newsletters")}
                labelClass="text-sm lg:text-base items-center p-0"
                position="right"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-4 mt-5">
          {dirty && (
            <Button
              type="button"
              variant="btn-ghost"
              className="text-base lg:text-22 text-primary-500 font-mi-sans-semi-bold pl-0"
              onClick={() => formik.resetForm()}>
              {t("discard_changes")}
            </Button>
          )}
          <Button
            type="submit"
            className="btn btn-primary text-base lg:text-22"
            disabled={isSubmitting || !dirty}>
            {t("save")}
            {isSubmitting && <span className="loading loading-spinner"></span>}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileInfo;
