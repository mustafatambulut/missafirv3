"use client";
import * as Yup from "yup";
import { get } from "lodash";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import Typography from "@/components/atoms/typography/Typography";
import { changePassword } from "@/service/api";
import { toast, Toaster } from "react-hot-toast";
import ToastMessage from "@/components/atoms/toastMessage/ToastMessage";

const ChangePassword = () => {
  const t = useTranslations();

  const validationSchema = Yup.object({
    current_password: Yup.string()
      .required(t("required_field"))
      .min(6, t("password_must_be_more_than_6_characters")),
    new_password: Yup.string()
      .notOneOf(
        [Yup.ref("current_password"), null],
        t("new_password_must_not_match_current_password")
      )
      .required(t("required_field"))
      .min(6, t("password_must_be_more_than_6_characters")),
    // newPasswordAgain: Yup.string().required("Zorunlu alan")
    new_password_confirm: Yup.string()
      .oneOf([Yup.ref("new_password"), null], t("passwords_must_match"))
      .required(t("required_field"))
      .min(6, t("password_must_be_more_than_6_characters"))
  });

  const initialValues = {
    current_password: "",
    new_password: "",
    new_password_confirm: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await changePassword(values);
      if (get(res, "status") === 200) {
        toast.custom((item) => (
          <ToastMessage
            toast={toast}
            item={item}
            title={t("toast_success")}
            status="success">
            <p className="text-xl text-black">
              {get(res, "data.data.message", t("toast_success"))}
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
              {get(
                res,
                "response.data.message",
                t("oops_something_went_wrong")
              )}
            </p>
          </ToastMessage>
        ));
      }
    }
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } =
    formik;

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Toaster duration={4000} position="top-right" reverseOrder={false} />
      <div className="flex w-full flex-col gap-y-8">
        <Typography variant="h4" element="h4" className="text-gray-800">
          {t("password_reset")}
        </Typography>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="form-control lg:col-span-2">
              <Input
                type="password"
                name="current_password"
                label={t("current_password")}
                placeholder={t("current_password")}
                containerclass="text-base lg:text-lg"
                value={get(values, "current_password")}
                onChange={handleChange}
              />
              {get(errors, "current_password") &&
                get(touched, "current_password") && (
                  <Typography
                    variant="p3"
                    element="div"
                    className="text-primary">
                    {get(errors, "current_password")}
                  </Typography>
                )}
            </div>
            <div className="form-control">
              <Input
                type="password"
                name="new_password"
                label={t("new_password")}
                placeholder={t("new_password")}
                containerclass="text-base lg:text-lg"
                value={get(values, "new_password")}
                onChange={handleChange}
              />
              {get(errors, "new_password") && get(touched, "new_password") && (
                <Typography variant="p3" element="div" className="text-primary">
                  {get(errors, "new_password")}
                </Typography>
              )}
            </div>
            <div className="form-control">
              <Input
                type="password"
                name="new_password_confirm"
                label={t("new_password_again")}
                placeholder={t("new_password_again")}
                containerclass="text-base lg:text-lg"
                value={get(values, "new_password_confirm")}
                onChange={handleChange}
              />
              {get(errors, "new_password_confirm") &&
                get(touched, "new_password_confirm") && (
                  <Typography
                    variant="p3"
                    element="div"
                    className="text-primary">
                    {get(errors, "new_password_confirm")}
                  </Typography>
                )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-4 mt-5">
          {get(formik, "dirty") && (
            <Button
              type="button"
              variant="btn-ghost"
              className="text-22 text-primary-500 font-mi-sans-semi-bold pl-0"
              onClick={() => formik.resetForm()}>
              <Typography variant="p2" element="span">
                {t("discard_changes")}
              </Typography>
            </Button>
          )}
          <Button
            type="submit"
            className="btn btn-primary text-22"
            disabled={
              isSubmitting || !(get(formik, "isValid") && get(formik, "dirty"))
            }>
            <Typography variant="p2" element="span">
              {t("save")}
            </Typography>
            {isSubmitting && <span className="loading loading-spinner"></span>}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
