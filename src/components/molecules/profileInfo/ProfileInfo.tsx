"use client";
import * as Yup from "yup";
import { get, omit } from "lodash";
import { useFormik } from "formik";
import { IMaskInput } from "react-imask";
import PhoneInput from "react-phone-input-2";
import { useAppSelector } from "@/redux/hooks";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";

import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

const ProfileInfo = () => {
  const { user } = useAppSelector((state) => state.profileReducer);

  //todo: dil dosyaları düzenlenecek
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email hatalı")
      .max(50, "Email çok uzun")
      .required("Zorunlu alan"),
    password: Yup.string()
      .required("Zorunlu alan")
      .min(6, "Şifre 6 karakterden fazla olmalı"),
    phone: Yup.string().required("Zorunlu alan"),
    gender: Yup.string().required("Zorunlu alan"),
    address: Yup.string().required("Zorunlu alan"),
    lastName: Yup.string().required("Zorunlu alan"),
    firstName: Yup.string().required("Zorunlu alan"),
    birthDate: Yup.string().required("Zorunlu alan")
  });

  const initialValues = omit(user, ["fullName", "avatar"]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      alert("Updated!");
    }
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } =
    formik;

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-y-8">
        <h1 className="text-3xl font-semibold text-gray-900">Temel Bilgiler</h1>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="form-control">
              <Input
                type="text"
                name="firstName"
                label="Firstname"
                placeholder="Firstname"
                containerClassName="text-base lg:text-lg"
                value={get(values, "firstName")}
                onChange={handleChange}
              />
              {get(errors, "firstName") && get(touched, "firstName") && (
                <div className="text-primary">{get(errors, "firstName")}</div>
              )}
            </div>
            <div className="form-control">
              <Input
                type="text"
                name="lastName"
                label="Lastname"
                placeholder="Lastname"
                containerClassName="text-base lg:text-lg"
                value={get(values, "lastName")}
                onChange={handleChange}
              />
              {get(errors, "lastName") && get(touched, "lastName") && (
                <div className="text-primary">{get(errors, "lastName")}</div>
              )}
            </div>
            <div className="form-control">
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                containerClassName="text-base lg:text-lg"
                value={get(values, "email")}
                onChange={handleChange}
              />
              {get(errors, "email") && get(touched, "email") && (
                <div className="text-primary">{get(errors, "email")}</div>
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
                onChange={formik.handleChange}
                value={get(formik, "values.phone")}
                className="text-sm border border-gray-300 pl-0 p-0.5 rounded-lg h-12 input focus:outline-0 w-full text-gray-800"
              />
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
                onChange={handleChange}
                value={get(values, "address")}
                placeholder="Address"></textarea>
              {get(errors, "address") && get(touched, "address") && (
                <div className="text-primary">{get(errors, "address")}</div>
              )}
            </div>

            <div className="form-control flex-col gap-y-4">
              <div className="form-control font-mi-sans text-lg">
                <label className="label">Birth Date</label>
                <div className="border border-gray-300 rounded-lg">
                  <IMaskInput
                    mask="00/00/0000"
                    name="birthDate"
                    value={get(values, "birthDate")}
                    onAccept={handleChange}
                    className="input focus:outline-0 w-full text-gray-800"
                  />
                </div>
              </div>

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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        checked={get(values, "gender") === "other"}
                      />
                      <span className="label-text">Diğer</span>
                    </label>
                  </div>
                </div>
              </div>
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
