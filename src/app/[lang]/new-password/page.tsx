"use client";
import * as Yup from "yup";
import { get } from "lodash";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast, Toaster } from "react-hot-toast";

import { profileEdit } from "@/service/api";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import ToastMessage from "@/components/atoms/toastMessage/ToastMessage";

const NewPassword = () => {
  const router = useRouter();
  const t = useTranslations();

  const validationSchema = Yup.object({
    new_password: Yup.string()
      .required(t("this_field_is_required"))
      .min(6, t("password_is_too_short_must_be_at_least_6_characters")),
    new_password_confirm: Yup.string()
      .required(t("this_field_is_required"))
      .oneOf([Yup.ref("new_password"), null], t("phone_number_is_not_valid"))
  });

  const initialValues = {
    new_password: "",
    new_password_confirm: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await profileEdit(values);
      if (get(res, "status") || get(res, "data")) {
        toast.custom((item) => (
          <ToastMessage
            toast={toast}
            item={item}
            title={t("toast_success")}
            status="success">
            <p className="text-md lg:text-xl text-black">
              {get(res, "data.message")}
            </p>
          </ToastMessage>
        ));
        router.push("/new-password");
        router.refresh();
      } else {
        toast.custom((item) => (
          <ToastMessage toast={toast} item={item} title={t("toast_error")} status="error">
            <p className="text-md lg:text-xl text-black">
              {get(res, "message")}
            </p>
          </ToastMessage>
        ));
      }
    }
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } =
    formik;

  return (
    <div>
      <form
        className="flex lg:justify-center font-mi-sans mt-20 lg:mt-40 px-4 lg:px-80"
        noValidate
        onSubmit={handleSubmit}>
        <Toaster
          toastOptions={{ duration: 5000 }}
          position="top-right"
          reverseOrder={false}
        />
        <div className="flex w-full flex-col gap-y-4">
          <h1 className="text-lg lg:text-3xl font-semibold text-gray-900">
            {t("new_password")}
          </h1>
          <h5 className="text-sm lg:text-base text-gray-400">
            {t("new_password_last_step")}
          </h5>
          <div className="flex flex-col">
            <div className="flex container mx-auto justify-center flex-col gap-y-4">
              <Input
                type="password"
                name="new_password"
                label={t("password")}
                placeholder={t("password")}
                containerclass="text-lg"
                onChange={handleChange}
                value={get(values, "new_password")}
              />
              {get(errors, "new_password") && get(touched, "new_password") && (
                <div className="text-primary">
                  {get(errors, "new_password")}
                </div>
              )}
              <Input
                type="password"
                name="new_password_confirm"
                label="Confirm Password"
                placeholder="Confirm Password"
                containerclass="text-lg"
                onChange={handleChange}
                value={get(values, "new_password_confirm")}
              />
              {get(errors, "new_password_confirm") &&
                get(touched, "new_password_confirm") && (
                  <div className="text-primary text-sm lg:text-base">
                    {get(errors, "new_password_confirm")}
                  </div>
                )}
              <Button
                disabled={isSubmitting}
                type="submit"
                className="text-base lg:text-xl">
                Submit
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
