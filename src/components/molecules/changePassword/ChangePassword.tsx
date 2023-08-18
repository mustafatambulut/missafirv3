"use client";
import { useAppSelector } from "@/redux/hooks";
import * as Yup from "yup";
import { get } from "lodash";
import { useFormik } from "formik";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";

const ChangePassword = () => {
  const { user } = useAppSelector((state) => state.profileReducer);

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Zorunlu alan")
      .min(6, "Şifre 6 karakterden fazla olmalı"),
    newPassword: Yup.string()
      .notOneOf(
        [Yup.ref("password"), null],
        "New password must not match current password"
      )
      .required("Zorunlu alan")
      .min(6, "Şifre 6 karakterden fazla olmalı"),
    // newPasswordAgain: Yup.string().required("Zorunlu alan")
    confirmNewPassword: Yup.string()
      .notOneOf(
        [Yup.ref("password"), null],
        "New password must not match current password"
      )
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Zorunlu alan")
      .min(6, "Şifre 6 karakterden fazla olmalı")
  });

  const initialValues = {
    password: get(user, "password"),
    newPassword: "",
    confirmNewPassword: ""
  };

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
        <h1 className="text-3xl font-semibold text-gray-900">Şifre Yenileme</h1>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="form-control lg:col-span-2">
              <Input
                type="password"
                name="password"
                label="Mevcut Şifre"
                placeholder="Mevcut Şifre"
                containerclass="text-base lg:text-lg"
                value={get(values, "password")}
                onChange={handleChange}
              />
              {get(errors, "password") && get(touched, "password") && (
                <div className="text-primary">{get(errors, "password")}</div>
              )}
            </div>
            <div className="form-control">
              <Input
                type="password"
                name="newPassword"
                label="Yeni Şifre"
                placeholder="Yeni Şifre"
                containerclass="text-base lg:text-lg"
                value={get(values, "newPassword")}
                onChange={handleChange}
              />
              {get(errors, "newPassword") && get(touched, "newPassword") && (
                <div className="text-primary">{get(errors, "newPassword")}</div>
              )}
            </div>
            <div className="form-control">
              <Input
                type="password"
                name="confirmNewPassword"
                label="Yeni Şifre Tekrar"
                placeholder="Yeni Şifre Tekrar"
                containerclass="text-base lg:text-lg"
                value={get(values, "confirmNewPassword")}
                onChange={handleChange}
              />
              {get(errors, "confirmNewPassword") &&
                get(touched, "confirmNewPassword") && (
                  <div className="text-primary">
                    {get(errors, "confirmNewPassword")}
                  </div>
                )}
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

export default ChangePassword;
