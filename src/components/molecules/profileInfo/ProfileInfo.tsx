"use client";
import * as Yup from "yup";
import { get } from "lodash";
import { useEffect } from "react";
import { useFormik } from "formik";
import { IMaskInput } from "react-imask";
import PhoneInput from "react-phone-input-2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { fetchProfileData, updateProfile } from "@/redux/features/profileSlice";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";

import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Checkbox from "@/components/atoms/checkbox/Checkbox";

const ProfileInfo = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.profileReducer);

  //todo: dil dosyaları düzenlenecek
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email hatalı")
      .max(50, "Email çok uzun")
      .required("Zorunlu alan"),
    phone: Yup.string().required("Zorunlu alan"),
    gender: Yup.string().required("Zorunlu alan"),
    address: Yup.string().required("Zorunlu alan"),
    fullname: Yup.string().required("Zorunlu alan"),
    birthday: Yup.string().required("Zorunlu alan")
  });

  const initialValues = {
    email: "",
    phone: "",
    gender: "",
    address: "",
    fullname: "",
    birthday: "",
    is_newsletter: false
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // todo: event eklenecek
      //alert(JSON.stringify(values));
      dispatch(updateProfile(values));
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, setFieldValue } =
    formik;

  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  useEffect(() => {
    setFieldValue("email", get(user, "email", ""));
    setFieldValue("phone", get(user, "phone", ""));
    setFieldValue("gender", get(user, "gender", ""));
    setFieldValue("address", get(user, "address", ""));
    setFieldValue("fullname", get(user, "fullname", ""));
    setFieldValue("birthday", moment(get(user, "birthday", "")).format("DD-MM-YYYY"));
    setFieldValue("is_newsletter", get(user, "is_newsletter", ""));
  }, [user]);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-y-8">
        <h1 className="text-3xl font-semibold text-gray-900">Temel Bilgiler</h1>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="form-control">
              <Input
                type="text"
                name="fullname"
                label="Full Name"
                placeholder="Full Name"
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
                label="Email"
                placeholder="Email"
                containerclass="text-base lg:text-lg"
                value={get(values, "email")}
                onChange={(e) => setFieldValue("email", e.target.value)}
              />
              {get(errors, "email") && get(touched, "email") && (
                <div className="text-primary">{get(errors, "email")}</div>
              )}
            </div>
            <div className="form-control font-mi-sans text-lg">
              <label className="label">Birth Date</label>
              <div className="border border-gray-300 rounded-lg">
                <IMaskInput
                  mask="00-00-0000"
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
              <label className="label" htmlFor="phone">
                Phone Number
              </label>
              <PhoneInput
                id="phone"
                country="tr"
                name="phone"
                buttonStyle={{ border: "none" }}
                inputClass="flex border-none h-full text-gray-800 rounded-lg"
                dropdownClass="rounded-lg"
                placeholder="+90 (___) ___ __ __"
                alwaysDefaultMask={true}
                defaultMask={"(...) ... .. .."}
                onChange={(phone) => setFieldValue("phone", phone)}
                value={get(values, "phone")}
                className="text-sm border border-gray-300 pl-0 p-0.5 rounded-lg h-12 input focus:outline-0 w-full text-gray-800"
              />
              {get(errors, "phone") && get(touched, "phone") && (
                <div className="text-primary">{get(errors, "phone")}</div>
              )}
            </div>
            <div className="form-control font-mi-sans text-lg">
              <label className="label" htmlFor="address">
                Address
              </label>
              <textarea
                rows={5}
                id="address"
                name="address"
                className="border border-gray-300 focus:outline-0 rounded-lg p-2 w-full text-gray-800 text-base lg:text-lg"
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
                  Cinsiyet
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
                      <span className="label-text">Erkek</span>
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
                      <span className="label-text">Kadın</span>
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
                      <span className="label-text">Diğer</span>
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
                  label="Bültenlere abone olmak istiyorum."
                  labelClass="text-sm lg:text-base items-start lg:items-center p-0"
                  position="right"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-4 mt-5">
          <Button
            type="button"
            variant="btn-ghost"
            className="text-22 text-primary-500 font-mi-sans-semi-bold pl-0"
            onClick={() => formik.resetForm()}>
            Değişikliklerden vazgeç
          </Button>
          <Button
            type="submit"
            className="btn btn-primary text-22"
            disabled={isSubmitting}>
            Kaydet
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileInfo;
