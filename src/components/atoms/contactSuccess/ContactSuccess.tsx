"use client";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/redux/hooks";
import { IContactSuccess } from "@/components/atoms/contactSuccess/types";
import { changeIsSend } from "@/redux/features/contactSlice/contactSlice";

import Button from "@/components/atoms/button/Button";

import CareIcon from "../../../../public/images/variants/care.svg";
import LeftArrowIcon from "../../../../public/images/left_arrow.svg";
import BodyHeartIcon from "../../../../public/images/contact_heart.svg";
import { useTranslations } from "next-intl";
import Typography from "../typography/Typography";

const ContactSuccess = ({ className = "" }: IContactSuccess) => {
  const router = useRouter();
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const handleBackButton = () => {
    dispatch(changeIsSend(false));
    router.push("/contact");
  };

  return (
    <div
      className={`flex flex-col mx-auto items-center justify-center gap-y-9 mt-10 lg:mt-24 pt-1.5 ${className}`}>
      <header>
        <div className="flex w-16 w-20 h-20 bg-primary-100 items-center justify-center rounded-full">
          <CareIcon className="fill-[#ed2475]" />
        </div>
      </header>
      <main className="flex flex-col text-center gap-y-6">
        <Typography variant="h2" element="h4">
          {t("contact_success_title")}
        </Typography>
        <Typography variant="p1" element="p" className="text-gray-500">
          {t("contact_success_description")}
        </Typography>
      </main>
      <footer className="flex-wrap">
        <Button
          onClick={handleBackButton}
          variant="btn-ghost"
          className="flex text-primary px-0"
          outline={true}>
          <LeftArrowIcon className="w-3 lg:w-5" />
          <Typography variant="h5" element="span">
            {t("iw_communicate")}
          </Typography>
        </Button>
      </footer>
      <div className="hidden lg:block absolute bottom-0 left-0">
        <BodyHeartIcon />
      </div>
    </div>
  );
};

export default ContactSuccess;
