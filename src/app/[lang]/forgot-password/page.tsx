"use client";
import * as Yup from "yup";
import { get } from "lodash";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast, Toaster } from "react-hot-toast";

import { forgotPassword } from "@/service/api";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import ToastMessage from "@/components/atoms/toastMessage/ToastMessage";

const ForgotPassword = () => {
  const router = useRouter();
  const t = useTranslations();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid_or_incomplete_email"))
      .max(50, t("email_is_too_long"))
      .required(t("this_field_is_required"))
  });

  const initialValues = {
    email: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await forgotPassword(values);
      if (get(res, "status")) {
        toast.custom((item) => (
          <ToastMessage
            toast={toast}
            item={item}
            title="Success!"
            status="success">
            <p className="text-xl text-black">{get(res, "data.message")}</p>
          </ToastMessage>
        ));
        router.push("/new-password");
        router.refresh();
      } else {
        toast.custom((item) => (
          <ToastMessage toast={toast} item={item} title="Oops!" status="error">
            <p className="text-xl text-black">{get(res, "message")}</p>
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
        <Toaster position="top-right" reverseOrder={false} />
        <div className="flex w-full flex-col gap-y-4">
          <h1 className="text-lg lg:text-3xl font-semibold text-gray-900">
            Forgot Password
          </h1>
          <h5 className="text-sm lg:text-base text-gray-400">
            Enter your Email and get verification.
          </h5>
          <div className="flex flex-col">
            <div className="flex container mx-auto justify-center flex-col gap-y-4">
              <Input
                type="email"
                name="email"
                label={t("email")}
                placeholder={t("email")}
                containerClassName="text-lg"
                value={get(values, "email")}
                onChange={handleChange}
              />
              {get(errors, "email") && get(touched, "email") && (
                <div className="text-primary">{get(errors, "email")}</div>
              )}
              <Button
                disabled={isSubmitting}
                type="submit"
                className="text-base lg:text-xl">
                Get Verification
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

export default ForgotPassword;
