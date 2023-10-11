"use client";
import { useAppSelector } from "@/redux/hooks";
import * as Yup from "yup";
import { get } from "lodash";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import Typography from "@/components/atoms/typography/Typography";

const ChangePassword = () => {
  const { user } = useAppSelector((state) => state.profileReducer);
  const t = useTranslations()

  const validationSchema = Yup.object({
    password: Yup.string()
      .required(t("required_field"))
      .min(6, t("password_must_be_more_than_6_characters")),
    newPassword: Yup.string()
      .notOneOf(
        [Yup.ref("password"), null],
        t("new_password_must_not_match_current_password")
      )
      .required(t("required_field"))
      .min(6, t("password_must_be_more_than_6_characters")),
    // newPasswordAgain: Yup.string().required("Zorunlu alan")
    confirmNewPassword: Yup.string()
      .notOneOf(
        [Yup.ref("password"), null],
        t("new_password_must_not_match_current_password")
      )
      .oneOf([Yup.ref("newPassword"), null], t("passwords_must_match"))
      .required(t("required_field"))
      .min(6, t("password_must_be_more_than_6_characters"))
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
      // todo: event eklenecek
      alert("Updated!");
    }
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } =
    formik;

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-y-8">
        <Typography variant="h4" element="h4" className="text-gray-800">{t("password_reset")}</Typography>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="form-control lg:col-span-2">
              <Input
                type="password"
                name="password"
                label={t("current_password")}
                placeholder={t("current_password")}
                containerclass="text-base lg:text-lg"
                value={get(values, "password")}
                onChange={handleChange}
              />
              {get(errors, "password") && get(touched, "password") && (
                <Typography variant="p3" element="div" className="text-primary">{get(errors, "password")}</Typography>
              )}
            </div>
            <div className="form-control">
              <Input
                type="password"
                name="newPassword"
                label={t("new_password")}
                placeholder={t("new_password")}
                containerclass="text-base lg:text-lg"
                value={get(values, "newPassword")}
                onChange={handleChange}
              />
              {get(errors, "newPassword") && get(touched, "newPassword") && (
                <Typography variant="p3" element="div" className="text-primary">{get(errors, "newPassword")}</Typography>
              )}
            </div>
            <div className="form-control">
              <Input
                type="password"
                name="confirmNewPassword"
                label={t("new_password_again")}
                placeholder={t("new_password_again")}
                containerclass="text-base lg:text-lg"
                value={get(values, "confirmNewPassword")}
                onChange={handleChange}
              />
              {get(errors, "confirmNewPassword") &&
                get(touched, "confirmNewPassword") && (
                  <Typography variant="p3" element="div" className="text-primary">
                    {get(errors, "confirmNewPassword")}
                  </Typography>
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
            <Typography variant="p2" element="span">{t("discard_changes")}</Typography>
          </Button>
          <Button
            type="submit"
            className="btn btn-primary text-22"
            disabled={isSubmitting}>
            <Typography variant="p2" element="span">{t("save")}</Typography>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
